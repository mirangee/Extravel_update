package com.ict.extravel.domain.pointexchange.controller;

import com.ict.extravel.domain.pointexchange.dto.PayInfoDto;
import com.ict.extravel.domain.pointexchange.dto.response.PaymentDto;
import com.ict.extravel.domain.pointexchange.service.KakaoPayService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.PrintWriter;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payment")
@Slf4j
public class KakaoPayController {

    private final KakaoPayService kakaoPayService;



    /**
     * 결제 진행 중 취소
     */
    @GetMapping("/cancel")
    public ResponseEntity<?> cancel() {
        return ResponseEntity.badRequest().body("결제가 취소되었습니다.");
    }

    /**
     * 결제 실패
     */
    @GetMapping("/fail")
    public ResponseEntity<?> fail() {

        return ResponseEntity.badRequest().body("결제가 실패하였습니다.");
    }

}