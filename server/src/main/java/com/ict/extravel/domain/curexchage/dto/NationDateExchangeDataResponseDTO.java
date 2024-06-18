package com.ict.extravel.domain.curexchage.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;


@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NationDateExchangeDataResponseDTO {
    private BigDecimal lastestCurEx;
    private BigDecimal lastestPreCurEx;
    private BigDecimal lastestWeekAverEx;
    private BigDecimal lastestMonthAverEx;
    private LocalDate lastestCurDate;
    private LocalDate lastestWeekDate;
    private LocalDate lastestWeekEndDate;
    private LocalDate lastestMonthDate;
    private LocalDate lastestMonthEndDate;
}
