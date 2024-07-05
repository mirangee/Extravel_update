package com.ict.extravel.domain.member.repository;

import com.ict.extravel.domain.member.entity.ExchangeHistory;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExChangeHistoryRepository extends JpaRepository<ExchangeHistory, Integer> {

    @Query("SELECT e FROM ExchangeHistory e WHERE e.member.id =:id ORDER BY e.transactionDate DESC")
    List<ExchangeHistory> findAllByMemberId(@Param("id") Integer id);
}
