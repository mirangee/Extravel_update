package com.ict.extravel.domain.pointexchange.dto.response;

import lombok.*;

import java.math.BigDecimal;

@Getter @Setter
@ToString @EqualsAndHashCode
@NoArgsConstructor @AllArgsConstructor
@Builder
public class PointInfoResponseDto {
    private BigDecimal etPoint;

    public PointInfoResponseDto toEntity(BigDecimal etPoint) {

        return PointInfoResponseDto.builder()
                .etPoint(etPoint).build();
    }
}
