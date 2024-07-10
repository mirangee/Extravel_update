package com.ict.extravel.domain.pointexchange.controller;

import com.ict.extravel.domain.pointexchange.dto.response.HistoryResponseDto;
import com.ict.extravel.domain.pointexchange.service.PointService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/history")
@Slf4j
public class PointController {
    private final PointService pointService;

    @PostMapping("/point/{id}")
    public ResponseEntity<?> getPointHistory(@PathVariable Integer id) {
        log.info("/history/point/{id} 요청 들어옴! {}", id);
        List<HistoryResponseDto> historyList = pointService.getPointHistory(id);
        log.info(historyList.toString());
        return ResponseEntity.ok().body(historyList);
    }


}
