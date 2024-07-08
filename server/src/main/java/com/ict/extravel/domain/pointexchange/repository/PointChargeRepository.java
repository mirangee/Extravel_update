package com.ict.extravel.domain.pointexchange.repository;

import com.ict.extravel.domain.member.entity.Member;
import com.ict.extravel.domain.pointexchange.dto.response.PayConfirmResponseDTO;
import com.ict.extravel.domain.pointexchange.entity.PointCharge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface PointChargeRepository extends JpaRepository<PointCharge, String> {

    @Transactional
    @Modifying
    @Query("UPDATE PointCharge p SET p.approvedAt = :approvedAt, p.status = :status, p.inUse = :inUse WHERE p.tid = :tid")
    void updatePointChargeBy(@Param("tid") String tid, @Param("approvedAt") LocalDateTime approvedAt,
                             @Param("status") PointCharge.Status status, @Param("inUse") boolean inUse);
    @Transactional
    @Modifying
    @Query("UPDATE PointCharge p SET p.inUse = false WHERE p.tid = :tid")
    void updateInUseByTid(@Param("tid") String tid);

    @Query("SELECT p.tid FROM PointCharge  p WHERE p.member.id = :id AND p.inUse = true")
    String findCurrentTidbyId(@Param("id") Integer id);

    @Query("SELECT p FROM PointCharge p WHERE p.member.id = :memberId AND (p.status = 'SUCCESS' OR p.status = 'USED') ORDER BY p.createdAt DESC")
    List<PointCharge> findAllByMemberId(@Param("memberId") Integer id);



    List<PointCharge> findByMember(Member member);
}
