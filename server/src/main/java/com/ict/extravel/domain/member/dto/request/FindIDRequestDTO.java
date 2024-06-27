package com.ict.extravel.domain.member.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FindIDRequestDTO {

    @NotBlank
    private String name;

    @NotBlank
    private String phoneNumber;

}
