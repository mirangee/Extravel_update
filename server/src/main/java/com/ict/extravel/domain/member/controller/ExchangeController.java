package com.ict.extravel.domain.member.controller;


import com.ict.extravel.domain.member.dto.request.ExchangeRequestDTO;
import com.ict.extravel.domain.member.dto.response.ExchangeHistoryResponseDTO;
import com.ict.extravel.domain.member.dto.response.HistoryAverResponseDTO;
import com.ict.extravel.domain.member.dto.response.WalletTotalResponseDTO;
import com.ict.extravel.domain.member.entity.WalletExchange;
import com.ict.extravel.domain.member.service.ExchangeService;
import com.ict.extravel.domain.pointexchange.dto.response.HistoryResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v2/exchange")
@RequiredArgsConstructor
@Slf4j
public class ExchangeController {
    private final ExchangeService exchangeService;
    @PostMapping
    public ResponseEntity<?> exchange(@RequestBody ExchangeRequestDTO requestDTO) {
        String result = exchangeService.saveHistory(requestDTO);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> getExchangeHistory(@PathVariable Integer id) {
        log.info("/api/v2/exchange/{id} 요청 들어옴! {}", id);
        List<ExchangeHistoryResponseDTO> historyList = exchangeService.getExchangeHistory(id);
        log.info(historyList.toString());
        return ResponseEntity.ok().body(historyList);
    }
    @GetMapping("/average")
    public ResponseEntity<?> getAverageExchangeHistory(String nation) {
        HistoryAverResponseDTO averageList = exchangeService.getAverageExchangeHistory(nation);
        return ResponseEntity.ok().body(averageList);
    }


    @PostMapping("/wallet/{id}")
    public ResponseEntity<?> getWalletTotal(@PathVariable Integer id) {
        log.info("/api/v2/exchange/wallet/{id} 요청 들어옴! {}", id);
        List<WalletTotalResponseDTO> walletTotal = exchangeService.getWalletTotal(id);
        return ResponseEntity.ok().body(walletTotal);
    }

}
