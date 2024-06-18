package com.ict.extravel.domain.nation.dto;

import jakarta.persistence.Column;
import lombok.*;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NationSelectResponseDTO {
    private String name;
    private byte[] flag;

}
