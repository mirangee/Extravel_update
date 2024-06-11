package com.ict.extravel.domain.currency.entity;

import com.ict.extravel.domain.nation.entity.Nation;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "tbl_currency")
public class Currency {
    @Id
    @Size(max = 3)
    @Column(name = "currency_code", nullable = false, length = 3,columnDefinition = "char(3)")
    private String currencyCode;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nation_code")
    private Nation nationCode;

    @Size(max = 10)
    @Column(name = "currency_symbol", length = 10)
    private String currencySymbol;

    @Size(max = 30)
    @Column(name = "currency_korean", length = 30)
    private String currencyKorean;

}