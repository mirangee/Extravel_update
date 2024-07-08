package com.ict.extravel.domain.member.dto.response;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HistoryAverResponseDTO {
    private String name;
    private Double average;
}
