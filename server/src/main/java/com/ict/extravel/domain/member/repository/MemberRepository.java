package com.ict.extravel.domain.member.repository;

import com.ict.extravel.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Integer> {
}
