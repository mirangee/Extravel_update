package com.ict.extravel.domain.googletrend.controller;

import com.ict.extravel.domain.curexchage.dto.NationDateExchangeDataResponseDTO;
import com.ict.extravel.domain.googletrend.dto.SearchTrendResponseDto;
import com.ict.extravel.domain.googletrend.entity.SearchTrend;
import com.ict.extravel.domain.googletrend.repository.GoogleTrendRepository;
import com.ict.extravel.domain.googletrend.service.GoogleTrendService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/trend")
@RequiredArgsConstructor
public class TrendController {
    private final GoogleTrendService googleTrendService;

    @GetMapping("/data")
    public ResponseEntity<?> googleTrendData() {
        List<SearchTrendResponseDto> dtoList = googleTrendService.getTrendData();
        return ResponseEntity.ok(dtoList);
    }
}
