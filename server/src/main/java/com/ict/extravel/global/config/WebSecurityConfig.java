package com.ict.extravel.global.config;


import com.ict.extravel.global.filter.JWTExceptionFilter;
import com.ict.extravel.global.filter.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
@Slf4j

//WebSecurityConfig 클래스는 Spring Security의 웹 보안 구성을 관리
//HTTP 보안 정책을 설정하고 JWT 인증 필터 및 예외 처리를 추가
public class WebSecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final JWTExceptionFilter jwtExceptionFilter;
    private final AccessDeniedHandler accessDeniedHandler;
    private final RequestProperties properties;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // yml에서 가져온 허용 url 리스트를 jwtAuthFilter에게 전달.
        jwtAuthFilter.setPermitAllPatterns(properties.getPermitAllPatterns());
        log.info("리스트: {}", properties.getPermitAllPatterns());
        log.info("배열로 변환: {}", Arrays.toString(properties.getPermitAllPatterns().toArray()));


        // HTTP 보안 설정 시작
        http
                .csrf(AbstractHttpConfigurer::disable) // CSRF 보호 비활성화
                .cors(Customizer.withDefaults()) // 기본 CORS 설정 적용
                .sessionManagement(Sm -> Sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // 세션 관리 정책을 무상태로 설정
                .formLogin(AbstractHttpConfigurer::disable) // 폼 로그인을 비활성화
                .httpBasic(AbstractHttpConfigurer::disable) // 기본 인증 비활성화
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(jwtExceptionFilter, JwtAuthFilter.class) //예외처리 실행
                // Exception filter를 Auth filter 앞에 배치를 하겠다는 뜻.
                .authorizeHttpRequests(authorizeRequests ->
                                authorizeRequests //검증이 필요한 것
//                                .requestMatchers(HttpMethod.GET, "/api/rate/currency/exchange").authenticated() //환전 로그인 요구
                                        .requestMatchers(HttpMethod.POST, "/api/v2/exchange").authenticated() //환전
                                        .requestMatchers(HttpMethod.POST, "/payment/ready").authenticated() //카카오페이 충전
//                                .requestMatchers(HttpMethod.GET, "/api/nation").authenticated()
//                                .requestMatchers(HttpMethod.POST, "/payment/pointInfo").authenticated() //카카오페이 충전
                                        .anyRequest().permitAll()

                )
                .exceptionHandling(ExceptionHandling -> {
                    // 인증 과정에서 예외가 발생한 경우 예외를 전달한다. (401)
                    // ExceptionHandling.authenticationEntryPoint(entryPoint);
                    // 인가 과정에서 예외가 발생한 경우 예외를 전달한다. (403)
                    ExceptionHandling.accessDeniedHandler(accessDeniedHandler); // 접근이 거부된 경우 AccessDeniedHandler로 처리 (403 오류)
                });

        return http.build(); // 설정된 보안 체인을 반환

    }

    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

}
