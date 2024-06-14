package com.ict.extravel.domain.curexchage.repository;

import com.ict.extravel.domain.curexchage.entity.CurrentExchangeRate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CurrentExchangeRepository extends JpaRepository<CurrentExchangeRate,Integer> {
}
