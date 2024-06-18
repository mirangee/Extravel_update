package com.ict.extravel.domain.weekexchange.dto;

import lombok.*;
import org.springframework.cglib.core.Local;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@EqualsAndHashCode(of = "nationCode")
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WeekExShowResponseDTO {
    private String nationCode;
    private String nationName;
    private String currencyCode;
    private String currencySymbol;
    private LocalDate startDate;
    private LocalDate endDate;
    private String calDate;
    private BigDecimal averRate;
    private BigDecimal curRate;
}
