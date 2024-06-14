package com.ict.extravel.domain.member.controller;

import com.ict.extravel.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user/auth")
@RequiredArgsConstructor
@Slf4j
public class MemberController {
private final MemberService memberService;

    @GetMapping("/naver")
    public ResponseEntity<?> NaverLogin(@RequestParam String code) {
          log.info("/api/auth/naver- Get code : ",code);

          memberService.NaverLoginService(code);

         return null;

    }
}
