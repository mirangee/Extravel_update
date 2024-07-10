package com.ict.extravel.domain.member.controller;


import com.ict.extravel.domain.member.dto.GoogleUserInfoDTO;
import com.ict.extravel.domain.member.dto.request.*;
import com.ict.extravel.domain.member.dto.response.FindIDResponseDTO;
import com.ict.extravel.domain.member.dto.response.LoginResponseDTO;
import com.ict.extravel.domain.member.dto.response.MemberSignUpResponseDTO;
import com.ict.extravel.domain.member.service.CoolSMSService;
import com.ict.extravel.domain.member.service.MemberService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.exception.NurigoEmptyResponseException;
import net.nurigo.sdk.message.exception.NurigoMessageNotReceivedException;
import net.nurigo.sdk.message.exception.NurigoUnknownException;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.response.MultipleDetailMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.NoSuchElementException;


@RestController
@RequestMapping("/user/auth")
@RequiredArgsConstructor
@Slf4j
public class MemberController {

    private final MemberService memberService;
    private final CoolSMSService coolSMSService;
    private DefaultMessageService messageService;



    @Value("${CoolSMS.api_key}")
    private String API_KEY;
    @Value("${CoolSMS.apiSecretKey}")
    private String API_SECRET_KEY;
    @Value("${CoolSMS.web}")
    private String WEB;
    @Value("${CoolSMS.phone_number}")
    private String PHONE_NUMBER;


    @PostConstruct //init 메서드가 sendOne 메서드 호출 시 자동으로 호출
    private void init() {
        // 반드시 계정 내 등록된 유효한 API 키, API Secret Key를 입력해주셔야 합니다!
        this.messageService = NurigoApp.INSTANCE.initialize(API_KEY, API_SECRET_KEY, "https://api.coolsms.co.kr");
        log.info("CoolSMS Message Service initialized with API Key: {}, API_SECRET_KEY: {} ", API_KEY, API_SECRET_KEY);
    }

    //에러 발생
    private static ResponseEntity<FieldError> getFieldErrorResponseEntity(BindingResult result) {
        if (result.hasErrors()) {
            log.warn(result.toString());
            return ResponseEntity.badRequest()
                    .body(result.getFieldError());
        }
        return null;
    }

    //자체 회원가입 이메일 중복체크
    @PostMapping("/check")
    public ResponseEntity<?> check(@RequestBody Map<String, String> data) {
        String email = data.get("email");
        log.info("이메일 값 받아옴: {}", email);
        if (email.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("존재하지 않는 이메일입니다.");
        }
        boolean resultFlag = memberService.isDuplicate(email);
        log.info("이 이메일은 {} 합니다", resultFlag);
        return ResponseEntity.ok().body(resultFlag);
    }

