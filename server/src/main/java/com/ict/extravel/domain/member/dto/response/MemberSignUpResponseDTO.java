package com.ict.extravel.domain.member.dto.response;

import com.ict.extravel.domain.member.entity.Member;
import lombok.*;

@Setter
@Getter
@ToString
@EqualsAndHashCode(of = "email")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberSignUpResponseDTO {

    private String email;
    private String name;

    public MemberSignUpResponseDTO(Member saved){
        this.email = saved.getEmail();
        this.name = saved.getName();
    }

}
