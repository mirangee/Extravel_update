package com.ict.extravel.domain.weekexchange.controller;


import com.ict.extravel.domain.weekexchange.dto.WeekExShowResponseDTO;
import com.ict.extravel.domain.weekexchange.entity.WeeklyPastExchangeRate;
import com.ict.extravel.domain.weekexchange.service.WeekExchangeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/rate/week")
public class WeekExchangeController {
    private final WeekExchangeService weekExchangeService;
    @GetMapping("/showchart")
    public List<WeekExShowResponseDTO> showChart() {
        List<WeeklyPastExchangeRate> weeklyPastExchangeRates = weekExchangeService.showChart();
        return weeklyPastExchangeRates.stream().map(x-> WeekExShowResponseDTO.builder()
                        .nationCode(x.getNationCode().getNationCode())
                        .nationName(x.getNationCode().getName())
                        .currencyCode(x.getCurrencyCode().getCurrencyCode())
                        .currencySymbol(x.getCurrencyCode().getCurrencySymbol())
                        .startDate(x.getStartDate())
                        .endDate(x.getEndDate())
                        .calDate(calculDate(x.getStartDate()))
                        .averRate(x.getAverageExchangeRate())
                        .build()
                ).toList();
    }

    private String calculDate(LocalDate x) {
        LocalDate now = LocalDate.now();
        long between = ChronoUnit.WEEKS.between(x, now);
        return between+"주 전";
    }
}
