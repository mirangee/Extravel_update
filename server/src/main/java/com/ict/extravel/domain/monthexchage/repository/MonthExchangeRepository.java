package com.ict.extravel.domain.monthexchage.repository;

import com.ict.extravel.domain.monthexchage.entity.MonthlyPastExchangeRate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MonthExchangeRepository extends JpaRepository<MonthlyPastExchangeRate, Integer> {
}
