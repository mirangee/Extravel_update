package com.ict.extravel.domain.member.service;

import com.ict.extravel.domain.member.entity.Member;
import com.ict.extravel.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CoolSMSService {

    private final MemberRepository memberRepository;

    public boolean sendSmsToFindEmail(String phoneNumber) {

        phoneNumber = phoneNumber.replaceAll("-", "");

        //찾기 위한 번호
        boolean flag = memberRepository.existsByPhoneNumber(phoneNumber);

        log.info("전화번호 존재 여부 {}", flag);


        return flag;
    }


    public boolean findIDPWservice(String phoneNumber) {

        phoneNumber = phoneNumber.replaceAll("-", "");

        Member foundUser = memberRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow();
        if(foundUser != null) {
            System.out.println("이미 가입된 번호입니다.");
        }
        boolean flag = memberRepository.existsByPhoneNumber(phoneNumber);

        log.info("전화번호 존재 여부 {}", flag);

        return flag;
    }
}
