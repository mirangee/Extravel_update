package com.ict.extravel.domain.weekexchange.repository;

import com.ict.extravel.domain.monthexchage.entity.MonthlyPastExchangeRate;
import com.ict.extravel.domain.nation.entity.Nation;
import com.ict.extravel.domain.weekexchange.entity.WeeklyPastExchangeRate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WeekExchangeRepository extends JpaRepository<WeeklyPastExchangeRate, Integer> {
    List<WeeklyPastExchangeRate> findByNationCodeOrderByStartDate(Nation nation);
    WeeklyPastExchangeRate findTopByNationCodeOrderByStartDateDesc(Nation nationCode);
}
