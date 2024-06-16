package com.ict.extravel.domain.member.dto;

import lombok.*;

@Getter @Setter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class GoogleUserInfoDTO {
    private String email;
    private String name;
}
