package com.ict.extravel.domain.pointexchange.dto.response;

import lombok.*;

import java.math.BigDecimal;

@Getter @Setter
@ToString @EqualsAndHashCode
@NoArgsConstructor @AllArgsConstructor
@Builder
public class PointInfoResponseDto {
    private BigDecimal etPoint;
    private BigDecimal countPoint; // 충전 누적합

    public PointInfoResponseDto toEntity(BigDecimal etPoint, BigDecimal countPoint) {

        return PointInfoResponseDto.builder()
                .etPoint(etPoint)
                .countPoint(countPoint)
                .build();

    }
}
