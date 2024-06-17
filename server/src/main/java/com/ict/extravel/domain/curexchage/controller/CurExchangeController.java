package com.ict.extravel.domain.curexchage.controller;


import com.ict.extravel.domain.curexchage.dto.NationDateExchangeDataResponseDTO;
import com.ict.extravel.domain.curexchage.repository.CurrentExchangeRepository;
import com.ict.extravel.domain.curexchage.service.CurExchangeService;
import com.ict.extravel.domain.monthexchage.repository.MonthExchangeRepository;
import com.ict.extravel.domain.weekexchange.repository.WeekExchangeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/rate/currency")
@RequiredArgsConstructor
public class CurExchangeController {
    private final CurExchangeService curExchangeService;

    @GetMapping
    public ResponseEntity<?> nationDateExchangeData(String nation) {
        System.out.println("ㅎㅇ");
        NationDateExchangeDataResponseDTO nationDateExchangeData = curExchangeService.getNationDateExchangeData(nation);
        return ResponseEntity.ok(nationDateExchangeData);

    }
}
