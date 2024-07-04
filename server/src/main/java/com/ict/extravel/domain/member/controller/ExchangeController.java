package com.ict.extravel.domain.member.controller;


import com.ict.extravel.domain.member.dto.request.ExchangeRequestDTO;
import com.ict.extravel.domain.member.service.ExchangeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v2/exchange")
@RequiredArgsConstructor
public class ExchangeController {
    private final ExchangeService exchangeService;
    @PostMapping
    public ResponseEntity<?> exchange(@RequestBody ExchangeRequestDTO requestDTO) {
        String result = exchangeService.saveHistory(requestDTO);
        return ResponseEntity.ok().body(result);
    }
}
