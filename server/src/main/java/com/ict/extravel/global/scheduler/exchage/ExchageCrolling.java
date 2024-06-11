package com.ict.extravel.global.scheduler.exchage;

import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;


public class ExchageCrolling {
    private String exchangeApiKey = "QXYzwuIvJpiVoV1sNdTOBttWH6FdcRdh";

    public void getExchageData() {
        System.out.println(exchangeApiKey);
        String requestUrl = "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON";
        URI uri = UriComponentsBuilder
                .fromUriString(requestUrl)
                .queryParam("authkey", exchangeApiKey)
                .queryParam("searchdate", "20240604")
                .queryParam("data", "AP01")
                .encode()
                .build()
                .toUri();
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> forEntity = restTemplate.getForEntity(uri, String.class);
        JSONParser parser = new JSONParser();
        try {
            JSONArray jsonObject = (JSONArray) parser.parse(forEntity.getBody());
            System.out.println(jsonObject);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }
}
