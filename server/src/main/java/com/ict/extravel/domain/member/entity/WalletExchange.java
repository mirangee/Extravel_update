package com.ict.extravel.domain.member.entity;

import com.ict.extravel.domain.currency.entity.Currency;
import com.ict.extravel.domain.nation.entity.Nation;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "wallet_exchange")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WalletExchange {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nation_code")
    private Nation nationCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "currency_code")
    private Currency currencyCode;

    @Column(name = "exchange_amount", precision = 10, scale = 4)
    private BigDecimal exchangeAmount;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

}