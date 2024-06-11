package com.ict.extravel.domain.curexchage.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "current_exchange_rate")
public class CurExchange {
    @Id
    private Long id;
    private String nationCode;
    private String currencyCode;
    private double exchangeRateValue;
    private double preExchangeRateValue;
    private LocalDateTime updatedDate;


}
