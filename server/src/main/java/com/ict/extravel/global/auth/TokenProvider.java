//package com.ict.extravel.global.auth;
//
//
//import com.ict.extravel.domain.member.entity.Member;
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import io.jsonwebtoken.security.Keys;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//
//import java.time.Instant;
//import java.time.temporal.ChronoUnit;
//import java.util.Date;
//
//@Component
//@Slf4j
//public class TokenProvider {
//    @Value("${jwt.secret}")
//    private String SECRET_KEY;
//
//    public String createToken(Member memberEntity, String secretKey, long duration, ChronoUnit unit){
//        Date expireDate = Date.from(Instant.now().plus(duration, unit));
//        Claims claims = Jwts.claims();
//        // 클레임 정의하기
//
//
//
//        return Jwts.builder()
//                .signWith(
//                        Keys.hmacShaKeyFor(secretKey.getBytes()),
//                        SignatureAlgorithm.HS512
//                ).setClaims(claims)
//                .setExpiration(expireDate)
//                .setIssuedAt(new Date())
//                .setSubject(String.valueOf(memberEntity.getId()))
//                .setIssuer("Master")
//                .compact();
//
//    }
//
//    public String createAccessKey(Member memberEntity){
//        return createToken(memberEntity, SECRET_KEY, 2, ChronoUnit.HOURS);
//    }
//
//
//}
