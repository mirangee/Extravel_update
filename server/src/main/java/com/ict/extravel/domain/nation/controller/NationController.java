package com.ict.extravel.domain.nation.controller;

import com.ict.extravel.domain.nation.service.NationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController // 비동기 -> 실시간 동적 업데이트 // 클라이언트에서 데이터 요청해서 서버에서 전송
@RequiredArgsConstructor
@RequestMapping("/api/nation")
public class NationController {
    private final NationService nationService;

    @GetMapping
    public ResponseEntity<?> getNationData() {
        return ResponseEntity.ok(nationService.getNationData());
    }
}
