package com.ict.extravel.domain.curexchage.dto;

import com.ict.extravel.domain.currency.entity.Currency;
import com.ict.extravel.domain.nation.entity.Nation;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NationExChangeResponseDTO {
    private Nation nation;
    private String currencyCode;
    private String currencySymbol;
    private String currencyKorean;
    private BigDecimal exchangeRate;
    private BigDecimal preExchangeRate;
    private LocalDate updateDate;
}
