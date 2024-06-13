package com.ict.extravel.global.auth;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Component
public class TokenProvider {
    @Value("${jwt.secret}")
    private String SECRET_KEY;

    private String createToken(Member member, String secretKey, long duration, ChronoUnit unit){
        Date expireDate = Date.from(Instant.now().plus(duration, unit));
        Claims claims = Jwts.claims();
        // 클레임 정의하기



        return Jwts.builder()
                .signWith(
                        Keys.hmacShaKeyFor(secretKey.getBytes()),
                        SignatureAlgorithm.HS512
                ).setClaims(claims)
                .setExpiration(expireDate)
                .setIssuedAt(new Date())
                .setSubject(String.valueOf(member.getId()))
                .setIssuer("Master")
                .compact();

    }

    public String createAccessKey(Member member){
        return createToken(member, SECRET_KEY, 2, ChronoUnit.HOURS);
    }


}
