package com.ict.extravel.domain.member.service;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
@Slf4j
@Service
public class MemberService {

    @Value("{NaverLogin.grant_type}")
   private String grant_type;
    @Value("{NaverLogin.client_id}")
   private String client_id;
    @Value("{NaverLogin.client_secret}")
   private String client_secret;


  public void NaverLoginService(String code) {
      String AccessToken = getNaverAccessToken(code);
      log.info("token: {}", AccessToken);

     getNaverUserInfo(AccessToken);
  }

    private void getNaverUserInfo(String accessToken) {

      String requestURI = "https://openapi.naver.com/v1/nid/me";
    }

    private String getNaverAccessToken(String code) {

      String requestURI = "https://nid.naver.com/oauth2.0/token";

        HttpHeaders headers = new HttpHeaders();


        MultiValueMap<String ,String> params = new LinkedMultiValueMap<>();
        params.add("grant_type","authorization_code");
        params.add("client_id",client_id);
        params.add("client_secret", client_secret);

        HttpEntity<Object> requestEntity = new HttpEntity<>(params,headers);

        RestTemplate template = new RestTemplate();

        ResponseEntity<Map> responseEntity = template.exchange(requestURI, HttpMethod.POST, requestEntity, Map.class);


        Map<String , Object> responseData =(Map<String, Object>) responseEntity.getBody();
        log.info("토큰 데이터 :", responseData);

        return (String) responseData.get("access_token");
    }
}