    //자체 회원가입 처리
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(
            @Validated @RequestBody MemberSignUpRequestDTO dto, BindingResult result
    ) {
        log.info("/api/auth POST! = {}", dto);

        if (result.hasErrors()) {
            log.warn(result.toString());
            return ResponseEntity.badRequest()
                    .body(result.getFieldErrors());
        }
        try {
            MemberSignUpResponseDTO responseDTO = memberService.create(dto);
            return ResponseEntity.ok().body(responseDTO);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    //자체 로그인
    @PostMapping("/signin")
    public ResponseEntity<?> signIn(
            @Validated @RequestBody LoginRequestDTO dto,
            BindingResult result) {
        log.info("/api/auth/signin - POST - {}", dto);

        ResponseEntity<FieldError> response = getFieldErrorResponseEntity(result);
        if (response != null) return response;

        LoginResponseDTO responseDTO = memberService.authenticate(dto);
        log.info("LoginResponseDTO responseDTO : ", responseDTO);
        return ResponseEntity.ok().body(responseDTO);
    }

    // 로그아웃 처리
//    @GetMapping("/logout")
//    public ResponseEntity<?> logout(
//            @AuthenticationPrincipal TokenUserInfo userInfo
//    ) {
//        log.info("/api/auth/logout - GET! - user: {}", userInfo.getEmail());
//
//        String result = memberService.logout(userInfo);
//        return ResponseEntity.ok().body(result);
//    }

    //자체 분실된 아이디 찾기
    @PostMapping("/findid")
    public ResponseEntity<?> findID(@RequestBody FindIDRequestDTO requestDTO) {
        try {
            log.info("컨틀롤러 넘어옴!!!{}", requestDTO);
            FindIDResponseDTO email = memberService.findEmail(requestDTO);
            email.getEmail();
            log.info("컨트롤러의 email{}", email);
            log.info("컨트롤러의 리스폰스!!!{}", requestDTO);

            String phoneNumber = requestDTO.getPhoneNumber();

            sendFoundId(phoneNumber, email);

            return ResponseEntity.ok().body(email);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    //찾은 아이디 메시지 발송
    public ResponseEntity<FindIDResponseDTO> sendFoundId(String phoneNumber, FindIDResponseDTO email) throws NurigoMessageNotReceivedException, NurigoEmptyResponseException, NurigoUnknownException {
        log.info("sendFoundId의 phoneNumber{}, email{}", phoneNumber, email);

        Message message = new Message();
        log.info("PHONE_NUMBER : {}, phoneNumber {} : , email {} :", PHONE_NUMBER, phoneNumber, email);
        message.setFrom(PHONE_NUMBER);
        message.setTo(phoneNumber);
        message.setText("[EXTRAVEL]" +
                "당신의 아이디는" +
                "[" + email + "]" +
                "입력해주세요!");

        log.info("Sending SMS to: {} with verification code: {}", phoneNumber, email);

        MultipleDetailMessageSentResponse messageSentResponse = messageService.send(message);// SMS 발송 요청
        log.info("{}", messageSentResponse.toString());
        log.info("SMS sent successfully to {}", phoneNumber);
        return ResponseEntity.ok().body(email);
    }


    //비밀번호 찾기
    @PostMapping("/findpw")
    public ResponseEntity<?> findPW(@RequestBody FindPWRequestDTO requestDTO) {
        try {
            // 비밀번호 업데이트
            memberService.updatePassword(requestDTO.getEmail(), requestDTO.getPhoneNumber());

            // 성공적으로 비밀번호가 업데이트되었음을 반환
            return ResponseEntity.ok("비밀번호가 성공적으로 업데이트되었습니다. SMS를 확인하세요.");
        } catch (NoSuchElementException e) {
            // 사용자를 찾을 수 없는 경우
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            // 일반적인 예외 처리
            log.error("비밀번호 업데이트에 실패했습니다.", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("비밀번호 업데이트에 실패했습니다.");
        }
    }



    @GetMapping("/naverlogin")
    public ResponseEntity<?> naverLogin(@RequestParam("code") String code) {
        log.info("/user/auth/naver- Get code : {}", code);
        LoginResponseDTO loginResponseDTO = memberService.NaverLoginService(code);
        return ResponseEntity.ok().body(loginResponseDTO);

    }

    @GetMapping("/kakaologin")
    public ResponseEntity<?> kakaoLogin(String code) {
        log.info("/user/auth/kakaoLogin - GET! code: {}", code);
        LoginResponseDTO loginResponseDTO = memberService.kakaoService(code);
        return ResponseEntity.ok().body(loginResponseDTO);
    }

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody GoogleUserInfoDTO googleUserInfoDTO) {
        log.info(googleUserInfoDTO.getName());
        log.info(googleUserInfoDTO.getEmail());
        LoginResponseDTO loginResponseDTO = memberService.googleService(googleUserInfoDTO);
        return ResponseEntity.ok().body(loginResponseDTO);
    }

    @PutMapping("/nation")
    public ResponseEntity<?> updateNation(@RequestBody UpdateMemberNationRequestDTO dto) {
        String s = memberService.UpdateNation(dto);
        return ResponseEntity.ok(s);
    }

    @PostMapping("/exchange/check")
    public ResponseEntity<?> exchangeCheck(@RequestBody ExchangeCheckRequestDTO dto) {
        String result = memberService.exchangeCheck(dto);
        return ResponseEntity.ok().body(result);
    }


    // 리프레쉬 토큰을 활용한 액세스 토큰 재발급 요청
    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody Map<String, String> tokenRequest) {
        log.info("/api/auth/refresh: POST! - tokenRequest: {}", tokenRequest);
        String renewalAccessToken = memberService.renewalAccessToken(tokenRequest);
        if (renewalAccessToken != null) {
            return ResponseEntity.ok().body(Map.of("accessToken", renewalAccessToken));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
    }

    @PutMapping("/remove/{id}")
    public ResponseEntity<?> remove(@PathVariable Integer id) {
        memberService.deleteId(id);
        log.info("id입니다: {}", id);


        return ResponseEntity.ok("회원탈퇴성공!");
    }

    @PostMapping("/signup/sns")
    public ResponseEntity<?> snsSignup(@RequestBody SnsSignUpRequestDTO dto) {
        LoginResponseDTO member = memberService.snsSignup(dto);
        return ResponseEntity.ok().body(member);
    }
    @PutMapping("/newpass")
    public ResponseEntity<?> setNewPassword(@RequestBody setNewPassRequestDTO dto){
        String result = memberService.setPassword(dto);
        return ResponseEntity.ok().body(result);

    }


}
