package com.ict.extravel.domain.nation.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
    @Size(max = 500)
    @Column(name = "id",nullable = false, columnDefinition = "INT")
    private int id;

    @NotNull
    @Column(name = "nation_code",columnDefinition = "VARCHAR(3)")
    private String nation;

    @NotNull
    @Column(name = "nation_name",columnDefinition = "VARCHAR(50)")
    private String nationName;

    @NotNull
    @Column(name = "youtube_video_link",columnDefinition = "VARCHAR(255)")
    private String youtubeVideoLink;
}
