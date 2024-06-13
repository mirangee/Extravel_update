package com.ict.extravel.domain.member.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ict.extravel.domain.member.entity.Member;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.context.annotation.Profile;

import java.time.LocalDateTime;

@Setter @Getter
@ToString
public class KakaoUserDTO {

    private long id;

    @JsonProperty("connedted_at")
    private LocalDateTime connectedAt;

    @JsonProperty("kakao_account")
    private KakaoAccount kakaoAccount;

    @Setter @Getter
    @ToString
    public static class KakaoAccount {
        private String email;
        private Profile profile;

        @Getter @Setter
        @ToString
        public static class Profile {
            private String nickname;

            @JsonProperty("profile_image_url")
            private String profileimageUrl;
        }
    }

    /* public Member toEntity(String accessToken) {
        return Member.builder()
                .email(this.kakaoAccount.email)
                .name(this.kakaoAccount.profile.nickname)
                .password("password!")
                .accessToken(accessToken)
                .build();
    }*/

}
