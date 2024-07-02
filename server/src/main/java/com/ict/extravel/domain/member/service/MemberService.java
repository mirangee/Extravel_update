package com.ict.extravel.domain.member.service;

import com.ict.extravel.domain.member.dto.GoogleUserInfoDTO;
import com.ict.extravel.domain.member.dto.NaverUserDTO;
import com.ict.extravel.domain.member.dto.request.FindIDRequestDTO;
import com.ict.extravel.domain.member.dto.request.LoginRequestDTO;
import com.ict.extravel.domain.member.dto.request.MemberSignUpRequestDTO;
import com.ict.extravel.domain.member.dto.request.UpdateMemberNationRequestDTO;
import com.ict.extravel.domain.member.dto.response.FindIDResponseDTO;
import com.ict.extravel.domain.member.dto.response.KakaoUserDTO;
import com.ict.extravel.domain.member.dto.response.LoginResponseDTO;
import com.ict.extravel.domain.member.dto.response.MemberSignUpResponseDTO;
import com.ict.extravel.domain.member.entity.Member;
import com.ict.extravel.domain.member.repository.MemberRepository;
import com.ict.extravel.domain.nation.entity.Nation;
import com.ict.extravel.domain.nation.repository.NationRepository;
import com.ict.extravel.domain.pointexchange.repository.WalletRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.response.MultipleDetailMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final NationRepository nationRepository;
    private final WalletRepository walletRepository;
    private final PasswordEncoder passwordEncoder;
    private DefaultMessageService messageService;

    // naver login
    @Value("${NaverLogin.client_id}")
    private String client_id;
    @Value("${NaverLogin.client_secret}")
    private String client_secret;
    @Value("${NaverLogin.state}")
    private String state;


    // kakao login
    @Value("${kakao.client_id}")
    private String KAKAO_CLIENT_ID;
    @Value("${kakao.redirect_url}")
    private String KAKAO_REDIRECT_URL;
    @Value("${kakao.client_secret}")
    private String KAKAO_CLIENT_SECRET;

    @Value("${CoolSMS.api_key}")
    private String API_KEY;
    @Value("${CoolSMS.apiSecretKey}")
    private String API_SECRET_KEY;
    @Value("${CoolSMS.web}")
    private String WEB;
    @Value("${CoolSMS.phone_number}")
    private int PHONE_NUMBER;

    @PostConstruct //init 메서드가 sendOne 메서드 호출 시 자동으로 호출
    private void init() {
        // 반드시 계정 내 등록된 유효한 API 키, API Secret Key를 입력해주셔야 합니다!
        this.messageService = NurigoApp.INSTANCE.initialize(API_KEY, API_SECRET_KEY, "https://api.coolsms.co.kr");
        log.info("CoolSMS Message Service initialized with API Key: {}, API_SECRET_KEY: {} ", API_KEY, API_SECRET_KEY);
    }


    private static KakaoUserDTO getKakaoUserInfo(String accessToken) {
        // 요청 uri
        String requestURI = "https://kapi.kakao.com/v2/user/me";
        // 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // 요청 보내기
        RestTemplate template = new RestTemplate();
        ResponseEntity<KakaoUserDTO> responseEntity
                = template.exchange(requestURI, HttpMethod.GET, new HttpEntity<>(headers), KakaoUserDTO.class);

        // 응답 바디 꺼내기
        KakaoUserDTO responseData = responseEntity.getBody();

        return responseData;
    }


    //이메일 중복검사
    public boolean isDuplicate(String email) {
        if (memberRepository.existsByEmail(email)) {
            log.warn("이메일이 중복되었습니다. - {}", email);
            return true;
        } else return false;
    }

    //자체 로그인
    public LoginResponseDTO authenticate(final LoginRequestDTO dto) {

        Member member = memberRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 아이디 입니다."));
        //RuntimeException 발생시 GlobalExceptionHandler가 처리

        // 패스워드 검증
        String rawPassword = dto.getPassword(); // 입력한 비번
        String encodedPassword = member.getPassword(); // DB에 저장된 암호화된 비번

        //암호화된 비밀번호, 生비번 비교
        if (!passwordEncoder.matches(rawPassword, encodedPassword)) {
            throw new RuntimeException("비밀번호가 틀렸습니다.");
        }

        log.info("{}님 로그인 성공!", member.getName());


        return new LoginResponseDTO(member);
    }

    //자체 회원가입
    public MemberSignUpResponseDTO create(final MemberSignUpRequestDTO dto) throws Exception {

        String email = dto.getEmail();

        if (isDuplicate(email)) {
            throw new RuntimeException("중복된 이메일 입니다.");
        }

        // 패스워드 인코딩
        String encoded = passwordEncoder.encode(dto.getPassword());
        dto.setPassword(encoded);

        // dto를 Entity로 변환해서 저장.
        Nation us = nationRepository.findById("US").orElseThrow();
        Member saved = memberRepository.save(dto.toEntity(us));

        // member table에 회원 저장되면 wallet에도 데이터 생성
        walletRepository.insertWallet(saved.getId(), BigDecimal.valueOf(0.0));

        log.info("회원 가입 정상 수행됨! - saved user - {}", saved);
        return new MemberSignUpResponseDTO(saved);
    }


    //    자체 아이디 찾기
    public FindIDResponseDTO findEmail(FindIDRequestDTO requestDTO) {
        log.info("서비스의 {}", requestDTO);

        String phoneNumber = requestDTO.getPhoneNumber().replaceAll("-", "");
        log.info("서비스의 폰넘버 가공{}", requestDTO);

        List<Member> members = memberRepository
                .findByPhoneNumberAndName(phoneNumber, requestDTO.getName()) //@@@ 순서
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 회원입니다. 요청: " + requestDTO));

        log.info("서비스의 findByPhoneNumberAndName JPA {}", requestDTO);

        Member member = members.get(0);
        FindIDResponseDTO findIDResponseDTO = new FindIDResponseDTO();
        findIDResponseDTO.setEmail(member.getEmail());

        log.info("컨트롤러의 member.getEmail{}", member.getEmail());
        log.info("findIDResponseDTO 결과값 {}", findIDResponseDTO);
        return findIDResponseDTO;

    }



    // 이메일과 전화번호를 사용하여 비밀번호 업데이트
    public void updatePassword(String email, String phoneNumber) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        int newPassword = generateRandomNumber();
        String encodedPassword = passwordEncoder.encode(Integer.toString(newPassword));
        log.info(" 서비스의 newPasswrodString : {}", encodedPassword);

        // 비밀번호 업데이트
        int updatedRows = memberRepository.updatePasswordByEmailAndPhoneNumber(email, phoneNumber, encodedPassword);

        log.info("서비스의 updateRows : {} ", updatedRows);
        if (updatedRows == 0) {
            throw new NoSuchElementException("회원 정보를 찾을 수 없습니다. 이메일: " + email + ", 전화번호: " + phoneNumber);
        }

        sendNewPW(phoneNumber, newPassword);
    }

    public int generateRandomNumber() {
        Random random = new Random();
        int min = 100000;
        int max = 999999;
        return random.nextInt(max - min + 1) + min;
    }



    // 임시 비밀번호를 SMS로 전송하는 메서드
    public void sendNewPW(String phoneNumber, int newPassword) {
        // SMS 전송 로직 구현 (예: 외부 API 사용)
        log.info("Sending SMS to: {} with new password: {}", phoneNumber, newPassword);
        Message message = new Message();
        message.setFrom("01021356409");
        message.setTo(phoneNumber);
        message.setText("[EXTRAVEL] 회원님의 임시 비밀번호는 [" + newPassword + "] 입니다!");


        try {
            MultipleDetailMessageSentResponse response = messageService.send(message);
            log.info("SMS sent successfully: {}", response);
        } catch (Exception e) {
            log.error("Failed to send SMS", e);
        }
    }


    @Transactional
    public Member NaverLoginService(String code) {
        String accessToken = getNaverAccessToken(code);
        log.info("token: {}", accessToken);

        NaverUserDTO naverUserInfo = getNaverUserInfo(accessToken);
        log.info("naverUserInfo:{}",naverUserInfo);

        Member member = saveMember(naverUserInfo.getResponse().getName(), naverUserInfo.getResponse().getEmail());
        log.info("member {}",member);
        return member;

    }

    private NaverUserDTO getNaverUserInfo(String accessToken) {

        String requestURI = "https://openapi.naver.com/v1/nid/me";

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        log.info("accessToken: {}", accessToken);

        //요청보내기
        RestTemplate template = new RestTemplate();
        ResponseEntity<NaverUserDTO> responseEntity = template.exchange(requestURI, HttpMethod.GET, new HttpEntity<>(headers), NaverUserDTO.class);

        // 응답 바디 꺼내기
        NaverUserDTO responseData = responseEntity.getBody();
        log.info("user profile: {}", responseData);


        return responseData;
    }


    @Transactional
   public Member saveMember(String name,String email){
        MemberSignUpRequestDTO dto = new MemberSignUpRequestDTO();
        dto.setEmail(email);
        dto.setName(name);
        dto.setPhoneNumber("112");
        dto.setPassword("sns는 비공개");
        Nation us = nationRepository.findById("US").orElseThrow();
        Member saved = memberRepository.save(dto.toEntity(us));

        log.info("dto에 들어가는saved{}",saved);
        return saved;
   }




    public void kakaoService(String code) {
        // 인가 코드를 통해 토큰을 발급받기
        System.out.println(KAKAO_CLIENT_ID);
        System.out.println(KAKAO_CLIENT_SECRET);
        System.out.println(KAKAO_REDIRECT_URL);
        String accessToken = getKakaoAccessToken(code);
        System.out.println(accessToken);
        // 토큰을 통해 사용자 정보를 가져오기
        KakaoUserDTO userDTO = getKakaoUserInfo(accessToken);

        System.out.println(userDTO);
        Member member = saveMember(userDTO.getKakaoAccount().getProfile().getNickname(),userDTO.getKakaoAccount().getEmail());

    }

    private String getKakaoAccessToken(String code) {
        // 요청 uri
        String requestURI = "https://kauth.kakao.com/oauth/token";

        // 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // 요청 바디(파라미터) 설정
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code"); // 카카오 공식 문서 기준 값으로 세팅
        params.add("client_id", KAKAO_CLIENT_ID); // 카카오 디벨로퍼 REST API 키
        params.add("redirect_uri", KAKAO_REDIRECT_URL); // 카카오 디벨로퍼 등록된 redirect uri
        params.add("code", code); // 프론트에서 인가 코드 요청시 전달받은 코드값
        params.add("client_secret", KAKAO_CLIENT_SECRET); // 카카오 디벨로퍼 client secret(활성화 시 추가해 줘야 함)

        // 헤더와 바디 정보를 합치기 위해 HttpEntity 객체 생성
        HttpEntity<Object> requestEntity = new HttpEntity<>(params, headers);

        // 카카오 서버로 POST 통신
        RestTemplate template = new RestTemplate();

        // 통신을 보내면서 응답 데이터를 리턴
        // param1: 요청 url
        // param2: 요청 메서드 (전송 방식)
        // param3: 헤더와 요청 파라미터정보 엔터티
        // param4: 응답 데이터를 받을 객체의 타입 (ex: dto, map)
        // 만약 구조가 복잡한 경우에는 응답 데이터 타입을 String으로 받아서 JSON-simple 라이브러리로 직접 해체.
        ResponseEntity<Map> responseEntity
                = template.exchange(requestURI, HttpMethod.POST, requestEntity, Map.class);

        /*
        HTTP/1.1 200 OK
        Content-Type: application/json;charset=UTF-8
        {
            "token_type":"bearer",
            "access_token":"${ACCESS_TOKEN}",
            "expires_in":43199,
            "refresh_token":"${REFRESH_TOKEN}",
            "refresh_token_expires_in":5184000,
            "scope":"account_email profile"
        }
         */

        // 응답 데이터에서 필요한 정보를 가져오기
        Map<String, Object> responseData = (Map<String, Object>) responseEntity.getBody();
        log.info("토큰 요청 응답 데이터: {}", responseData);

        // 여러가지 데이터 중 access_token이라는 이름의 데이터를 리턴
        // Object를 String으로 형 변환해서 리턴.
        return (String) responseData.get("access_token");


    }

    private String getNaverAccessToken(String code) {

        String requestURI = "https://nid.naver.com/oauth2.0/token";

        HttpHeaders headers = new HttpHeaders();

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", client_id);
        params.add("client_secret", client_secret);
        params.add("code", code);
        params.add("state", state);

        HttpEntity<Object> requestEntity = new HttpEntity<>(params, headers);

        RestTemplate template = new RestTemplate();

        ResponseEntity<Map> responseEntity = template.exchange(requestURI, HttpMethod.POST, requestEntity, Map.class);


        Map<String, Object> responseData = (Map<String, Object>) responseEntity.getBody();
        log.info("토큰 데이터: {}", responseData);

        return (String) Objects.requireNonNull(responseData).get("access_token");
    }


    public @Size(max = 3) String UpdateNation(UpdateMemberNationRequestDTO dto) {
        Member member = memberRepository.findByEmail(dto.getEmail()).orElseThrow(() -> new IllegalArgumentException("존재하지않는멤버"));
        Nation nation = nationRepository.findById(dto.getNationCode()).orElseThrow(() -> new IllegalArgumentException("존재하지않는국가"));
        member.setNationCode(nation);
        Member save = memberRepository.save(member);
        return save.getNationCode().getNationCode();

    }
    public void googleService(GoogleUserInfoDTO googleUserInfoDTO) {
        Member member = saveMember(googleUserInfoDTO.getName(), googleUserInfoDTO.getEmail());
    }



}
















