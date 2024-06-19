package com.ict.extravel.domain.monthexchage.controller;

import com.ict.extravel.domain.monthexchage.service.MonthExChangeService;
import com.ict.extravel.domain.weekexchange.dto.WeekExShowResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/rate/month")
@RequiredArgsConstructor
public class MonthExChangeController {
    private final MonthExChangeService monthExChangeService;
    @GetMapping("/showchart")
    public ResponseEntity<List<WeekExShowResponseDTO>> showChart(String nation) {
        List<WeekExShowResponseDTO> weekExShowResponseDTOS = monthExChangeService.showChart(nation);
        return ResponseEntity.ok(weekExShowResponseDTOS);
    }
}
