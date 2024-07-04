package com.ict.extravel.domain.nation.service;


import com.ict.extravel.domain.nation.controller.NewsYoutubeController;
import com.ict.extravel.domain.nation.dto.VideoResponseDTO;
import com.ict.extravel.domain.nation.entity.Video;
import com.ict.extravel.domain.nation.repository.NationRepository;
import com.ict.extravel.domain.nation.repository.VideoRepository;
import com.querydsl.core.FetchableQuery;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
@Slf4j
public class NewsYoutubeService {
    private final VideoRepository videoRepository;

    public List<VideoResponseDTO> getYoutubeLinkByNation(String nation) {
        log.info("Service 들어온 매개값:{}",nation);
         List<Video> link = videoRepository.findByNation(nation);
        log.info("링크5개조회:{}",link);

        List<VideoResponseDTO> linkDTO = new ArrayList<>();
        for (Video v : link) {
            VideoResponseDTO dto = new VideoResponseDTO(v);
            linkDTO.add(dto);
            log.info("service쪽 dto :{}",dto);
        }

        return linkDTO;
    }
}
