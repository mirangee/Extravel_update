package com.ict.extravel.domain.member.service;

import com.ict.extravel.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor


public class CoolSMSService {

    private final MemberRepository memberRepository;
    private final DefaultMessageService messageService;


    public boolean sendSmsToFindEmail(String phoneNumber) {

        phoneNumber = phoneNumber.replaceAll("-", "");

        //찾기 위한 번호
//        Member foundUser = memberRepository.findByPhoneNumber(phoneNumber)
//                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 전화번호 입니다."));
        boolean flag = memberRepository.existsByPhoneNumber(phoneNumber);

        log.info("전화번호 존재 여부 {}", flag);


        return flag;
        }

}
