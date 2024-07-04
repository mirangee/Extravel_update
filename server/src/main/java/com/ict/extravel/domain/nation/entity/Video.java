package com.ict.extravel.domain.nation.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "countryyoutube")
public class Video {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Size(max = 500)
    @Column(name = "id",nullable = false)
    private Integer id;

    @NotNull
    @Column(name = "nation_code",columnDefinition = "VARCHAR(3)")
    private String nationCode;

    @NotNull
    @Column(name = "nation_name",columnDefinition = "VARCHAR(50)")
    private String nationName;

    @NotNull
    @Column(name = "youtube_video_link",columnDefinition = "VARCHAR(255)")
    private String youtubeVideoLink;
}
