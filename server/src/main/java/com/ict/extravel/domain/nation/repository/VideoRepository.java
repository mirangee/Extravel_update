package com.ict.extravel.domain.nation.repository;

import com.ict.extravel.domain.nation.entity.Video;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VideoRepository  extends JpaRepository <Video , Integer> {    //extends JpaRepository <Video , Integer> 이걸 사용함으로써  JPA 를쓸수잇게되었고 <Video , Integer> 왼쪽값은 사용할테이블클래스이름 우측은 pk값
                                                                               //Video 라는 이름으로 jpa 테이블을 만들엇어서 매개값이 video 가 된거고 video 에 pk 값이 id 인데 타입이 Integer 임
    @Query("SELECT v FROM Video v WHERE v.nationCode = :nation_code")            // 이게 좀 이해가필요한부분인데 jpa 는 엔터티를기준으로 작동되서 v 는 저기서 언제든변경되는 임시값이다 video 테이블에는 총4개의 컬럼이있다
    List<Video> findByNation(@Param("nation_code") String nation);               //그 4개의 컬럼이 저 v에들어가는것이다 즉 모든 컬럼이 다 보여지는건데 여기서    v.nationCode 를 쓰면 매개값으로 날아온 nation 예시를들어 JP면 JP에 관련된
}                                                                                // 모든컬럼이조회된다는뜻이다
