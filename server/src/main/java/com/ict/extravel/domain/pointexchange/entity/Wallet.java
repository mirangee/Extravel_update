package com.ict.extravel.domain.pointexchange.entity;

import com.ict.extravel.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;

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

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

}