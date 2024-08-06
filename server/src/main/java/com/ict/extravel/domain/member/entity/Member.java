package com.ict.extravel.domain.member.entity;

import com.ict.extravel.domain.nation.entity.Nation;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;
import java.util.Date;

@Slf4j
@Getter
@Setter
@AllArgsConstructor @NoArgsConstructor
@ToString @EqualsAndHashCode
@Builder
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

    @Enumerated(EnumType.STRING)
    @Column(name = "grade", nullable = false, length = 50)
    private Grade grade;

    public enum Grade {
        BRONZE, SILVER, GOLD
    }

    @Size(max = 255)
    @ColumnDefault("default_value")
    @Column(name = "path")
    private String path;

    @Size(max = 512)
    @Column(name = "access_token")
    private String accessToken;

    @Size(max = 512)
    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "refresh_token_expiry_date")
    private Date refreshTokenExpiryDate;


    public void changeAccessToken(String accessToken) {
        this.accessToken = accessToken;
        log.info("member accessToekn : {}, accessToken");
    }

    public void changeRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public void changeRefreshExpiryDate(Date date) {
        this.refreshTokenExpiryDate = date;
    }
}