package com.ict.extravel.domain.member.service;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    @Value("{NaverLogin.grant_type}")
   private String grant_type;
    @Value("{NaverLogin.client_id}")
   private String client_id;
    @Value("{NaverLogin.client_secret}")
   private String client_secret;
    public static void NaverLogin(String code) {
 
    }
}
