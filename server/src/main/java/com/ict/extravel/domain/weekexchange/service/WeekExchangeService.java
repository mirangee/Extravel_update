package com.ict.extravel.domain.weekexchange.service;


import com.ict.extravel.domain.nation.entity.Nation;
import com.ict.extravel.domain.nation.repository.NationRepository;
import com.ict.extravel.domain.weekexchange.entity.WeeklyPastExchangeRate;
import com.ict.extravel.domain.weekexchange.repository.WeekExchangeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WeekExchangeService {
    private final WeekExchangeRepository weekExchangeRepository;
    private final NationRepository nationRepository;

    public List<WeeklyPastExchangeRate> showChart() {
        Nation us = nationRepository.findById("US").orElseThrow();
        System.out.println(us);
        return weekExchangeRepository.findByNationCodeOrderByStartDate(us);
    }
}
