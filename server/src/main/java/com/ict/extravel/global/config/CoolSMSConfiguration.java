package com.ict.extravel.global.config;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CoolSMSConfiguration {

    @Value("${CoolSMS.api_key}")
    private String API_KEY;

    @Value("${CoolSMS.apiSecretKey}")
    private String API_SECRET_KEY;

    @Value("${CoolSMS.web}")
    private String WEB;

    @Bean
    public DefaultMessageService defaultMessageService() {
        // API 키와 시크릿 키를 사용하여 DefaultMessageService를 초기화합니다.
        return NurigoApp.INSTANCE.initialize(API_KEY, API_SECRET_KEY, "https://api.coolsms.co.kr");
    }
}
