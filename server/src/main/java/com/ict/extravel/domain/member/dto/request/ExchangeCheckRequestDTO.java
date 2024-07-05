package com.ict.extravel.domain.member.dto.request;

import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExchangeCheckRequestDTO {
    private String email;
    private String phoneNum;
}
