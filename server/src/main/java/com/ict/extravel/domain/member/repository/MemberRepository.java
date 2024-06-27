package com.ict.extravel.domain.member.repository;

import com.ict.extravel.domain.member.entity.Member;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface MemberRepository extends JpaRepository<Member, Integer> {
    Optional<Member> findByPhoneNumber(String phoneNumber);


    boolean existsByEmail(String email); // 이메일 중복 체크
    boolean existsByPhoneNumber(String phoneNumber);
    Optional<Member> findByEmail(String email); //메서드 직접 선언

    //풀리용 임시 주석 처리 06.27 진행중~ by종구
//    Optional<Member> findByID(String phoneNumber, String name); //자체 아이디 찾기

    // static Optional<Member> findByEmail(String email);
    //Optional<Member> findByRefreshToken(String refreshToken);
}
