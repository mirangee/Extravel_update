package com.ict.extravel.domain.member.dto.response;

import com.ict.extravel.domain.member.entity.Member;
import lombok.*;


@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder


public class LoginResponseDTO {
    private String email;
    private String name;

    public LoginResponseDTO(Member member) {
        this.email = member.getEmail();
        this.name = member.getName();
    }
}
