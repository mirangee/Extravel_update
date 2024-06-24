package com.ict.extravel.domain.pointexchange.dto;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class PayInfoDto {
    private Integer id; // member id
    private String tid; // 해당 결제의 tid
    private int price;
    private String itemName;
    private float plusPoint;
}