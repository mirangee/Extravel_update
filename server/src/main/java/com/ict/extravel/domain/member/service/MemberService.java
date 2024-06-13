package com.ict.extravel.domain.member.service;
import com.ict.extravel.domain.member.dto.response.KakaoUserDTO;
import com.ict.extravel.domain.member.dto.response.LoginResponseDTO;
import com.ict.extravel.domain.member.entity.Member;
import com.ict.extravel.domain.member.repository.MemberRepository;
import com.ict.extravel.global.auth.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Map;


@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class MemberService {
/*
    private final MemberRepository memberRepository;
    private final TokenProvider tokenProvider;

    @Value("${kakao.client_id}")
    private static String KAKAO_CLIENT_ID;

    @Value("${kakao.redirect_url}")
    private static String KAKAO_REDIRECT_URL;
    @Value("${kakao.client_secret}")
    private static String KAKAO_CLIENT_SECRET;

    public boolean isDuplicate(String email) {
        if(memberRepository.existsByEmail(email)) {
            return true;
        } else return false;
    }

    public LoginResponseDTO kakaoService(String code) {
        // 인가 코드를 통해 토큰을 발급받기
        String accessToken = getKakaoAccessToken(code);

        // 토큰을 통해 사용자 정보를 가져오기
        KakaoUserDTO userDTO = getKakaoUserInfo(accessToken);

        if(!isDuplicate(userDTO.getKakaoAccount().getEmail())) {
            // 이메일이 중복되지 않았다. -> 이전에 로그인한 적 없음 -> DB에 데이터를 세팅
            memberRepository.save(userDTO.toEntity(accessToken));
        }
        // 이메일 중복 -> DB에 데이터를 또 넣을 필요 없음
        Member foundMember = MemberRepository.findByEmail(userDTO.getKakaoAccount().getEmail()).orElseThrow();


        foundMember.changeAccessToken(accessToken);
        memberRepository.save(foundMember);

        return new LoginResponseDTO(foundMember);
    }

    private static KakaoUserDTO getKakaoUserInfo(String accessToken) {
        // 요청 uri
        String requestURI = "https://kapi.kakao.com/v2/user/me";
        // 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // 요청 보내기
        RestTemplate template = new RestTemplate();
        ResponseEntity<KakaoUserDTO> responseEntity
                = template.exchange(requestURI, HttpMethod.GET, new HttpEntity<>(headers), KakaoUserDTO.class);

        // 응답 바디 꺼내기
        KakaoUserDTO responseData = responseEntity.getBody();

        return responseData;
    }

    private static String getKakaoAccessToken(String code) {
        // 요청 uri
        String requestURI = "https://kauth.kakao.com/oauth/token";

        // 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // 요청 바디(파라미터) 설정
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", KAKAO_CLIENT_ID);
        params.add("redirect_uri", KAKAO_REDIRECT_URL);
        params.add("code", code);
        params.add("client_secret", KAKAO_CLIENT_SECRET);

        // 헤더와 바디 정보를 합치기 위해 HttpEntity 객체 생성
        HttpEntity<Object> requestEntity = new HttpEntity<>(params, headers);

        // 카카오 서버로 POST 통신
        RestTemplate template = new RestTemplate();

        ResponseEntity<Map> responseEntity
                = template.exchange(requestURI, HttpMethod.POST, requestEntity, Map.class);

        // 응답 데이터에서 필요한 정보를 가져오기
        Map<String, Object> responseData = (Map<String, Object>) responseEntity.getBody();

        // 여러가지 데이터 중 access_token이라는 이름의 데이터를 리턴
        // Object 를 String으로 형 변환해서 리턴.
        return (String) responseData.get("access_token");


    }*/
}
















