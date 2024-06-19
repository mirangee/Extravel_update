package com.ict.extravel.domain.pointexchange.controller;

import com.ict.extravel.domain.pointexchange.dto.PayInfoDto;
import com.ict.extravel.domain.pointexchange.dto.response.PayApproveResDto;
import com.ict.extravel.domain.pointexchange.service.KakaoPayService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/payment")
public class KakaoPayController {

    private final KakaoPayService kakaoPayService;

    /** 결제 준비 redirect url 받기 --> 상품명과 가격을 같이 보내줘야함 */
    @GetMapping("/ready")
    public ResponseEntity<?> getRedirectUrl(@RequestBody PayInfoDto payInfoDto) {

        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(kakaoPayService.getRedirectUrl(payInfoDto));
        } catch (Exception e) {
            log.error(e.getMessage());
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
            PayApproveResDto kakaoApprove = kakaoPayService.getApprove(pgToken,id);

            return ResponseEntity.status(HttpStatus.OK)
                    .body(kakaoApprove);
        }
        catch(Exception e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * 결제 진행 중 취소
     */
    @GetMapping("/cancel")
    public ResponseEntity<?> cancel() {
        return ResponseEntity.badRequest().body("사용자가 결제를 취소했습니다.");
    }

    /**
     * 결제 실패
     */
    @GetMapping("/fail")
    public ResponseEntity<?> fail() {

        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
                .body(new BaseResponse<>(HttpStatus.EXPECTATION_FAILED.value(),"결제가 실패하였습니다."));

    }

}
