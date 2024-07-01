package com.ict.extravel.domain.googletrend.repository;

import com.ict.extravel.domain.googletrend.entity.SearchTrend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface GoogleTrendRepository extends JpaRepository<SearchTrend, String> {
    @Transactional
    @Query("SELECT s FROM SearchTrend s ORDER BY s.totalSearches DESC LIMIT 6")
    List<SearchTrend> getSearchTrendInOrder();
}
