package com.ict.extravel.domain.pointexchange.controller;

import com.ict.extravel.domain.pointexchange.service.WalletService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/wallet")
@RequiredArgsConstructor
public class WalletController {
    private final WalletService walletService;
    @GetMapping
    public ResponseEntity<?> getWallet(String email) {
        BigDecimal wallet =walletService.getWallet(email);
        return ResponseEntity.ok().body(wallet);
    }
}
