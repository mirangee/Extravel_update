package com.ict.extravel.domain.pointexchange.repository;

import com.ict.extravel.domain.pointexchange.entity.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface WalletRepository extends JpaRepository<Wallet, Integer> {
    @Modifying
    @Transactional
    @Query("UPDATE Wallet w SET w.etPoint = :amount WHERE w.id = :id")
    void updateWalletById(@Param("amount") float amount, @Param("id") Integer id);
}
