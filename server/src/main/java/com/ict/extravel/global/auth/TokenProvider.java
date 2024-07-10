package com.ict.extravel.global.auth;


import com.ict.extravel.domain.member.entity.Member;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
@Slf4j
public class TokenProvider {
    @Value("${jwt.secret}")
    private String SECRET_KEY;

    @Value("${jwt.refresh-secret}")
    private String REFRESH_SECRET_KEY;

    public String createToken(Member memberEntity, String secretKey, long duration, ChronoUnit unit) {
        // 토큰의 만료 시간을 설정
        Date expireDate = Date.from(Instant.now().plus(duration, unit));
        //Claims claims = Jwts.claims(); //???

        // 클레임 정의
        Map<String, String> claims = new HashMap<>();
        claims.put("id", String.valueOf(memberEntity.getId()));
        claims.put("email", memberEntity.getEmail());

        // JWT를 생성
        return Jwts.builder()
                .signWith(
                        Keys.hmacShaKeyFor(secretKey.getBytes()), // 비밀 키로 서명
                        SignatureAlgorithm.HS512 // 서명 알고리즘으로 HS512를 사용
                ).setClaims(claims) // 설정한 클레임을 JWT에 포함
                .setExpiration(expireDate) // 만료 시간을 설정
                .setIssuedAt(new Date()) // 발급 시간을 현재 시간으로 설정
                .setSubject(String.valueOf(memberEntity.getId())) // 주체(subject)를 사용자 ID로 설정
                .setIssuer("Master") // 발급자를 "Master"로 설정
                .compact(); // JWT 문자열을 생성


    }

    //액세스 토큰을 생성
    public String createAccessKey(Member memberEntity) {
        String token = createToken(memberEntity, SECRET_KEY, 5, ChronoUnit.SECONDS);
        log.info("token은? : {}", token);
        return token;

    }


    //리프레시 토큰을 생성
    public String createRefreshKey(Member memberEntity) {
        String refreshToken = createToken(memberEntity, REFRESH_SECRET_KEY, 3, ChronoUnit.HOURS);
        log.info("refreshToken은? : {}", refreshToken);
        return refreshToken;
    }

    // JWT에서 클레임을 추출 : 토큰에서 클레임을 추출하는 로직을 분리
    private Claims getClaims(String token, String secretKey) {
        // 선택한 비밀 키로 토큰을 파싱하여 클레임을 추출하고 반환
        Claims claims = Jwts.parserBuilder()
                //토큰 발급자의 발급 당시의 서명을 넣어줌.
                .setSigningKey(Keys.hmacShaKeyFor(secretKey.getBytes())) // 비밀 키로 서명 검증
                // 서명 위조 검사: 위조된 경우에는 예외가 발생합니다.
                // 위조가 되지 않은 경우 payload를 리턴
                .build()
                .parseClaimsJws(token) //에러
                .getBody();
        log.info("TokenProvider getClaims : {}", claims);
        return claims;

    }

    // 리프레시 토큰 만료시간 추출
    public Date getExpiryDate(String token) {
        Claims claims = getClaims(token, REFRESH_SECRET_KEY);
        return claims.getExpiration();
    }

    /**
     * 클라이언트가 전송한 토큰을 디코딩하여 토큰의 위조 여부를 확인
     * 토큰을 json으로 파싱해서 클레임(토큰 정보)을 리턴
     *
     * @param token - 필터가 전달해 준 토큰
     * @return - 토큰 안에 있는 인증된 유저 정보를 반환
     */

    //토큰 유효성 검사 및 사용자 정보 추출 메소드
    public TokenUserInfo validateAndGetTokenUserInfo(String token) {
        Claims claims = getClaims(token, SECRET_KEY);

        log.info("claims: {}", claims);

        return TokenUserInfo.builder()
                .id(String.valueOf(claims.getId())) // 주체(subject) 값을 사용자 ID로 사용
                .email(claims.get("email", String.class)) // 클레임에서 이메일을 추출
                //.grade(Member.Grade.valueOf(claims.get("grade", String.class)))
                .build();
    }

    // refresh token의 유효성을 검사
    public boolean validateRefreshToken(String token) {
        log.info("리프레쉬토큰 검증 수행");
        try {
            getClaims(token, REFRESH_SECRET_KEY);
            return true;
        } catch (Exception e) {
            log.warn("유효하지 않은 리프레시 토큰!");
            return false;
        }
    }
}
