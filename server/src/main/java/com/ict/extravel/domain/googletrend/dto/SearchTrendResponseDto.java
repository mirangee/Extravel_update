package com.ict.extravel.domain.googletrend.dto;

import com.ict.extravel.domain.googletrend.entity.SearchTrend;
import lombok.*;

import java.util.List;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchTrendResponseDto {
    private List<SearchTrend> searchTrendList;
}
