package com.ict.extravel.domain.member.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class NaverUserDTO {

    @JsonProperty("response")
    private Response response;

    @Getter @Setter
    @ToString
    @NoArgsConstructor
    @AllArgsConstructor
    public class Response {
        private String name;
        private String email;
    }

}
