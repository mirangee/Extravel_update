package com.ict.extravel.global.filter;

import com.ict.extravel.global.auth.TokenProvider;
import com.ict.extravel.global.auth.TokenUserInfo;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor

//JwtAuthFilter는 JWT 기반 인증을 처리하는 필터
//이 필터는 Spring Security 필터 체인의 일부로, 요청이 들어올 때마다 실행
public class JwtAuthFilter extends OncePerRequestFilter {

    private final TokenProvider tokenProvider;
    private List<String> permitAllPatterns; // 허용할 URL 패턴 리스트를 저장하는 변수

    private final AntPathMatcher pathMatcher = new AntPathMatcher(); // 경로 패턴 매칭을 위한 도구


    //허용할 URL 패턴 리스트를 설정하는 메서드
    public void setPermitAllPatterns(List<String> permitAllPatterns) {
        this.permitAllPatterns = permitAllPatterns;
    }


    // 필터가 해야 할 작업을 기술
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {


        // 요청 헤더에서 JWT 토큰을 추출
        String token = parseBearerToken(request);
        log.info("JWT Token Filter is running... - token: {}", token);

        // 요청 URI를 확인
        String requestURI = request.getRequestURI();
        log.info("request URI: {}", requestURI);

        // 현재 요청 URI가 허용된 URL 패턴에 포함되는지 확인
        boolean isPermitAllUrl = permitAllPatterns.stream()
                .anyMatch(pattern -> pathMatcher.match(pattern, requestURI));
        log.info("isPermitAllUrl: {}", isPermitAllUrl);

        // 허용된 URL 패턴인 경우 필터 체인의 다음 필터로 진행 : !yml 검사하겠다
        if (!isPermitAllUrl) {
            filterChain.doFilter(request, response);
            return;
        }

        // JWT 토큰이 유효한지 확인하고 인증 정보를 설정 : 무조건 토큰이 존재해야 실행됨
        if (token != null && !token.equals("null")) {
            // 토큰을 검증하고 사용자 정보를 추출
            TokenUserInfo tokenUserInfo = tokenProvider.validateAndGetTokenUserInfo(token);
            log.info("tokenUserInfo : {}", tokenUserInfo);
            // spring security에게 전달할 인가 정보 리스트를 생성.
            // 권한이 여러 개 존재할 경우 리스트로 권한 체크에 사용할 필드를 add
            // 우리는 Role 타입의 필드 하나만으로 권한을 체크하기 때문에 하나만 add, 여러개라면 여러 개 add 하세요.
            List<SimpleGrantedAuthority> authorityList = new ArrayList<>();
//            authorityList.add(new SimpleGrantedAuthority("ROLE_" + tokenUserInfo.getGrade().toString()));
//            log.info("{}", authorityList.get(0).toString());

            // 인증 완료 처리
            // spring security에게 인증정보를 전달해서 전역적으로 어플리케이션 내에서
            // 인증 정보를 활용할 수 있게 설정.
            AbstractAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                    tokenUserInfo, // 컨트롤러에서 활용할 유저 정보
                    null, // 인증된 사용자의 비밀번호 - 보통 null값
                    authorityList // 인가 정보 (권한 정보)
            );

            // 인증 완료 처리 시 클라이언트의 요청 정보를 세팅
            auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            // 스프링 시큐리티 컨테이너에 인증 정보 객체를 등록
            SecurityContextHolder.getContext().setAuthentication(auth);

        } else {
            log.warn("인증이 필요하지만, 토큰이 없습니다.");
            // 필터 체인에 예외를 전달하기 위해 IllegalArgumentException 발생
            throw new IllegalArgumentException();
        }

        // 다음 필터로 진행
        filterChain.doFilter(request, response);

    }

    private String parseBearerToken(HttpServletRequest request) {

        // 요청 헤더에서 토큰 꺼내오기
        // -- content-type: application/json
        // -- Authorization: Bearer aslkdblk2dnkln34kl52...

        // Authorization 헤더에서 Bearer 토큰을 추출
        String bearerToken = request.getHeader("Authorization");
        log.info("bearerToken : {}", bearerToken);
        // 요청 헤더에서 가져온 토큰은 순수 토큰 값이 아닌
        // 앞에 Bearer가 붙어있으니 이것을 제거하는 작업.
        // 헤더에서 'Bearer '로 시작하는 경우 토큰 부분만 반환
        if (StringUtils.hasText(bearerToken)
                && bearerToken.startsWith("Bearer")) {
            return bearerToken.substring(7);
        }
        return null;
    }


}
