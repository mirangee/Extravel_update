package com.ict.extravel.domain.pointexchange.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@ToString @EqualsAndHashCode
public class AmountDto {
    private int total;

    @JsonProperty("tax_free")
    private int taxFree;
    private int vat;
    private int point;
    private int discount;

    @JsonProperty("green_deposit")
    private int greenDeposit;
}
