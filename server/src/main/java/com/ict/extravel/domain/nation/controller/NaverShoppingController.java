package com.ict.extravel.domain.nation.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ict.extravel.domain.nation.dto.NaverShoppingResponseDTO;
import com.ict.extravel.domain.nation.entity.Nation;
import com.ict.extravel.domain.nation.repository.NationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.List;


@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Slf4j
public class NaverShoppingController {

    private final NationRepository nationRepository;

    @Value("${NaverShopping.client_id}")
    private String CLIENT_ID;

    @Value("${NaverShopping.client_secret}")
    private String SECRET;

    @GetMapping("/shopping/{nation}")
    public ResponseEntity<?> ShoppingEntity(@PathVariable String nation) {
        Nation findNation = nationRepository.findById(nation).orElseThrow();

        String url = "https://openapi.naver.com/v1/search/shop.json";

        URI uri = UriComponentsBuilder.fromUriString(url)
                .queryParam("query", findNation.getName() + "여행")
                .queryParam("display" , 100)
                .queryParam("filter", "naverpay")
                .queryParam("start",1)
                .queryParam("sort","sim")
                .encode()
                .build()
                .toUri();
        log.info("build 한 uri값: {}" ,uri);
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Naver-Client-Id", CLIENT_ID);
        headers.set("X-Naver-Client-Secret", SECRET);
        log.info("Headers요청 {}" , headers);

        HttpEntity<Void> entity = new HttpEntity<>(headers);
        ResponseEntity<String> responseEntity = restTemplate.exchange(
                uri, HttpMethod.GET, entity, String.class);

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode rootNode = objectMapper.readTree(responseEntity.getBody());
            JsonNode itemsNode = rootNode.get("items");

            List<NaverShoppingResponseDTO> responseDTOList = objectMapper.readValue(
                    itemsNode.toString(),
                    objectMapper.getTypeFactory().constructCollectionType(List.class, NaverShoppingResponseDTO.class)
            );
            log.info("쇼핑 API 요청: {}", responseDTOList);
            return ResponseEntity.ok().body(responseDTOList);
        } catch (IOException e) {
            log.error("JSON 파싱 실패: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to parse JSON response");
        }
    }
}