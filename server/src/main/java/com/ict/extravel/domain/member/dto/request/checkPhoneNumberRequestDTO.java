package com.ict.extravel.domain.member.dto.request;

import com.ict.extravel.domain.member.entity.Member;
import com.ict.extravel.domain.nation.entity.Nation;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class checkPhoneNumberRequestDTO {


    @NotBlank
    @Size(max = 11)
    private String phoneNumber;

    public Member toEntity(Nation us) {

        return Member.builder()
                .phoneNumber(phoneNumber)//리액트랑 동일명
                .build();
    }

}
