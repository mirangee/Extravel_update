package com.ict.extravel.domain.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Controller
@RequestMapping("/youtube")
@RequiredArgsConstructor
@Slf4j
public class YoutubeController {
    @Value("${Youtube.api_key}")
    private String YOUTUBE_API_KEY;

    private UriComponentsBuilder search;

    @GetMapping("/videos")
    public ResponseEntity<String> getYouTubeVideos() {
        String apiUrl = "https://www.googleapis.com/youtube/v3/videos";
        String part = "id";
        String chart = "mostPopular";
        int maxResults = 5;
        String regionCode = "KR";

        // YouTube API 요청을 위한 파라미터 설정
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .queryParam("part", part)
                .queryParam("chart", chart)
                .queryParam("maxResults", maxResults)
                .queryParam("regionCode", regionCode)
                .queryParam("key", YOUTUBE_API_KEY);

        // RestTemplate을 사용하여 GET 요청 보내기
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(builder.toUriString(), String.class);

        log.info("유튜브API요청결과 :{}", response.getBody());
        return response;
    }




    @GetMapping("/search")
    public ResponseEntity<String> searchVideo() {
        String apiUrl = "https://www.googleapis.com/youtube/v3/search";
        String part = "snippet";
        String type = "video";
        String maxResult = "3";
        String q = "에스파";


        UriComponentsBuilder search = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .queryParam("part" , part)
                .queryParam("maxResults", maxResult)
                .queryParam("q", "vlog")
                .queryParam("type", type)
                .queryParam("key" , YOUTUBE_API_KEY);


        // RestTemplate을 사용하여 GET 요청 보내기
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> searchResponse = restTemplate.getForEntity(search.toUriString(), String.class);

        log.info("검색요청결과 :{}", searchResponse.getBody());
        return searchResponse;
    }



}