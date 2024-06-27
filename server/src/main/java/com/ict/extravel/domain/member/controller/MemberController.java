package com.ict.extravel.domain.member.controller;


import com.ict.extravel.domain.member.dto.GoogleUserInfoDTO;
import com.ict.extravel.domain.member.dto.request.LoginRequestDTO;
import com.ict.extravel.domain.member.dto.request.MemberSignUpRequestDTO;
import com.ict.extravel.domain.member.dto.request.UpdateMemberNationRequestDTO;
import com.ict.extravel.domain.member.dto.response.LoginResponseDTO;

import com.ict.extravel.domain.member.dto.NaverUserDTO;
import com.ict.extravel.domain.member.dto.request.*;
import com.ict.extravel.domain.member.entity.Member;
import com.ict.extravel.domain.member.service.MemberService;
import com.ict.extravel.domain.member.dto.response.MemberSignUpResponseDTO;
import com.ict.extravel.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/user/auth")
@RequiredArgsConstructor
@Slf4j
public class MemberController {

    private final MemberService memberService;

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
        return ResponseEntity.ok().body(responseDTO);
    }

    //풀리용 임시 주석 처리 06.27 진행중~ by종구
    //자체 분실된 아이디 찾기
//    @PostMapping(value = "/findid")
//    public ResponseEntity<?> findId(@RequestBody FindIDRequestDTO requestDTO) {
//        try {
//            FindIDResponseDTO responseDTO = memberService.findEmail(requestDTO);
//            return ResponseEntity.ok().body(responseDTO);
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }


    @GetMapping("/naverlogin")
    public ResponseEntity<?> naverLogin(@RequestParam("code") String code) {
        log.info("/user/auth/naver- Get code : {}", code);
        LoginResponseDTO loginResponseDTO = memberService.NaverLoginService(code);
        return ResponseEntity.ok().body("SUCCESS");
    }

    @GetMapping("/kakaologin")
    public ResponseEntity<?> kakaoLogin(String code) {
        log.info("/user/auth/kakaoLogin - GET! code: {}", code);
        memberService.kakaoService(code);
        return ResponseEntity.ok().body("ok");
    }

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody GoogleUserInfoDTO googleUserInfoDTO) {

        log.info(googleUserInfoDTO.getName());
        log.info(googleUserInfoDTO.getEmail());
        memberService.googleService(googleUserInfoDTO);
        return ResponseEntity.ok().body("SUCCESS");
    }

    @PutMapping("/nation")
    public ResponseEntity<?> updateNation(@RequestBody UpdateMemberNationRequestDTO dto) {
        String s = memberService.UpdateNation(dto);
        return ResponseEntity.ok(s);
    }

//    @PostMapping("/naverlogin")
//    public Member naverLogin(@RequestBody NaverUserDTO naverUserDetail){
//        return memberService.saveMember();
//    }



}

