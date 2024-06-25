package com.ict.extravel.domain.pointexchange.entity;

import com.ict.extravel.domain.member.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor @AllArgsConstructor
@Builder
@Entity
@Table(name = "tbl_charge_history")
public class PointCharge {
    @Id
    @Size(max = 255)
    @Column(name = "tid", nullable = false)
    private String tid;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @NotNull
    @Column(name = "amount", nullable = false)
    private Integer amount;

    @Column(name = "plus_point")
    private Float plusPoint;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "approved_at")
    private LocalDateTime approvedAt;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 50)
    private Status status;

    public enum Status {
        PENDING, SUCCESS, FAILED, CANCELED
    }

    @Column(name = "in_use")
    private boolean inUse;
}