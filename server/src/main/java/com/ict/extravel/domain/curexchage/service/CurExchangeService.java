package com.ict.extravel.domain.curexchage.service;


import com.ict.extravel.domain.curexchage.dto.NationDateExchangeDataResponseDTO;
import com.ict.extravel.domain.curexchage.entity.CurrentExchangeRate;
import com.ict.extravel.domain.curexchage.repository.CurrentExchangeRepository;
import com.ict.extravel.domain.monthexchage.entity.MonthlyPastExchangeRate;
import com.ict.extravel.domain.monthexchage.repository.MonthExchangeRepository;
import com.ict.extravel.domain.nation.entity.Nation;
import com.ict.extravel.domain.nation.repository.NationRepository;
import com.ict.extravel.domain.weekexchange.entity.WeeklyPastExchangeRate;
import com.ict.extravel.domain.weekexchange.repository.WeekExchangeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CurExchangeService {
    private final CurrentExchangeRepository currentExchangeRepository;
    private final WeekExchangeRepository weekExchangeRepository;
    private final MonthExchangeRepository monthExchangeRepository;
    private final NationRepository nationRepository;


    public NationDateExchangeDataResponseDTO getNationDateExchangeData(String nationCode) {
        Nation nation = nationRepository.findById(nationCode).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 국가"));
        CurrentExchangeRate curData = currentExchangeRepository.findByNationCode(nation);
        WeeklyPastExchangeRate weekData = weekExchangeRepository.findTopByNationCodeOrderByStartDateDesc(nation);
        MonthlyPastExchangeRate monthData = monthExchangeRepository.findTopByNationCodeOrderByStartDateDesc(nation);
        return NationDateExchangeDataResponseDTO.builder()
                .lastestCurEx(curData.getExchangeRateValue())
                .lastestPreCurEx(curData.getPreExchangeRateValue())
                .lastestWeekAverEx(weekData.getAverageExchangeRate())
                .lastestMonthAverEx(monthData.getAverageExchangeRate())
                .lastestCurDate(curData.getUpdateDate())
                .lastestWeekDate(weekData.getStartDate())
                .lastestWeekEndDate(weekData.getEndDate())
                .lastestMonthDate(monthData.getStartDate())
                .lastestMonthEndDate(monthData.getEndDate())
                .build();

    }
}
