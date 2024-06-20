package com.ict.extravel.domain.member.controller;

import lombok.extern.slf4j.Slf4j;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.exception.NurigoMessageNotReceivedException;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Random;

@Slf4j
public class CoolSMSApi {

    @Value("${CoolSMS.api_key}")
    private String API_KEY;

    @Value("${CoolSMS.apiSecretKey}")
    private String API_SECRET_KEY;

    @Value("${CoolSMS.web}")
    private String WEB;

    @Value("${CoolSMS.phone_number}")
    private int PHONE_NUMBER;


    @GetMapping("/sms")
    public void sms() {
        // 랜덤 난수 생성
        int verificationCode = generateRandomNumber();

        DefaultMessageService messageService = NurigoApp.INSTANCE.initialize("API_KEY", "API_SECRET_KEY", "WEB");
        Message message = new Message();
        message.setFrom("PHONE_NUMBER");
        message.setTo("01021356409");
        message.setText("인증번호는 " + verificationCode + "입니다.");


        try {
            messageService.send(message); // SMS 발송 요청
            System.out.println("인증번호가 성공적으로 발송되었습니다.");
        } catch (NurigoMessageNotReceivedException exception) {
            // 발송 실패 시 예외 처리
            System.out.println("SMS 발송에 실패했습니다.");
            System.out.println(exception.getFailedMessageList());
            System.out.println(exception.getMessage());

        } catch (Exception exception) {
            System.out.println("SMS 발송 중 오류가 발생했습니다.");
            System.out.println(exception.getMessage());
        }
    }

    public int generateRandomNumber() {
        Random random = new Random();
        int min = 100000;
        int max = 999999;
        return random.nextInt(max - min + 1) + min;
    }

}
