package com.ict.extravel.domain.pointexchange.service;

import com.ict.extravel.domain.member.entity.Member;
import com.ict.extravel.domain.member.repository.MemberRepository;
import com.ict.extravel.domain.pointexchange.MakePayRequest;
import com.ict.extravel.domain.pointexchange.dto.PayInfoDto;
import com.ict.extravel.domain.pointexchange.dto.response.PayConfirmResponseDTO;
import com.ict.extravel.domain.pointexchange.dto.response.PaymentDto;
import com.ict.extravel.domain.pointexchange.dto.request.PayRequest;
import com.ict.extravel.domain.pointexchange.dto.response.PayReadyResDto;
import com.ict.extravel.domain.pointexchange.dto.response.PointInfoResponseDto;
import com.ict.extravel.domain.pointexchange.entity.PointCharge;
import com.ict.extravel.domain.pointexchange.entity.Wallet;
import com.ict.extravel.domain.pointexchange.repository.PointChargeRepository;
import com.ict.extravel.domain.pointexchange.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static com.ict.extravel.domain.member.entity.QMember.member;

@Slf4j
@RequiredArgsConstructor
@Service
public class KakaoPayService {

    private final MakePayRequest makePayRequest;
    private final MemberRepository memberRepository;
    private final PointChargeRepository pointChargeRepository;
    private final WalletRepository walletRepository;

    @Value("${pay.admin-key}")
    private String adminKey;


    /** 카오페이 결제를 시작하기 위해 상세 정보를 카카오페이 서버에 전달하고 결제 고유 번호(TID)를 받는 단계입니다.
     * 어드민 키를 헤더에 담아 파라미터 값들과 함께 POST로 요청합니다.
     * 테스트  가맹점 코드로 'TC0ONETIME'를 사용 */
    @Transactional
    public PayReadyResDto getRedirectUrl(PayInfoDto payInfoDto)throws Exception{
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String name = authentication.getName();

        Member member = memberRepository.findById(payInfoDto.getId()).orElseThrow(() -> new Exception("해당 유저가 존재하지 않습니다."));

        HttpHeaders headers=new HttpHeaders();

        /** 요청 헤더 */
        String auth = "KakaoAK " + adminKey;
        headers.set("Content-type","application/x-www-form-urlencoded;charset=utf-8");
        headers.set("Authorization",auth);

        /** 요청 Body */
        PayRequest payRequest=makePayRequest.getReadyRequest(payInfoDto);

        /** Header와 Body 합쳐서 RestTemplate로 보내기 위한 밑작업 */
        HttpEntity<MultiValueMap<String, String>> urlRequest = new HttpEntity<>(payRequest.getMap(), headers);

        /** RestTemplate로 Response 받아와서 DTO로 변환후 return */
        RestTemplate rt = new RestTemplate();
        PayReadyResDto payReadyResDto = rt.postForObject(payRequest.getUrl(), urlRequest, PayReadyResDto.class);

        log.info("payReadyResDto 응답옴! {}", payReadyResDto);

        // String으로 받은 create_at을 LocalDateTime으로 변환
        String createdAtStr = payReadyResDto.getCreated_at();  // "2023-06-21T15:30:00" 같은 형식의 문자열
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        LocalDateTime createdAt = LocalDateTime.parse(createdAtStr, formatter);

        // String으로 받은 price를 Integer로 변환
        Integer amount = Integer.parseInt(payInfoDto.getPrice());

        // plusPoint 계산
        BigDecimal plusPoint = calcTotalPoint(member.getId(), amount).subtract(BigDecimal.valueOf(amount));

        // 여기서 tbl_charge_history에 데이터 추가
        PointCharge pointCharge = PointCharge.builder()
                .tid(payReadyResDto.getTid())
                .member(member)
                .amount(BigDecimal.valueOf(Double.parseDouble(payInfoDto.getPrice())))
                .plusPoint(plusPoint)
                .createdAt(createdAt)
                .approvedAt(null)
                .status(PointCharge.Status.PENDING)
                .inUse(true)
                .build();
        System.out.println("pointCharge = " + pointCharge);

        PointCharge save = pointChargeRepository.save(pointCharge);
        System.out.println(save);
        log.info("DB에 1차 저장 완료!");

        return payReadyResDto;
    }

