package com.ict.extravel.domain.pointexchange.dto;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class PayInfoDto {
    private int price;
    private String itemName;
    private float plusPoint;
}