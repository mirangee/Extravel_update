package com.ict.extravel.domain.pointexchange.controller;

import com.ict.extravel.domain.member.entity.Member;
import com.ict.extravel.domain.member.repository.MemberRepository;
import com.ict.extravel.domain.pointexchange.dto.PayInfoDto;
import com.ict.extravel.domain.pointexchange.dto.request.PointInfoRequestDto;
import com.ict.extravel.domain.pointexchange.dto.response.PayConfirmResponseDTO;
import com.ict.extravel.domain.pointexchange.dto.response.PaymentDto;
import com.ict.extravel.domain.pointexchange.dto.response.PointInfoResponseDto;
import com.ict.extravel.domain.pointexchange.entity.PointCharge;
import com.ict.extravel.domain.pointexchange.repository.PointChargeRepository;
import com.ict.extravel.domain.pointexchange.repository.WalletRepository;
import com.ict.extravel.domain.pointexchange.service.KakaoPayService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.PrintWriter;
import java.math.BigDecimal;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payment")
@Slf4j
public class KakaoPayController {

    private final KakaoPayService kakaoPayService;
    private final PointChargeRepository pointChargeRepository;

    /** 결제 준비 redirect url 받기 --> 상품명과 가격을 같이 보내줘야함 */
    @PostMapping("/ready")
    public ResponseEntity<?> getRedirectUrl(@RequestBody PayInfoDto payInfoDto) {
        try {
            log.info("/payment/ready 요청 들어 옴! {}", payInfoDto);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(kakaoPayService.getRedirectUrl(payInfoDto));
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    /**
     * 결제 성공 pid 를  받기 위해 request를 받고 pgToken은 rediret url에 뒤에 붙어오는걸 떼서 쓰기 위함
     */
//    @GetMapping("/success/{id}")
//    public ResponseEntity<?> afterGetRedirectUrl(@PathVariable("id")Integer id,
//                                                 @RequestParam("pg_token") String pgToken) {
//        try {
//            log.info("/payment/success/id 요청 들어 옴! {}", pgToken);
//            PaymentDto kakaoApprove = kakaoPayService.getApprove(pgToken, id);
//            log.info("controller로 getApprove 결과가 반환됨, {}", kakaoApprove);
//            return ResponseEntity.status(HttpStatus.OK).body("결제가 완료되었습니다! 결제 페이지로 돌아가주세요.");
//        }
//        catch(Exception e){
//            log.info(e.getMessage());
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }

    @GetMapping("/success/{id}")
    public void afterGetRedirectUrl(HttpServletResponse response, @PathVariable("id")Integer id,
                                    @RequestParam("pg_token") String pgToken) {
        try {
            log.info("/payment/success/id 요청 들어 옴! {}", pgToken);
            PaymentDto kakaoApprove = kakaoPayService.getApprove(pgToken, id);
            log.info("controller로 getApprove 결과가 반환됨, {}", kakaoApprove);
            kakaoPayService.calcTotalResult(id, kakaoApprove);

            response.setContentType("text/html; charset=UTF-8");
            PrintWriter out = response.getWriter();

            out.println("<html>");
            out.println("<head>");
            out.println("<title>Payment Success</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>ET 포인트 충전 결제가 성공적으로 완료되었습니다");
            out.println("<script type=\"text/javascript\">");
            out.println("window.onload = function() {");
            out.println("    window.close();");
            out.println("};");
            out.println("</script>");
            out.println("</body>");
            out.println("</html>");

            out.close();
        }
        catch(Exception e){
            log.info(e.getMessage());
        }
    }

    /**
     * 결제 진행 중 취소
     */
    @GetMapping("/cancel/{id}")
    public ResponseEntity<?> cancel(HttpServletResponse response, @PathVariable("id") Integer id) {

        try {
            String tid = pointChargeRepository.findCurrentTidbyId(id);
            pointChargeRepository.updatePointChargeBy(tid, null, PointCharge.Status.CANCELED, false);

            response.setContentType("text/html; charset=UTF-8");
            PrintWriter out = response.getWriter();

            out.println("<html>");
            out.println("<head>");
            out.println("<title>Payment Success</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>ET 포인트 충전 결제가 취소되었습니다");
            out.println("<script type=\"text/javascript\">");
            out.println("window.onload = function() {");
            out.println("    window.close();");
            out.println("};");
            out.println("</script>");
            out.println("</body>");
            out.println("</html>");

            out.close();

            return ResponseEntity.badRequest().body("결제가 취소되었습니다.");

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    /**
     * 결제 실패
     */
    @GetMapping("/fail/{id}")
    public ResponseEntity<?> fail(HttpServletResponse response, @PathVariable("id")Integer id) {
        try {
            String tid = pointChargeRepository.findCurrentTidbyId(id);
            pointChargeRepository.updatePointChargeBy(tid, null, PointCharge.Status.FAILED, false);

            response.setContentType("text/html; charset=UTF-8");
            PrintWriter out = response.getWriter();

            out.println("<html>");
            out.println("<head>");
            out.println("<title>Payment Success</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>ET 포인트 충전 결제가 실패하였습니다");
            out.println("<script type=\"text/javascript\">");
            out.println("window.onload = function() {");
            out.println("    window.close();");
            out.println("};");
            out.println("</script>");
            out.println("</body>");
            out.println("</html>");

            out.close();

            return ResponseEntity.badRequest().body("결제가 실패하였습니다.");

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
    /** 결제창 닫은 후 결제 완료 상태 확인하는 요청 --> DB에서 결제 status 정보 조회 결과를 보내줘야함 */
    @PostMapping("/confirm/{tid}")
    public ResponseEntity<?> confirm(@PathVariable("tid") String tid) {
        pointChargeRepository.updateInUseByTid(tid);
        log.info("/payment/confirm/tid 요청 들어 옴! {}", tid);
        PayConfirmResponseDTO tidInfo = kakaoPayService.findTidInfo(tid);
        return ResponseEntity.status(HttpStatus.OK).body(tidInfo);
    }

    /** 충전 모달 창 열었을 때 보유 포인트 조회하는 요청 --> DB에서 wallet 정보 조회 결과를 보내줘야 함 */
    @PostMapping("/pointInfo")
    public ResponseEntity<?> getPointInfo(@RequestBody PointInfoRequestDto dto) {
        log.info("/payment/pointInfo 요청 들어 옴! {}", dto);
        PointInfoResponseDto pointInfo = kakaoPayService.getPointInfo(dto.getId());
        return ResponseEntity.status(HttpStatus.OK).body(pointInfo);
    }
}