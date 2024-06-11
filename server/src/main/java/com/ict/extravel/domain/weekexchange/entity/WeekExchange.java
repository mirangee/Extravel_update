package com.ict.extravel.domain.weekexchange.entity;

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
@Table(name = "weekly_past_exchange_rate")
public class WeekExchange {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nationCode;
    private String currencyCode;
    private double averageExchangeRate;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
