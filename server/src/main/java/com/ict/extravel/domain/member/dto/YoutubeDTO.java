package com.ict.extravel.domain.member.dto;


import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString @EqualsAndHashCode

public class YoutubeDTO {
    private String part;
    private String chart;
    private int maxResult;
    private String regionCode;

}
