package com.ict.extravel.domain.member.dto.request;

import com.ict.extravel.domain.member.entity.Member;
import com.ict.extravel.domain.nation.entity.Nation;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Setter
@Getter
@ToString
@EqualsAndHashCode(of = "email")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberSignUpRequestDTO {


    @NotBlank
    @Size(min = 2, max = 5)
    private String name;

    @NotBlank
    @Size(max = 11)
    private String phoneNumber;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 8, max = 20)
    private String password;


    public Member toEntity(Nation us) {

        return Member.builder()
                .name(name)
                .phoneNumber(phoneNumber)//리액트랑 동일명
                .email(email)
                .password(password)
                .nationCode(us)
                .build();
    }
}
