package com.ict.extravel.domain.nation.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@EqualsAndHashCode @ToString
public class NaverShoppingResponseDTO {
    @JsonProperty("title")
    private String title;

    @JsonProperty("link")
    private String link;

    @JsonProperty("image")
    private String image;

    @JsonProperty("lprice")
    private String lprice;

    @JsonProperty("hprice")
    private String hprice;

    @JsonProperty("mallName")
    private String mallName;

    @JsonProperty("productId")
    private String productId;

    @JsonProperty("productType")
    private String productType;

    @JsonProperty("brand")
    private String brand;

    @JsonProperty("maker")
    private String maker;

    @JsonProperty("category1")
    private String category1;

    @JsonProperty("category2")
    private String category2;

    @JsonProperty("category3")
    private String category3;

    @JsonProperty("category4")
    private String category4;
}
