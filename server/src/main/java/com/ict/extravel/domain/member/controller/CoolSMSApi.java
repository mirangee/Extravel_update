package com.ict.extravel.domain.member.controller;

import com.ict.extravel.domain.member.service.CoolSMSService;
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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Random;


//@Slf4j


@RestController
@RequestMapping("/user/auth")
@RequiredArgsConstructor
@Slf4j
public class CoolSMSApi {


    private final CoolSMSService coolSMSService;
    private DefaultMessageService messageService;


    @Value("${CoolSMS.api_key}")
    private String API_KEY;
    @Value("${CoolSMS.apiSecretKey}")
    private String API_SECRET_KEY;
    @Value("${CoolSMS.web}")
    private String WEB;
    @Value("${CoolSMS.phone_number}")
    private int PHONE_NUMBER;

    @PostConstruct //init 메서드가 sendOne 메서드 호출 시 자동으로 호출
    private void init() {
        // 반드시 계정 내 등록된 유효한 API 키, API Secret Key를 입력해주셔야 합니다!
        this.messageService = NurigoApp.INSTANCE.initialize(API_KEY, API_SECRET_KEY, "https://api.coolsms.co.kr");
        log.info("CoolSMS Message Service initialized with API Key: {}, API_SECRET_KEY: {} ", API_KEY, API_SECRET_KEY);
    }


    // 단일 메시지 발송 예제
    @ResponseBody
    @PostMapping("/send-one")
    public ResponseEntity<?> sendOne(@RequestBody Map<String, String> data) throws NurigoMessageNotReceivedException, NurigoEmptyResponseException, NurigoUnknownException {
        return handleSmsRequest(data, false);
    }

    @ResponseBody
    @PostMapping("/findidpw")
    public ResponseEntity<?> findIdPw(@RequestBody Map<String, String> data) throws NurigoMessageNotReceivedException, NurigoEmptyResponseException, NurigoUnknownException {
        return handleSmsRequest(data, true);
    }

    private ResponseEntity<?> handleSmsRequest(Map<String, String> data, boolean isFindIdPw) throws NurigoMessageNotReceivedException, NurigoEmptyResponseException, NurigoUnknownException {
        String phoneNumber = data.get("phoneNumber");
        log.info("요청 들어옴 {} ", phoneNumber);

        boolean isDuplicate = isFindIdPw ? coolSMSService.findIDPWservice(phoneNumber) : coolSMSService.sendSmsToFindEmail(phoneNumber);
        int verificationCode = generateRandomNumber();

        if (isDuplicate && !isFindIdPw) {
            log.error("중복된 번호입니다: {}", phoneNumber);
            return ResponseEntity.badRequest().body("중복된 번호입니다.");
        } else if (!isDuplicate && isFindIdPw) {
            log.error("없는 번호입니다: {}", phoneNumber);
            return ResponseEntity.badRequest().body("없는 번호입니다.");
        }

        Message message = new Message();
        message.setFrom("01021356409");
        message.setTo(phoneNumber);
        message.setText("[EXTRAVEL] 아래의 인증번호를 [" + verificationCode + "] 입력해주세요!\n");

        log.info("Sending SMS to: {} with verification code: {}", phoneNumber, verificationCode);

        MultipleDetailMessageSentResponse messageSentResponse = messageService.send(message);
        log.info("{}", messageSentResponse.toString());
        log.info("SMS sent successfully to {}", phoneNumber);

        return ResponseEntity.ok().body(verificationCode);
    }

    private int generateRandomNumber() {
        Random random = new Random();
        int min = 100000;
        int max = 999999;
        return random.nextInt(max - min + 1) + min;
    }


}


