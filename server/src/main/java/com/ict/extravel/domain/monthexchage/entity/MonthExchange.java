package com.ict.extravel.domain.monthexchage.entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "monthly_past_exchange_rate")
public class MonthExchange {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nationCode;
    private String currencyCode;
    private double averageExchangeRate;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
