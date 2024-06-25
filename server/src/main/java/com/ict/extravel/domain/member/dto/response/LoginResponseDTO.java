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
    private Integer id;
    private String email;
    private String name;
    private String nationCode;
    private Member.Grade grade;

    public LoginResponseDTO(Member member) {
        this.id = member.getId();
        this.email = member.getEmail();
        this.name = member.getName();
        this.nationCode = member.getNationCode().getNationCode();
        this.grade = member.getGrade();
    }
}
