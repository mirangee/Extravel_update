package com.ict.extravel.domain.weekexchange.repository;

import com.ict.extravel.domain.weekexchange.entity.WeeklyPastExchangeRate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WeekExchangeRepository extends JpaRepository<WeeklyPastExchangeRate, Integer> {
}
