package com.ict.extravel.domain.pointexchange.dto.response;

import com.ict.extravel.domain.member.entity.Member;
import com.ict.extravel.domain.pointexchange.entity.PointCharge;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter @Setter
@ToString @EqualsAndHashCode
@NoArgsConstructor @AllArgsConstructor
@Builder
@Transactional
public class PayConfirmResponseDTO {
    private String tid;

    private Integer memberId;

    private BigDecimal amount;

    private BigDecimal plusPoint;

    private LocalDateTime createdAt;

    private LocalDateTime approvedAt;

    private PointCharge.Status status;

    private BigDecimal etPoint;

    private BigDecimal countPoint;
    public static PayConfirmResponseDTO toDto(PointCharge pointCharge, BigDecimal etPoint){
        PayConfirmResponseDTO payConfirmResponseDTO = PayConfirmResponseDTO.builder()
                .tid(pointCharge.getTid())
                .memberId(pointCharge.getMember().getId())
                .amount(pointCharge.getAmount())
                .plusPoint(pointCharge.getPlusPoint())
                .createdAt(pointCharge.getCreatedAt())
                .approvedAt(pointCharge.getApprovedAt())
                .status(pointCharge.getStatus())
                .etPoint(etPoint)
                .build();
        return payConfirmResponseDTO;
    }

}
