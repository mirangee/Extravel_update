package com.ict.extravel.domain.member.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SnsSignUpRequestDTO {
    private String name;
    private String phoneNumber;
    private String email;
    private String path;
}
