package com.ict.extravel.domain.nation.dto;

import com.ict.extravel.domain.nation.entity.Video;
import com.ict.extravel.domain.nation.repository.NationRepository;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VideoResponseDTO {

    private String youtubeVideoLink;


    public VideoResponseDTO(Video video) {
        this.youtubeVideoLink = video.getYoutubeVideoLink();
    }
}
