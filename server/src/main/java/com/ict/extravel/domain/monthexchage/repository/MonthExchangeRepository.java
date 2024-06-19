package com.ict.extravel.domain.monthexchage.repository;

import com.ict.extravel.domain.monthexchage.entity.MonthlyPastExchangeRate;
import com.ict.extravel.domain.nation.entity.Nation;
import com.ict.extravel.domain.weekexchange.entity.WeeklyPastExchangeRate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MonthExchangeRepository extends JpaRepository<MonthlyPastExchangeRate, Integer> {
    MonthlyPastExchangeRate findTopByNationCodeOrderByStartDateDesc(Nation nationCode);
    List<MonthlyPastExchangeRate> findByNationCodeOrderByStartDate(Nation nation);

}
