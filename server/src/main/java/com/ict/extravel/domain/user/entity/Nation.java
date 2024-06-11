package com.ict.extravel.domain.user.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Getter @Setter @ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "tbl_nation")
public class Nation {
    @Id
    @Column(name = "nation_code")
    private String nationCode;
    private String name;
    private String flag;
}
