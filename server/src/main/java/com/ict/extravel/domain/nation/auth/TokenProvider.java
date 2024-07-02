package com.ict.extravel.domain.nation.auth;


import com.ict.extravel.domain.member.entity.Member;
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


 public String createToken(Member memberEntity) {

  //토큰 만료시간
  Date expiry = Date.from(
          Instant.now().plus(1, ChronoUnit.DAYS)
  );

  Map<String ,String> claims = new HashMap<>();
  claims.put("email", memberEntity.getEmail());
//  claims.put("role",memberEntity.getRole().toString());
log.info("memberEntity:{}",memberEntity);


  //토큰 생성
  return Jwts.builder()
          .signWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()),
                  SignatureAlgorithm.HS512)
          .setIssuer("Extravel관리자")
          .setIssuedAt(new Date())
          .setExpiration(expiry)
          .setSubject(memberEntity.getEmail()) //토큰을 식별할수있는 주요 데이터
          .setClaims(claims)
          .compact();

 }
}
