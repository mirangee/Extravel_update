package com.ict.extravel.global.auth;

import lombok.*;

@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TokenUserInfo {

    private String id;
    private String email;


}