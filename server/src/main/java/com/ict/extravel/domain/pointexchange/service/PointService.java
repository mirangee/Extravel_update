package com.ict.extravel.domain.pointexchange.service;

import com.ict.extravel.domain.pointexchange.dto.response.HistoryResponseDto;
import com.ict.extravel.domain.pointexchange.entity.PointCharge;
import com.ict.extravel.domain.pointexchange.repository.PointChargeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class PointService {
    private final PointChargeRepository pcRepository;
    private final PointChargeRepository pointChargeRepository;


    public List<HistoryResponseDto> getPointHistory(Integer id) {
        List<PointCharge> pointHistoryList = pointChargeRepository.findAllByMemberId(id);

        List<HistoryResponseDto> dtoList = new ArrayList<>();


        for (PointCharge p : pointHistoryList) {
            HistoryResponseDto responseDto = new HistoryResponseDto(p);
            dtoList.add(responseDto);
        }
        return dtoList;
    }
}
