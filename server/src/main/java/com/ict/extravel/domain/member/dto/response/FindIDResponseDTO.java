package com.ict.extravel.domain.member.dto.response;

import com.ict.extravel.domain.member.entity.Member;
import lombok.*;

@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class FindIDResponseDTO {
    private String email;

    public FindIDResponseDTO(Member member) {
        this.email = member.getEmail();
    }
}
