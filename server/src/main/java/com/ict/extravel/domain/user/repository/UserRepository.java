package com.ict.extravel.domain.user.repository;

import com.ict.extravel.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
