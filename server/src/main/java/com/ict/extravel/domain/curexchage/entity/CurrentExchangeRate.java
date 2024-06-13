package com.ict.extravel.domain.curexchage.entity;

import com.ict.extravel.domain.currency.entity.Currency;
import com.ict.extravel.domain.nation.entity.Nation;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "current_exchange_rate")
public class CurrentExchangeRate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nation_code")
    private Nation nationCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "currency_code")
    private Currency currencyCode;

    @Column(name = "exchange_rate_value", precision = 10, scale = 4)
    private BigDecimal exchangeRateValue;

    @Column(name = "pre_exchange_rate_value", precision = 10, scale = 4)
    private BigDecimal preExchangeRateValue;

    @Column(name = "update_date")
    private LocalDate updateDate;

}