package com.ict.extravel.global.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.List;


@Configuration
@ConfigurationProperties(prefix = "request")
//애플리케이션의 CORS 설정과 관련된 URL 패턴을 관리
//@ConfigurationProperties를 사용하여 `application.yml` 또는 `application.properties` 파일에서 `request`로 시작하는 속성들을 바인딩
public class RequestProperties {

    // 모든 사용자에게 접근을 허용할 URL 패턴 목록
    private List<String> permitAllPatterns;

    //permitAllPatterns 속성에 대한 getter 메서드
    public List<String> getPermitAllPatterns() {
        return permitAllPatterns; //모든 사용자에게 접근이 허용된 URL 패턴의 리스트
    }

    //permitAllPatterns 속성에 대한 setter 메서드.
    public void setPermitAllPatterns(List<String> permitAllPatterns) {
        this.permitAllPatterns = permitAllPatterns;
    }
}
