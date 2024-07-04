package com.ict.extravel.domain.curexchage.service;


import com.ict.extravel.domain.curexchage.dto.LiveRankExchangeResponseDTO;
import com.ict.extravel.domain.curexchage.dto.NationDateExchangeDataResponseDTO;
import com.ict.extravel.domain.curexchage.dto.NationExChangeResponseDTO;
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

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Comparator;
import java.util.List;

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

    public List<LiveRankExchangeResponseDTO> getNationLiveExchangeData() {
        List<LiveRankExchangeResponseDTO> list = currentExchangeRepository.findAll().stream().map(x ->
                LiveRankExchangeResponseDTO.builder()
                        .exchangeRate(x.getExchangeRateValue())
                        .preExchangeRate(x.getPreExchangeRateValue())
                        .nationCode(x.getNationCode().getNationCode())
                        .nationName(x.getNationCode().getName())
                        .flag(x.getNationCode().getFlag())
                        .currencyCode(x.getCurrencyCode().getCurrencyCode())
                        .changeRate(getChangeRate(x))
                        .build()).toList();

        return list.stream().sorted(Comparator.comparing(LiveRankExchangeResponseDTO::getChangeRate)).toList();
    }

    private BigDecimal getChangeRate(CurrentExchangeRate x) {

        return x.getExchangeRateValue()
                .subtract(x.getPreExchangeRateValue())
                .divide(x.getPreExchangeRateValue(), 4, RoundingMode.HALF_UP)
                .multiply(new BigDecimal(100));
    }

    public NationExChangeResponseDTO exchangeRate(String nation) {
        Nation nationCode = nationRepository.findById(nation).orElseThrow();
        CurrentExchangeRate byNationCode = currentExchangeRepository.findByNationCode(nationCode);
        return NationExChangeResponseDTO.builder()
                .nation(byNationCode.getNationCode())
                .currencyCode(byNationCode.getCurrencyCode().getCurrencyCode())
                .currencySymbol(byNationCode.getCurrencyCode().getCurrencySymbol())
                .currencyKorean(byNationCode.getCurrencyCode().getCurrencyKorean())
                .exchangeRate(byNationCode.getExchangeRateValue())
                .preExchangeRate(byNationCode.getPreExchangeRateValue())
                .updateDate(byNationCode.getUpdateDate())
                .build();
    }
}
