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
@Table(name = "tbl_nation")
public class Nation {
    @Id
    @Size(max = 3)
    @Column(name = "nation_code", nullable = false, length = 3,columnDefinition = "char(3)")
    private String nationCode;

    @Size(max = 50)
    @NotNull
    @Column(name = "name", nullable = false, length = 50,columnDefinition = "char(3)")
    private String name;

    @Column(name = "flag")
    private byte[] flag;

}