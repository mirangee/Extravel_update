package com.ict.extravel.domain.googletrend.service;

import com.ict.extravel.domain.googletrend.dto.SearchTrendResponseDto;
import com.ict.extravel.domain.googletrend.entity.SearchTrend;
import com.ict.extravel.domain.googletrend.repository.GoogleTrendRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class GoogleTrendService {
    private final GoogleTrendRepository gtRepository;

    public List<SearchTrendResponseDto> getTrendData() {
        List<SearchTrend> searchTrendInOrder = gtRepository.getSearchTrendInOrder();
        List<SearchTrendResponseDto> dtoList = new ArrayList<>();
        for (SearchTrend searchTrend : searchTrendInOrder) {
            SearchTrendResponseDto dto = new SearchTrendResponseDto();
            dto.toDto(searchTrend);
            dtoList.add(dto);
        }
        return dtoList;
    }
}
