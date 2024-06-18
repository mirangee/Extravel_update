package com.ict.extravel.domain.monthexchage.repository;

import com.ict.extravel.domain.monthexchage.entity.MonthlyPastExchangeRate;
import com.ict.extravel.domain.nation.entity.Nation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MonthExchangeRepository extends JpaRepository<MonthlyPastExchangeRate, Integer> {
    MonthlyPastExchangeRate findTopByNationCodeOrderByStartDateDesc(Nation nationCode);
}
