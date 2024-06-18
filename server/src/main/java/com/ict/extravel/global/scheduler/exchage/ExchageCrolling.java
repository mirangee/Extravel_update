package com.ict.extravel.global.scheduler.exchage;

import com.ict.extravel.domain.curexchage.entity.CurrentExchangeRate;
import com.ict.extravel.domain.curexchage.repository.CurrentExchangeRepository;
import com.ict.extravel.domain.currency.entity.Currency;
import com.ict.extravel.domain.currency.repository.CurrencyRepository;
import com.ict.extravel.domain.monthexchage.entity.MonthlyPastExchangeRate;
import com.ict.extravel.domain.monthexchage.repository.MonthExchangeRepository;
import com.ict.extravel.domain.nation.entity.Nation;
import com.ict.extravel.domain.nation.repository.NationRepository;
import com.ict.extravel.domain.weekexchange.entity.WeeklyPastExchangeRate;
import com.ict.extravel.domain.weekexchange.repository.WeekExchangeRepository;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.math.BigDecimal;
import java.net.URI;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class ExchageCrolling {
    private String exchangeApiKey = "qzQOFMH9YhIWguibe9K9hZ6zjeS3MZAh";
    private final CurrencyRepository currencyRepository;
    private final WeekExchangeRepository weekExchangeRepository;
    private final MonthExchangeRepository monthExchangeRepository;
    private final CurrentExchangeRepository currentExchangeRepository;

    public void saveCurExchageData(){
        List<String> curList = getCurList();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        LocalDate from = LocalDate.parse("20240612",formatter);
        JSONArray array = getExchageData(from.toString().replace("-", ""));
        JSONArray preArray = getExchageData(from.minusDays(1).toString().replace("-",""));
        Map<String,Double> curEx = initMap(curList);
        Map<String,Double> preEx = initMap(curList);
        array.forEach(week -> {
            JSONObject ob = (JSONObject)week;
            curEx.replace(ob.get("cur_unit").toString().replace("(100)",""),Double.parseDouble(ob.get("deal_bas_r").toString().replace(",","")));
        });
        preArray.forEach(week -> {
            JSONObject ob = (JSONObject)week;
            preEx.replace(ob.get("cur_unit").toString().replace("(100)",""),Double.parseDouble(ob.get("deal_bas_r").toString().replace(",","")));
        });
        curList.forEach(cur -> {
            Currency currency = currencyRepository.findById(cur).orElseThrow();
            String currencyCode = currency.getCurrencyCode();
            Nation nationCode = currency.getNationCode();
            CurrentExchangeRate curRate = CurrentExchangeRate.builder()
                    .nationCode(nationCode)
                    .currencyCode(currency)
                    .exchangeRateValue(BigDecimal.valueOf(curEx.get(currencyCode)))
                    .preExchangeRateValue(BigDecimal.valueOf(preEx.get(currencyCode)))
                    .updateDate(LocalDate.now())
                    .build();
            currentExchangeRepository.save(curRate);
        });
    }

    public void calculateExchageData(){
        List<String> curList = getCurList();
        Map<String,Double> weeks = initMap(curList);
        Map<String,Double> months = initMap(curList);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        LocalDate from = LocalDate.parse("20230501",formatter);
        LocalDate now = LocalDate.now();
        long between = ChronoUnit.DAYS.between(from, now);
        LocalDate cur = from;
        LocalDate preweek = from;
        LocalDate premonth = from;
        int weekcnt=0;
        int monthcnt=0;
        for(int i=0;i<between;i++){
            JSONArray exchage = getExchageData(cur.toString().replace("-", ""));
            if(ChronoUnit.WEEKS.between(preweek, cur) == 1){
                LocalDate start = preweek;
                LocalDate end = cur.minusDays(1);
                preweek = cur;
                int weekCal=weekcnt;
                Map<String, Double> avgEx = weeks.entrySet().stream().collect(HashMap::new,(map,entry) -> map.put(entry.getKey(),entry.getValue()/weekCal),HashMap::putAll);
                saveExchageData(start,end,avgEx,curList,"week");
                weeks.replaceAll((k,v) -> 0.0);
                weekcnt=exchage.isEmpty() ? 0 : 1;
            }else{
                weekcnt = exchage.isEmpty() ? weekcnt : weekcnt + 1;
            }
            if(ChronoUnit.MONTHS.between(premonth, cur) == 1){
                LocalDate start = premonth;
                LocalDate end = cur.minusDays(1);
                premonth = cur;
                int monthCal=monthcnt;
                Map<String, Double> avgEx = months.entrySet().stream().collect(HashMap::new,(map,entry) -> map.put(entry.getKey(),entry.getValue()/monthCal),HashMap::putAll);
                saveExchageData(start,end,avgEx,curList,"month");
                months.replaceAll((k,v) -> 0.0);
                monthcnt=exchage.isEmpty() ? 0:1;
            }else{
                monthcnt=exchage.isEmpty() ? monthcnt : monthcnt + 1;
            }
            if(exchage.isEmpty()){
                cur = cur.plusDays(1);
                continue;
            }
            exchage.forEach(ex -> {
                JSONObject ob = (JSONObject)ex;
                weeks.replace(ob.get("cur_unit").toString().replace("(100)",""),weeks.get(ob.get("cur_unit").toString().replace("(100)",""))+Double.parseDouble(ob.get("deal_bas_r").toString().replace(",","")));
                months.replace(ob.get("cur_unit").toString().replace("(100)",""),months.get(ob.get("cur_unit").toString().replace("(100)",""))+Double.parseDouble(ob.get("deal_bas_r").toString().replace(",","")));
            });
            cur = cur.plusDays(1);
        }


    }

    private void saveExchageData(LocalDate start, LocalDate end, Map<String, Double> avgEx, List<String> curList, String type) {
        switch (type) {
            case "month": {
                curList.forEach(cur -> {
                    Currency currency = currencyRepository.findById(cur).orElseThrow();
                    String currencyCode = currency.getCurrencyCode();
                    Nation nationCode = currency.getNationCode();
                    MonthlyPastExchangeRate build = MonthlyPastExchangeRate.builder().nationCode(nationCode).currencyCode(currency).startDate(start).endDate(end).averageExchangeRate(BigDecimal.valueOf(avgEx.get(cur))).build();
                    monthExchangeRepository.save(build);
                });
                break;
            }
            case "week": {
                curList.forEach(cur -> {
                    Currency currency = currencyRepository.findById(cur).orElseThrow();
                    String currencyCode = currency.getCurrencyCode();
                    Nation nationCode = currency.getNationCode();
                    WeeklyPastExchangeRate build = WeeklyPastExchangeRate.builder().nationCode(nationCode).currencyCode(currency).startDate(start).endDate(end).averageExchangeRate(BigDecimal.valueOf(avgEx.get(cur))).build();
                    weekExchangeRepository.save(build);
                });
            }
        }

    }

    private JSONArray getExchageData(String date) {
        String requestUrl = "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON";
        URI uri = UriComponentsBuilder
                .fromUriString(requestUrl)
                .queryParam("authkey", exchangeApiKey)
                .queryParam("searchdate", date)
                .queryParam("data", "AP01")
                .encode()
                .build()
                .toUri();
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> forEntity = restTemplate.getForEntity(uri, String.class);
        JSONParser parser = new JSONParser();
        try {
            JSONArray jsonObject = (JSONArray) parser.parse(forEntity.getBody());
            return jsonObject;
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }
    private List<String> getCurList() {
        return currencyRepository.findAll().stream().map(Currency::getCurrencyCode).toList();
    }
    private Map<String,Double> initMap(List<String> curList){
        return curList.stream().collect(Collectors.toMap(k -> k, v -> 0.0));
    }
}
