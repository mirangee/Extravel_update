package com.ict.extravel;

import com.ict.extravel.domain.member.entity.Member;
import com.ict.extravel.domain.member.repository.MemberRepository;
import com.ict.extravel.domain.nation.repository.NationRepository;
import com.ict.extravel.global.scheduler.exchage.ExchageCrolling;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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


}
