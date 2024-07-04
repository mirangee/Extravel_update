package com.ict.extravel.domain.nation.controller;


import com.ict.extravel.domain.nation.dto.VideoResponseDTO;
import com.ict.extravel.domain.nation.service.NewsYoutubeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/youtube")
@RequiredArgsConstructor
@Slf4j
public class NewsYoutubeController {
  private final NewsYoutubeService newsYoutubeService;

  @GetMapping("/{nation}")
    public ResponseEntity<?> getYoutubeLink(@PathVariable String nation){
    log.info("리액트에서 8181로 nation 값 넘어옴! {}", nation);
    List<VideoResponseDTO> dtoList = newsYoutubeService.getYoutubeLinkByNation(nation);
    log.info("유튜브링크담은dto:{}",dtoList);


    return ResponseEntity.ok().body(dtoList);
}
}
