package com.ict.extravel.domain.nation.repository;

import com.ict.extravel.domain.nation.entity.Video;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VideoRepository  extends JpaRepository <Video , Integer> {

    @Query("SELECT v FROM Video v WHERE v.nationCode = :nation_code")
    List<Video> findByNation(@Param("nation_code") String nation);
}
