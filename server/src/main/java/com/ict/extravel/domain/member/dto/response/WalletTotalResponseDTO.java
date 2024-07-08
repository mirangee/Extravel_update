package com.ict.extravel.domain.member.dto.response;

import com.ict.extravel.domain.member.entity.ExchangeHistory;
import com.ict.extravel.domain.member.entity.WalletExchange;
import lombok.*;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class WalletTotalResponseDTO {
    private BigDecimal exchangeAmount;
    private String currencyCode;
    private byte[] flag;

    public WalletTotalResponseDTO(WalletExchange w) {
        this.exchangeAmount = w.getExchangeAmount();
        this.currencyCode = w.getCurrencyCode().getCurrencyCode();
        this.flag = w.getCurrencyCode().getNationCode().getFlag();
    }

}
