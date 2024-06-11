package com.ict.extravel.global.scheduler.exchage;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;


public class ExchageCrolling {
    private String exchangeApiKey = "QXYzwuIvJpiVoV1sNdTOBttWH6FdcRdh";

    public void calculateExchageData(){
        JSONArray exchageData = getExchageData("20230601");
        Map<String,Double> weeks = new HashMap<String,Double>();
        Map<String,Double> months = new HashMap<String,Double>();
        exchageData.forEach(exchage -> {
            JSONObject ob = (JSONObject)exchage;
            weeks.put(ob.get("cur_unit").toString(),0.0);
            months.put(ob.get("cur_unit").toString(),0.0);
        });

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        LocalDate from = LocalDate.parse("20230501",formatter);
        LocalDate now = LocalDate.now();
        long between = ChronoUnit.DAYS.between(from, now);
        long between2 = ChronoUnit.WEEKS.between(from, now);
        long between3 = ChronoUnit.MONTHS.between(from, now);
        System.out.println(between);
        System.out.println(between2);
        System.out.println(between3);
        LocalDate cur = from;
        LocalDate preweek = from;
        LocalDate premonth = from;
        int weekcnt=0;
        int monthcnt=0;
        for(int i=0;i<between;i++){
            cur = cur.plusDays(1);

            if(ChronoUnit.WEEKS.between(preweek, cur) == 1){
                preweek = cur;
                weekcnt++;
            }
            if(ChronoUnit.MONTHS.between(premonth, cur) == 1){
                premonth = cur;
                monthcnt++;
            }
        }
        System.out.println(weekcnt);
        System.out.println(monthcnt);
        System.out.println(cur);





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
}
