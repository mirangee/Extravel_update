package com.ict.extravel.domain.pointexchange.dto;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class PayInfoDto {
    private Integer id; // member id
    private String price;
    private String itemName;
    private float plusPoint;
}