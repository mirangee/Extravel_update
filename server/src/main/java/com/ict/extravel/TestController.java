package com.ict.extravel;

import com.ict.extravel.domain.member.repository.MemberRepository;
import com.ict.extravel.domain.nation.repository.NationRepository;
import com.ict.extravel.global.scheduler.exchage.ExchageCrolling;
import lombok.RequiredArgsConstructor;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.exception.NurigoMessageNotReceivedException;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/test")
public class TestController {
    private final ExchageCrolling exchageCrolling;
    private final MemberRepository memberRepository;
    private final NationRepository nationRepository;

    @GetMapping("/exchage")
    public void exchageCrolling() {
        exchageCrolling.saveCurExchageData();
    }

    @GetMapping("/sms")
    public void sms(){
        DefaultMessageService messageService =  NurigoApp.INSTANCE.initialize("", "", "https://api.coolsms.co.kr");
// Message 패키지가 중복될 경우 net.nurigo.sdk.message.model.Message로 치환하여 주세요
        Message message = new Message();
        message.setFrom("");
        message.setTo("");
        message.setText("Hello World.");

        try {
            // send 메소드로 ArrayList<Message> 객체를 넣어도 동작합니다!
            messageService.send(message);
        } catch (NurigoMessageNotReceivedException exception) {
            // 발송에 실패한 메시지 목록을 확인할 수 있습니다!
            System.out.println(exception.getFailedMessageList());
            System.out.println(exception.getMessage());
        } catch (Exception exception) {
            System.out.println(exception.getMessage());
        }
    }


}
