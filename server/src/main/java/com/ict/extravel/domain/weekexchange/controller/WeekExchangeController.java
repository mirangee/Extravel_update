package com.ict.extravel.domain.weekexchange.controller;


import com.ict.extravel.domain.weekexchange.dto.WeekExShowResponseDTO;
import com.ict.extravel.domain.weekexchange.service.WeekExchangeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/rate/week")
public class WeekExchangeController {
    private final WeekExchangeService weekExchangeService;
    @GetMapping("/showchart")
    public ResponseEntity<List<WeekExShowResponseDTO>> showChart(String nation) {
        List<WeekExShowResponseDTO> weekExShowResponseDTOS = weekExchangeService.showChart(nation);
        return ResponseEntity.ok(weekExShowResponseDTOS);
    }

}
