package com.ict.extravel;

import com.ict.extravel.domain.currency.entity.Currency;
import com.ict.extravel.domain.currency.repository.CurrencyRepository;
import com.ict.extravel.domain.monthexchage.entity.MonthlyPastExchangeRate;
import com.ict.extravel.domain.monthexchage.repository.MonthExchangeRepository;
import com.ict.extravel.domain.nation.entity.Nation;
import com.ict.extravel.domain.nation.repository.NationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/")
public class TestController {
    private final CurrencyRepository currencyRepository;
    private final NationRepository nationRepository;
    private final MonthExchangeRepository monthExchangeRepository;
    @GetMapping
    public List<Currency> test() {
        monthExchangeRepository.save(MonthlyPastExchangeRate.builder()
                .nationCode(nationRepository.findById("US").orElseThrow(RuntimeException::new))
                .currencyCode(currencyRepository.findById("USD").orElseThrow(RuntimeException::new))
                .startDate(LocalDate.parse("2021-01-01"))
                .endDate(LocalDate.parse("2021-01-10"))
                .averageExchangeRate(BigDecimal.valueOf(1337.3))
                .build());
        return null;
    }
}
