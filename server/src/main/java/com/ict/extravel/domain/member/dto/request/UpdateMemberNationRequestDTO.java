package com.ict.extravel.domain.member.dto.request;


import lombok.*;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateMemberNationRequestDTO {
    private String email;
    private String nationCode;
}
