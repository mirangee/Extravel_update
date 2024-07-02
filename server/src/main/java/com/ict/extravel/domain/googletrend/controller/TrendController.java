package com.ict.extravel.domain.googletrend.controller;

import com.ict.extravel.domain.googletrend.dto.SearchTrendResponseDto;
import com.ict.extravel.domain.googletrend.service.GoogleTrendService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/trend")
@RequiredArgsConstructor
@Slf4j
public class TrendController {

    private final GoogleTrendService googleTrendService;

    @GetMapping("/data")
    public ResponseEntity<?> googleTrendData() {
        List<SearchTrendResponseDto> dtoList = googleTrendService.getTrendData();
        return ResponseEntity.ok(dtoList);
    }
}
