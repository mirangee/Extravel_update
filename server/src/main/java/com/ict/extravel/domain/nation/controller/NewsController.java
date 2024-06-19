package com.ict.extravel.domain.nation.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Slf4j
public class NewsController {
    @Value("${NaverNews.client_id}")
    private String CLIENT_ID;

    @Value("${NaverNews.client_secret}")
    private String CLIENT_SECRET;


    @GetMapping("/news")
    public ResponseEntity<String> getYouTubeVideos() {
        String reqUrl = "https://openapi.naver.com/v1/search/news.json";

        int display = 5;
        URI uri = UriComponentsBuilder.fromUriString(reqUrl)
                .queryParam("query", "주식")
                .queryParam("display", display)
                .queryParam("start", 1)
                .encode()
                .build()
                .toUri();

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
//        headers.set("Host", "openapi.naver.com");
//        headers.set("User-Agent", "curl/7.49.1");
//        headers.set("Accept", "*/*");
        headers.set("X-Naver-Client-Id", CLIENT_ID);
        headers.set("X-Naver-Client-Secret", CLIENT_SECRET);

        log.info("요청 headers {}", headers);

    HttpEntity<String> entity = new HttpEntity<>(headers);

    ResponseEntity<String> response = restTemplate.exchange(
            uri,
            HttpMethod.GET,
            entity,
            String.class
    );

        log.info("리턴: response : {}" , response);
        return response;

    }



}
