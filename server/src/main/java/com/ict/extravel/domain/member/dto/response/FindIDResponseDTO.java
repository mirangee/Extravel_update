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

    // 이메일 값만 반환하는 메서드 추가
    public String getFormattedEmail() {
        return this.email;
    }
}
