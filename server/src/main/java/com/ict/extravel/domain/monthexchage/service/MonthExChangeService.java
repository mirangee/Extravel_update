package com.ict.extravel.domain.monthexchage.service;

import com.ict.extravel.domain.curexchage.entity.CurrentExchangeRate;
import com.ict.extravel.domain.curexchage.repository.CurrentExchangeRepository;
import com.ict.extravel.domain.monthexchage.entity.MonthlyPastExchangeRate;
import com.ict.extravel.domain.monthexchage.repository.MonthExchangeRepository;
import com.ict.extravel.domain.nation.entity.Nation;
import com.ict.extravel.domain.nation.repository.NationRepository;
import com.ict.extravel.domain.weekexchange.dto.WeekExShowResponseDTO;
import com.ict.extravel.domain.weekexchange.entity.WeeklyPastExchangeRate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MonthExChangeService {
    private final NationRepository nationRepository;
    private final MonthExchangeRepository monthExchangeRepository;
    private final CurrentExchangeRepository currentExchangeRepository;
    public List<WeekExShowResponseDTO> showChart(String nation) {
        Nation us = nationRepository.findById(nation).orElseThrow();
        List<MonthlyPastExchangeRate> byNationCodeOrderByStartDate = monthExchangeRepository.findByNationCodeOrderByStartDate(us);
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
        long between = ChronoUnit.MONTHS.between(x, now);
        return between+"달 전";
    }
}
