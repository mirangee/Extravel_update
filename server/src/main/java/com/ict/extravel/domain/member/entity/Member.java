package com.ict.extravel.domain.member.entity;

import com.ict.extravel.domain.nation.entity.Nation;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor @AllArgsConstructor
@Entity
@Table(name = "member")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Size(max = 255)
    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @Size(max = 255)
    @NotNull
    @Column(name = "password", nullable = false)
    private String password;

    @Size(max = 100)
    @NotNull
    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Size(max = 20)
    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "nation_code", nullable = false)
    private Nation nationCode;

    @ColumnDefault("(now())")
    @Column(name = "registration_date")
    private LocalDate registrationDate;

    @Size(max = 50)
    @Column(name = "grade", length = 50)
    private String grade;

    @Size(max = 255)
    @Column(name = "tid")
    private String tid;

    @Size(max = 30)
    @Column(name = "path", nullable = false, length = 30)
    private String path;

    public void updateTid(String tid) {
        this.tid = tid;
    }
}