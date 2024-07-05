package com.ict.extravel.domain.member.dto.response;
import com.ict.extravel.domain.member.entity.ExchangeHistory;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@AllArgsConstructor @NoArgsConstructor
@Getter @Setter
@ToString @EqualsAndHashCode
public class ExchangeHistoryResponseDTO {
    private String currencyCode;
    private BigDecimal amount;
    private BigDecimal exchangeRate;
    private LocalDate transactionDate;
    private BigDecimal useEtPoint;
    private byte[] flag;

    public ExchangeHistoryResponseDTO(ExchangeHistory e) {
        this.currencyCode = e.getCurrencyCode().getCurrencyCode();
        this.amount = e.getAmount();
        this.exchangeRate = e.getExchangeRate();
        this.transactionDate = e.getTransactionDate();
        this.useEtPoint = e.getUseEtPoint();
        this.flag = e.getCurrencyCode().getNationCode().getFlag();
    }
}