    @Transactional
    public PaymentDto getApprove(String pgToken, Integer id)throws Exception{

        String tid = pointChargeRepository.findCurrentTidbyId(id);
        log.info("service 안 getApprove 메서드 안에 있음. tid를 테이블에서 검색해 옴! {}", tid);

        HttpHeaders headers=new HttpHeaders();
        String auth = "KakaoAK " + adminKey;

        /** 요청 헤더 */
        headers.set("Content-type","application/x-www-form-urlencoded;charset=utf-8");
        headers.set("Authorization",auth);

        /** 요청 Body */
        PayRequest payRequest=makePayRequest.getApproveRequest(tid, id, pgToken);

        log.info("kakaoPayService에서 승인 요청을 위한 body {}", payRequest.toString());

        /** Header와 Body 합쳐서 RestTemplate로 보내기 위한 밑작업 */
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(payRequest.getMap(), headers);

        log.info("kakaoPayService에서  승인 요청을 보내기 직전입니다");

        // 요청 보내기
        RestTemplate rt = new RestTemplate();
        PaymentDto paymentDto = rt.postForObject(payRequest.getUrl(), requestEntity, PaymentDto.class);

        // DB에 승인 결과 저장
        log.info("승인 요청의 결과 {}", paymentDto);
        pointChargeRepository.updatePointChargeBy(paymentDto.getTid(), paymentDto.getApprovedAt(), PointCharge.Status.SUCCESS, false);

        return paymentDto;
    }

    public PayConfirmResponseDTO findTidInfo(String tid) {
        log.info("tid로 결제 정보 가져오는 service");
        PointCharge pointCharge = pointChargeRepository.findById(tid).orElseThrow();
        log.info("pointChargeRepo에서 pointCharge SELECT 완료! {}", pointCharge);

        // wallet에서 해당 id의 보유 포인트를 조회해 dto에 같이 전달
        Member member = pointCharge.getMember();
        Integer id = member.getId();
        Wallet wallet = walletRepository.findById(id).orElseThrow();
        log.info("wallet에서 꺼낸 et point 조회: {}", wallet.getEtPoint());

        // 누적 충전액 구하기
        BigDecimal total = sumAmount(id);
        
        // 누적 충전액에 따라 GRADE 승급 결정
        if (total.compareTo(new BigDecimal("10000000")) >= 0) {
            member.setGrade(Member.Grade.GOLD);
            memberRepository.save(member);
        } else if (total.compareTo(new BigDecimal("5000000")) >= 0 && total.compareTo(new BigDecimal("10000000")) < 0) {
            member.setGrade(Member.Grade.SILVER);
            memberRepository.save(member);
        }

        PayConfirmResponseDTO dto = PayConfirmResponseDTO.toDto(pointCharge, wallet.getEtPoint(), total);
        return dto;
    }

    public void calcTotalResult(Integer id, PaymentDto paymentDto) {
        // 멤버 등급에 따라 plus point 산정해 총 적립 포인트 계산하는 메서드
        BigDecimal newEtPoint = calcTotalPoint(id, paymentDto.getAmount().getTotal());

        // 현재 가지고 있는 et point 조회
        Wallet wallet = walletRepository.findById(id).orElseThrow();
        BigDecimal currentEtPoint = wallet.getEtPoint();

        // DB Wallet에 보유 포인트 업데이트
        Wallet wallet1 = updateWallet(id, currentEtPoint.add(newEtPoint));
        log.info("wallet 저장 결과: {}", wallet1.toString());
    }


    private BigDecimal calcTotalPoint(Integer id, int amount) {
        Member member = memberRepository.findById(id).orElseThrow();
        BigDecimal plusRate = BigDecimal.ZERO;
        log.info("멤버의 등급을 표기합니다 {}", member.getGrade());
        switch (member.getGrade()) {
            case BRONZE:
                plusRate = new BigDecimal("0.001");
                break;
            case SILVER:
                plusRate = new BigDecimal("0.002");
                break;
            case GOLD:
                plusRate = new BigDecimal("0.003");
                break;
        }

        BigDecimal amountBD = BigDecimal.valueOf(amount);
        BigDecimal result = amountBD.multiply(BigDecimal.ONE.add(plusRate));

        // 소수점 이하 3자리로 반올림
        result = result.setScale(3, RoundingMode.HALF_UP);

        return result;
    }

    public Wallet updateWallet(Integer memberId, BigDecimal etPoint) {
        Wallet wallet = walletRepository.findById(memberId).orElseThrow();
        log.info("upsertWallet 안에서 wallet을 찾은 결과 {}", Objects.requireNonNull(wallet));

        wallet.setEtPoint(etPoint);
        log.info("wallet 저장합니다 {}", wallet);

        return walletRepository.save(wallet);
    }

    public PointInfoResponseDto getPointInfo(Integer id) {
        Wallet wallet = walletRepository.findById(id).orElseThrow();
        log.info("wallet에 담긴 정보: {}", wallet);
        BigDecimal total = sumAmount(id);
        PointInfoResponseDto responseDto = new PointInfoResponseDto();
        return responseDto.toEntity(wallet.getEtPoint(), total);
    }

    //현재까지 충전한 포인트 누적합 계산
    public BigDecimal sumAmount(Integer memberId) {
         Member member = memberRepository.findById(memberId).orElseThrow();
         List<PointCharge> pointChargeList = pointChargeRepository.findByMember(member.getId());

        BigDecimal total = BigDecimal.ZERO;
        for(PointCharge p : pointChargeList) {
            total = total.add(p.getAmount());
        }
        return total;
    }
}
