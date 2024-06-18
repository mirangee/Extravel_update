package com.ict.extravel.domain.weekexchange.service;


import com.ict.extravel.domain.curexchage.entity.CurrentExchangeRate;
import com.ict.extravel.domain.curexchage.repository.CurrentExchangeRepository;
import com.ict.extravel.domain.nation.entity.Nation;
import com.ict.extravel.domain.nation.repository.NationRepository;
import com.ict.extravel.domain.weekexchange.dto.WeekExShowResponseDTO;
import com.ict.extravel.domain.weekexchange.entity.WeeklyPastExchangeRate;
import com.ict.extravel.domain.weekexchange.repository.WeekExchangeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WeekExchangeService {
    private final WeekExchangeRepository weekExchangeRepository;
    private final CurrentExchangeRepository currentExchangeRepository;
    private final NationRepository nationRepository;

    public List<WeekExShowResponseDTO> showChart(String nation) {
        Nation us = nationRepository.findById(nation).orElseThrow();
        List<WeeklyPastExchangeRate> byNationCodeOrderByStartDate = weekExchangeRepository.findByNationCodeOrderByStartDate(us);
        CurrentExchangeRate currentExchangeRate = currentExchangeRepository.findByNationCode(us);
        return byNationCodeOrderByStartDate.stream().map(x-> WeekExShowResponseDTO.builder()
                .nationCode(x.getNationCode().getNationCode())
                .nationName(x.getNationCode().getName())
                .currencyCode(x.getCurrencyCode().getCurrencyCode())
                .currencySymbol(x.getCurrencyCode().getCurrencySymbol())
                .startDate(x.getStartDate())
                .endDate(x.getEndDate())
                .calDate(calculDate(x.getStartDate()))
                .averRate(x.getAverageExchangeRate())
                .curRate(currentExchangeRate.getExchangeRateValue())
                .build()
        ).toList();
    }
    private String calculDate(LocalDate x) {
        LocalDate now = LocalDate.now();
        long between = ChronoUnit.WEEKS.between(x, now);
        return between+"주 전";
    }
}
