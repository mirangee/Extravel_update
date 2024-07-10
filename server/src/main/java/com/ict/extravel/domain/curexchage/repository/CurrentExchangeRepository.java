package com.ict.extravel.domain.curexchage.repository;

import com.ict.extravel.domain.curexchage.entity.CurrentExchangeRate;
import com.ict.extravel.domain.nation.entity.Nation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CurrentExchangeRepository extends JpaRepository<CurrentExchangeRate,Integer> {
    CurrentExchangeRate findByNationCode(Nation nationCode);

}
