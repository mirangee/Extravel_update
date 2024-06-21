package com.ict.extravel.domain.pointexchange.service;

import com.ict.extravel.domain.member.entity.Member;
import com.ict.extravel.domain.member.repository.MemberRepository;
import com.ict.extravel.domain.pointexchange.MakePayRequest;
import com.ict.extravel.domain.pointexchange.dto.PayInfoDto;
import com.ict.extravel.domain.pointexchange.dto.response.PaymentDto;
import com.ict.extravel.domain.pointexchange.dto.request.PayRequest;
import com.ict.extravel.domain.pointexchange.dto.response.PayReadyResDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Slf4j
@RequiredArgsConstructor
@Service
public class KakaoPayService {



}
