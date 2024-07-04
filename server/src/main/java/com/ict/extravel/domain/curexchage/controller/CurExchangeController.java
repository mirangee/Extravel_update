package com.ict.extravel.domain.curexchage.controller;


import com.ict.extravel.domain.curexchage.dto.LiveRankExchangeResponseDTO;
import com.ict.extravel.domain.curexchage.dto.NationDateExchangeDataResponseDTO;
import com.ict.extravel.domain.curexchage.dto.NationExChangeResponseDTO;
import com.ict.extravel.domain.curexchage.repository.CurrentExchangeRepository;
import com.ict.extravel.domain.curexchage.service.CurExchangeService;
import com.ict.extravel.domain.monthexchage.repository.MonthExchangeRepository;
import com.ict.extravel.domain.weekexchange.repository.WeekExchangeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/rate/currency")
@RequiredArgsConstructor
public class CurExchangeController {
    private final CurExchangeService curExchangeService;

    @GetMapping
    public ResponseEntity<?> nationDateExchangeData(String nation) {
        NationDateExchangeDataResponseDTO nationDateExchangeData = curExchangeService.getNationDateExchangeData(nation);
        return ResponseEntity.ok(nationDateExchangeData);

    }
    @GetMapping("/live")
    public ResponseEntity<?> nationLiveExchangeData() {
        List<LiveRankExchangeResponseDTO> nationLiveExchangeData = curExchangeService.getNationLiveExchangeData();
        return ResponseEntity.ok(nationLiveExchangeData);

    }
    @GetMapping("/exchange")
    public ResponseEntity<?> exchangeRate(String nation) {
        NationExChangeResponseDTO nationExChangeResponseDTO = curExchangeService.exchangeRate(nation);
        return ResponseEntity.ok(nationExChangeResponseDTO);
    }
}
