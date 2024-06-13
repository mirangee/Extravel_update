package com.ict.extravel.domain.member.controller;

import com.ict.extravel.domain.member.dto.response.LoginResponseDTO;
import com.ict.extravel.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user/auth")
@RequiredArgsConstructor
@Slf4j
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/kakaologin")
    public ResponseEntity<?> kakaoLogin(String code) {
        log.info("/api/auth/kakaoLogin - GET! code: {}", code);
        //LoginResponseDTO responseDTO = memberService.kakaoService(code);

        return null;// ResponseEntity.ok().body(responseDTO);
    }
    @GetMapping("/oauth/kakao")
    public void getCode(String code){
        System.out.println(code);
    }

}


