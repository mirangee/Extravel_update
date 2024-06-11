package com.ict.extravel.domain.nation.repository;

import com.ict.extravel.domain.nation.entity.Nation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NationRepository extends JpaRepository<Nation, String> {
}
