package com.ict.extravel.domain.member.dto.request;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ExchangeRequestDTO {
    private String email;
    private String nation;
    private String currencyCode;
    private BigDecimal etp;
    private BigDecimal exchangeRate;
    private BigDecimal to;
}
