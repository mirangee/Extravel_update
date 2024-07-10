package com.ict.extravel.domain.member.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ict.extravel.domain.member.entity.Member;
import lombok.*;

import java.time.LocalDate;
import java.util.Map;

import static com.ict.extravel.domain.member.entity.Member.*;


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
    private Grade grade;
    private String phoneNumber;

    @JsonFormat(pattern = "yyyy년 MM월 dd일")
    private LocalDate registrationDate;

    private Map<String, String> token; // 인증 토큰


    public LoginResponseDTO(Member member, Map<String, String> token) {
        this.id = member.getId();
        this.email = member.getEmail();
        this.name = member.getName();
        this.nationCode = member.getNationCode().getNationCode();
        this.grade = member.getGrade();
        this.phoneNumber = member.getPhoneNumber();
        this.registrationDate = member.getRegistrationDate();
        this.token = token;
    }
    public LoginResponseDTO(String email,String name){
        this.email = email;
        this.name = name;
    }
}
