package com.ict.extravel.domain.member.dto.response;

import com.ict.extravel.domain.member.entity.Member;
import jakarta.validation.constraints.Email;
import lombok.*;

@Getter
@Setter
@ToString
@EqualsAndHashCode(of = "email")
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class FindIDResponseDTO {
    @Email
    private String email;

    public FindIDResponseDTO(Member member) {
        this.email = member.getEmail();
    }
}
