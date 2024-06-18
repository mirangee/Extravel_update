package com.ict.extravel.domain.pointexchange.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Point {

    @Id
    @Column(name="payment_id", length = 100, nullable = false)
    private int paymentId;

    private
}
