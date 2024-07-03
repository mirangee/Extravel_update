package com.ict.extravel.domain.nation.repository;

import com.ict.extravel.domain.nation.entity.Nation;
import com.ict.extravel.domain.nation.entity.Video;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NationRepository extends JpaRepository<Nation, String> {

}
