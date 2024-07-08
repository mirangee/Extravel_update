package com.ict.extravel.domain.member.repository;

import com.ict.extravel.domain.currency.entity.Currency;
import com.ict.extravel.domain.member.entity.Member;
import com.ict.extravel.domain.member.entity.WalletExchange;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WalletExchangeRepository extends JpaRepository<WalletExchange,Integer> {
    WalletExchange findByMemberAndCurrencyCode(Member member, Currency currency);

    @Query("SELECT w FROM WalletExchange w WHERE w.member.id =:id")
    List<WalletExchange> findAllByMemberId(@Param("id") Integer id);


}
