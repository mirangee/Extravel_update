package com.ict.extravel.domain.googletrend.entity;

import com.ict.extravel.domain.nation.entity.Nation;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "search_trend")
public class SearchTrend {
    @Id
    @Column(name = "nation_code", columnDefinition = "CHAR(3)")
    private String nationCode;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "nation_code", nullable = false)
    private Nation tblNation;

    @Size(max = 30)
    @Column(name = "nation_name", length = 30)
    private String nationName;

    @Size(max = 100)
    @Column(name = "nation_name_en", length = 100)
    private String nationNameEn;

    @Column(name = "total_searches")
    private Integer totalSearches;

    @CreationTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;

    @Size(max = 300)
    @Column(name = "img_url", length = 300)
    private String imgUrl;

}