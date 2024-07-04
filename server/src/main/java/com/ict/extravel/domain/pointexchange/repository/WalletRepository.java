package com.ict.extravel.domain.pointexchange.repository;

import com.ict.extravel.domain.member.entity.Member;
import com.ict.extravel.domain.pointexchange.entity.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;

public interface WalletRepository extends JpaRepository<Wallet, Integer> {
    @Modifying
    @Transactional
    @Query("UPDATE Wallet w SET w.etPoint = :amount WHERE w.id = :id")
    void updateWalletById(@Param("amount") BigDecimal amount, @Param("id") Integer id);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO wallet (member_id, et_point) VALUES (?1, ?2)", nativeQuery = true)
    void insertWallet(Integer memberId, BigDecimal etPoint);
}
