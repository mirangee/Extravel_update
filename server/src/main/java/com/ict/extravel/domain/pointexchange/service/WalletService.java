package com.ict.extravel.domain.pointexchange.service;

import com.ict.extravel.domain.member.entity.Member;
import com.ict.extravel.domain.member.repository.MemberRepository;
import com.ict.extravel.domain.pointexchange.entity.Wallet;
import com.ict.extravel.domain.pointexchange.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class WalletService {
    private final MemberRepository memberRepository;
    private final WalletRepository walletRepository;
    public BigDecimal getWallet(String email) {
        Member member = memberRepository.findByEmail(email).orElseThrow();
        Wallet wallet = walletRepository.findById(member.getId()).orElseThrow();
        return wallet.getEtPoint();
    }
}
