package com.ict.extravel.domain.curexchage.dto;

import com.ict.extravel.domain.currency.entity.Currency;
import com.ict.extravel.domain.nation.entity.Nation;
import lombok.*;

import java.math.BigDecimal;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LiveRankExchangeResponseDTO {
    private String nationCode;
    private String nationName;
    private byte[] flag;
    private String currencyCode;
    private BigDecimal exchangeRate;
    private BigDecimal preExchangeRate;
    private BigDecimal changeRate;
}
