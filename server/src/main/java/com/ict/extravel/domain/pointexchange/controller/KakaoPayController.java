package com.ict.extravel.domain.pointexchange.controller;

import com.ict.extravel.domain.pointexchange.dto.PayInfoDto;
import com.ict.extravel.domain.pointexchange.service.KakaoPayService;
import lombok.RequiredArgsConstructor;
import com.ict.extravel.domain.pointexchange.dto.response.PayApproveResDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payment")
@Slf4j
public class KakaoPayController {

    private final KakaoPayService kakaoPayService;

    /** 결제 준비 redirect url 받기 --> 상품명과 가격을 같이 보내줘야함 */
    @GetMapping("/ready")
    public ResponseEntity<?> getRedirectUrl(@RequestBody PayInfoDto payInfoDto) {
        try {
            log.info("/payment/ready 요청 들어 옴! {}", payInfoDto);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(kakaoPayService.getRedirectUrl(payInfoDto));
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    /**
     * 결제 성공 pid 를  받기 위해 request를 받고 pgToken은 rediret url에 뒤에 붙어오는걸 떼서 쓰기 위함
     */
    @GetMapping("/success/{id}")
    public ResponseEntity<?> afterGetRedirectUrl(@PathVariable("id")Integer id,
                                                 @RequestParam("pg_token") String pgToken) {
        try {
            log.info("/payment/ready 요청 들어 옴! {}", pgToken);
            PayApproveResDto kakaoApprove = kakaoPayService.getApprove(pgToken,id);

            log.info("controller로 getApprove 결과가 반환됨, {}", kakaoApprove);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(kakaoApprove);
        }
        catch(Exception e){
            log.info(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * 결제 진행 중 취소
     */
    @GetMapping("/cancel")
    public ResponseEntity<?> cancel() {
        return ResponseEntity.badRequest().body("사용자가 결제를 취소하였습니다.");
    }

    /**
     * 결제 실패
     */
    @GetMapping("/fail")
    public ResponseEntity<?> fail() {

        return ResponseEntity.badRequest().body("결제가 실패하였습니다.");
    }

}