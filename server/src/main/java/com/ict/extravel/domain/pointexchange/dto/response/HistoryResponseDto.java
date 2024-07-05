package com.ict.extravel.domain.pointexchange.dto.response;

import com.ict.extravel.domain.pointexchange.entity.PointCharge;
import lombok.*;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString @EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HistoryResponseDto {

    private BigDecimal amount;

    private BigDecimal plusPoint;

    private LocalDateTime createdAt;

    private PointCharge.Status status;

    private BigDecimal sum;

    public HistoryResponseDto(PointCharge p) {
        this.amount = p.getAmount();
        this.plusPoint = p.getPlusPoint();
        this.createdAt = p.getCreatedAt();
        this.status = p.getStatus();
        this.sum = this.amount.add(this.plusPoint);
    }
}
