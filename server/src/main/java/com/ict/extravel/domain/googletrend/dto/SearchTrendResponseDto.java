package com.ict.extravel.domain.googletrend.dto;

import com.ict.extravel.domain.googletrend.entity.SearchTrend;
import lombok.*;

import java.time.Instant;
import java.util.List;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchTrendResponseDto {
    private String nationCode;
    private String nationName;
    private String nationNameEn;
    private Integer totalSearches;
    private Instant updatedAt;
    private String imgUrl;

    public void toDto(SearchTrend searchTrend) {
        this.nationCode = searchTrend.getNationCode();
        this.nationName = searchTrend.getNationName();
        this.nationNameEn = searchTrend.getNationNameEn();
        this.totalSearches = searchTrend.getTotalSearches();
        this.updatedAt = searchTrend.getUpdatedAt();
        this.imgUrl = searchTrend.getImgUrl();
    }
}
