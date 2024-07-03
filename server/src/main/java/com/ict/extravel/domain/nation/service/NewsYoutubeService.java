package com.ict.extravel.domain.nation.service;


import com.ict.extravel.domain.nation.controller.NewsYoutubeController;
import com.ict.extravel.domain.nation.dto.VideoResponseDTO;
import com.ict.extravel.domain.nation.entity.Video;
import com.ict.extravel.domain.nation.repository.NationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;



@Service
@RequiredArgsConstructor
@Slf4j
public class NewsYoutubeService {


    public ResponseEntity<?> getYoutubeLinkByNation(String nation) {
        log.info("Service 들어온 매개값:{}",nation);


        return null;
    }
}
