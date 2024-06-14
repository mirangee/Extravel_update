package com.ict.extravel.domain.member.controller;
import com.ict.extravel.domain.member.dto.GoogleUserInfoDTO;
import com.ict.extravel.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController

@RequestMapping("/user/auth")
@RequiredArgsConstructor
@Slf4j
public class MemberController {
    private final MemberService memberService;

    @Value("{spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

    @Value("{spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret;

    @Value("{spring.security.oauth2.client.registration.google.redirect-uri}")
    private String redirectUri;


//    @PostMapping("/google/login")
//    public ResponseEntity<?> googleLogin(@RequestBody String code) {
//        log.info("google backend 들어옴!");
//        memberService.getGoogleAccessToken(code, clientId, clientSecret, redirectUri);
//        return ResponseEntity.ok().body("SUCCESS");
//    }

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody GoogleUserInfoDTO googleUserInfoDTO) {
        log.info(googleUserInfoDTO.getName());
        log.info(googleUserInfoDTO.getEmail());
        return ResponseEntity.ok().body("SUCCESS");
    }
}

