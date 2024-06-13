package com.ict.extravel.domain.member.repository;

import com.ict.extravel.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    boolean existsByEmail(String email); // 이메일 중복 체크

   // static Optional<Member> findByEmail(String email);

    //Optional<Member> findByRefreshToken(String refreshToken);
}
