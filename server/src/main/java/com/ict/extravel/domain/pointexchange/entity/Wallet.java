package com.ict.extravel.domain.pointexchange.entity;

import com.ict.extravel.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor @AllArgsConstructor
@ToString @EqualsAndHashCode
@Builder
@Entity
@Table(name = "wallet")
public class Wallet {
    @Id
    @Column(name = "member_id", nullable = false)
    private Integer id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(name = "et_point", precision = 10, scale = 2)
    private BigDecimal etPoint;

    @Column(name = "updated_at")
    private Instant updatedAt;

}