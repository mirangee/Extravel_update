package com.ict.extravel.domain.currency.repository;

import com.ict.extravel.domain.currency.entity.Currency;
import com.ict.extravel.domain.nation.entity.Nation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CurrencyRepository extends JpaRepository<Currency, String> {
    Currency findByNationCode(Nation nationCode);
}
