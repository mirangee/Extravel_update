package com.ict.extravel.domain.member.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter @Setter
@ToString
public class NaverUserDTO {

    @JsonProperty("response")
    private NaverUserDetail naverUserDetail;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    public static class NaverUserDetail {
        private String name;
        private String email;
    }

}
