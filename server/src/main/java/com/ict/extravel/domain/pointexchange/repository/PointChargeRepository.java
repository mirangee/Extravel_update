package com.ict.extravel.domain.pointexchange.repository;

import com.ict.extravel.domain.member.entity.Member;
import com.ict.extravel.domain.pointexchange.entity.PointCharge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

public interface PointChargeRepository extends JpaRepository<PointCharge, String> {

    @Modifying
    @Transactional
    @Query("UPDATE PointCharge p SET p.approvedAt = :approvedAt, p.status = :status WHERE p.tid = :tid")
    void updatePointChargeBy(@Param("tid") String tid, @Param("approvedAt") LocalDateTime approvedAt, @Param("status") PointCharge.Status status);
}
