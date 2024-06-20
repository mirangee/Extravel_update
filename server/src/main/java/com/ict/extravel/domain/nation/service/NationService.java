package com.ict.extravel.domain.nation.service;


import com.ict.extravel.domain.nation.entity.Nation;
import com.ict.extravel.domain.nation.repository.NationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NationService {
    private final NationRepository nationRepository;

    public List<Nation> getNationData() {
        System.out.println(nationRepository.findById("EU"));
        return nationRepository.findAll();
    }
}
