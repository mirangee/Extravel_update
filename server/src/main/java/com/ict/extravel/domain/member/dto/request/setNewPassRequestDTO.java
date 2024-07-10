package com.ict.extravel.domain.member.dto.request;

import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class setNewPassRequestDTO {
    private String email;
    private String newPass;
}
