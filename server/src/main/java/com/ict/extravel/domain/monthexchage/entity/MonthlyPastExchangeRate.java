package com.ict.extravel.domain.monthexchage.entity;

import com.ict.extravel.domain.currency.entity.Currency;
import com.ict.extravel.domain.nation.entity.Nation;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "monthly_past_exchange_rate")
public class MonthlyPastExchangeRate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "nation_code")
    private Nation nationCode;

    @ManyToOne
    @JoinColumn(name = "currency_code")
    private Currency currencyCode;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @NotNull
    @Column(name = "average_exchange_rate", nullable = false, precision = 10, scale = 4)
    private BigDecimal averageExchangeRate;

}