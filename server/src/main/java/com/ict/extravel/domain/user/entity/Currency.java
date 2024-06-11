package com.ict.extravel.domain.user.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter @Setter @ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "tbl_currency")
public class Currency {
    @Id
    @Column(name = "currency_code")
    private String currencyCode;

    @OneToOne
    @JoinColumn(name = "nationCode")
    private Nation nation;

    @Column(name = "currency_symbol")
    private String currencySymbol;

    @Column(name = "currency_korean")
    private String currencyKorean;
}
