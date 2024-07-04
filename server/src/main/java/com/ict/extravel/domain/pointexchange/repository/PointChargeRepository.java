package com.ict.extravel.domain.pointexchange.repository;

import com.ict.extravel.domain.pointexchange.entity.PointCharge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

public interface PointChargeRepository extends JpaRepository<PointCharge, String> {

    @Modifying
    @Transactional
    @Query("UPDATE PointCharge p SET p.approvedAt = :approvedAt, p.status = :status, p.inUse = :inUse WHERE p.tid = :tid")
    void updatePointChargeBy(@Param("tid") String tid, @Param("approvedAt") LocalDateTime approvedAt,
                             @Param("status") PointCharge.Status status, @Param("inUse") boolean inUse);

    @Modifying
    @Transactional
    @Query("UPDATE PointCharge p SET p.inUse = false WHERE p.tid = :tid")
    void updateInUseByTid(@Param("tid") String tid);

    @Transactional
    @Query("SELECT p.tid FROM PointCharge  p WHERE p.member.id = :id AND p.inUse = true")
    String findCurrentTidbyId(@Param("id") Integer id);

    @Transactional
    @Query("SELECT p FROM PointCharge p WHERE p.member.id = :memberId AND p.status = 'SUCCESS' ORDER BY p.createdAt DESC")
    List<PointCharge> findAllByMemberId(@Param("memberId") Integer id);

}
