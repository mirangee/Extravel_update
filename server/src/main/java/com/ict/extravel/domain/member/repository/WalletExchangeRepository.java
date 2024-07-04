package com.ict.extravel.domain.member.repository;

import com.ict.extravel.domain.currency.entity.Currency;
import com.ict.extravel.domain.member.entity.Member;
import com.ict.extravel.domain.member.entity.WalletExchange;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WalletExchangeRepository extends JpaRepository<WalletExchange,Integer> {
    WalletExchange findByMemberAndCurrencyCode(Member member, Currency currency);
}
