package com.ict.extravel.domain.member.service;


import com.ict.extravel.domain.member.dto.request.MemberSignUpRequestDTO;
import com.ict.extravel.domain.member.dto.response.MemberSignUpResponseDTO;
import com.ict.extravel.domain.member.entity.Member;
import com.ict.extravel.domain.member.repository.MemberRepository;
import com.ict.extravel.domain.nation.entity.Nation;
import com.ict.extravel.domain.nation.repository.NationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;
    private final NationRepository nationRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberSignUpResponseDTO create(final MemberSignUpRequestDTO dto) throws Exception {

        String encoded = passwordEncoder.encode(dto.getPassword());
        dto.setPassword(encoded);
        Nation us = nationRepository.findById("US").orElseThrow();
        Member saved = memberRepository.save(dto.toEntity(us));
        log.info("회원 가입 정상 수행됨! - saved user - {}", saved);

        return new MemberSignUpResponseDTO(saved);

    }
}
