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
public class FindPWRequestDTO {
    @NotBlank
    private String email;

    @NotBlank
    private String phoneNumber;

}
