package com.ict.extravel.domain.member.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@AllArgsConstructor @NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
@Builder
public class GoogleSignupRequestDTO {
//    @NotBlank
//    @Email
//    private String email;
//
//    @NotBlank
//    private String name;

    @NotBlank
    private String accessToken;
}
