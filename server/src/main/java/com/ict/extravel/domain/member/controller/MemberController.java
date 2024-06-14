package com.ict.extravel.domain.member.controller;


import com.ict.extravel.domain.member.dto.request.GoogleSignupRequestDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController

@RequestMapping("/user/auth")
@RequiredArgsConstructor
@Slf4j
public class MemberController {

    @Value("{spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@Validated @RequestBody GoogleSignupRequestDTO requestDTO,
                                         BindingResult result) {
        log.info("google backend 들어옴!");
        log.info(requestDTO.toString());
        ResponseEntity<FieldError> resultEntity = getFieldErrorResponseEntity(result);
        return ResponseEntity.ok().body(requestDTO.getName());
    }

    private static ResponseEntity<FieldError> getFieldErrorResponseEntity(BindingResult result) {
        if (result.hasErrors()) {
            log.warn(result.toString());
            return ResponseEntity.badRequest()
                    .body(result.getFieldError());
        }
        return null;
    }
}

