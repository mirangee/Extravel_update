package com.ict.extravel.domain.nation.dto;

import com.ict.extravel.domain.nation.repository.NationRepository;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VideoResponseDTO {

    private int id;
    private String nationCode;
    private String youtubeVideoLink;

}
