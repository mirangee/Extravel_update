package com.ict.extravel.domain.member.repository;

import com.ict.extravel.domain.member.entity.Member;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    Optional<Member> findByPhoneNumber(String phoneNumber);


    boolean existsByEmail(String email); // 이메일 중복 체크
    boolean existsByPhoneNumber(String phoneNumber);
    Optional<Member> findByEmail(String email); //메서드 직접 선언

    //풀리용 임시 주석 처리 06.27 진행중~ by종구
//    Optional<Member> findMembersWithNameAndPhone(String phoneNumber, String name); //자체 아이디 찾기

    // 이름, 전화번호로 멤버 찾기
    @Query("SELECT m FROM Member m WHERE m.phoneNumber = :phoneNumber AND m.name = :name")
    Optional<List<Member>> findByPhoneNumberAndName(@Param("phoneNumber") String phoneNumber, @Param("name") String name); //@@@ LIST


    //비밀번호 찾기
//    @Query("SELECT m FROM Member m WHERE m.email = :email AND m.phoneNumber = :phoneNumber")
//    Optional<List<Member>> findPassword(@Param("email") String email, @Param("phoneNumber") String phoneNumber); //@@@ LIST

    @Modifying
    @Transactional //@Transactional 어노테이션을 통해 데이터베이스 작업이 트랜잭션 내에서 이루어지도록 보장
    @Query("UPDATE Member m SET m.password = :newPassword WHERE m.email = :email AND m.phoneNumber = :phoneNumber")
    int updatePasswordByEmailAndPhoneNumber(@Param("email") String email, @Param("phoneNumber") String phoneNumber, @Param("newPassword") String newPassword);




    // static Optional<Member> findByEmail(String email);
    //Optional<Member> findByRefreshToken(String refreshToken);
}
