package com.ict.extravel.domain.member.controller;

import com.ict.extravel.domain.member.dto.request.LoginRequestDTO;
import com.ict.extravel.domain.member.dto.request.MemberSignUpRequestDTO;
import com.ict.extravel.domain.member.service.MemberService;
import com.ict.extravel.domain.member.dto.response.MemberSignUpResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/user/auth")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;





    //자체 회원가입 처리
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(
            @Validated @RequestBody MemberSignUpRequestDTO dto, BindingResult result
            ){
        log.info("/api/auth POST! = {}", dto);

        if(result.hasErrors()) {
            log.warn(result.toString());
            return ResponseEntity.badRequest()
                    .body(result.getFieldErrors());
        }
        try{
            MemberSignUpResponseDTO responseDTO = memberService.create(dto);
            return ResponseEntity.ok().body(responseDTO);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

//    @PostMapping("/siginin")
//    public ResponseEntity<?> signIn(
//            @Validated @RequestBody LoginRequestDTO dto,
//            BindingResult result
//    ) {
//        log.info("/api/auth/signin - POST - {}", dto);
//
//
//    }


}
