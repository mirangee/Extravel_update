package com.ict.extravel.domain.member.service;

import com.ict.extravel.domain.currency.entity.Currency;
import com.ict.extravel.domain.currency.repository.CurrencyRepository;
import com.ict.extravel.domain.member.dto.request.ExchangeRequestDTO;
import com.ict.extravel.domain.member.dto.response.ExchangeHistoryResponseDTO;
import com.ict.extravel.domain.member.entity.ExchangeHistory;
import com.ict.extravel.domain.member.entity.Member;
import com.ict.extravel.domain.member.entity.WalletExchange;
import com.ict.extravel.domain.member.repository.ExChangeHistoryRepository;
import com.ict.extravel.domain.member.repository.MemberRepository;
import com.ict.extravel.domain.member.repository.WalletExchangeRepository;
import com.ict.extravel.domain.nation.entity.Nation;
import com.ict.extravel.domain.nation.repository.NationRepository;
import com.ict.extravel.domain.pointexchange.entity.Wallet;
import com.ict.extravel.domain.pointexchange.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
@Slf4j
@Service
@RequiredArgsConstructor
public class ExchangeService {
    private final MemberRepository memberRepository;
    private final ExChangeHistoryRepository exChangeHistoryRepository;
    private final NationRepository nationRepository;
    private final CurrencyRepository currencyRepository;
    private final WalletExchangeRepository walletExchangeRepository;
    private final WalletRepository walletRepository;
    public String saveHistory(ExchangeRequestDTO requestDTO) {
        Member member = memberRepository.findByEmail(requestDTO.getEmail()).orElseThrow();
        Nation nation = nationRepository.findById(requestDTO.getNation()).orElseThrow();
        Currency currency = currencyRepository.findById(requestDTO.getCurrencyCode()).orElseThrow();
        ExchangeHistory history = ExchangeHistory.builder()
                .member(member)
                .currencyCode(currency)
                .amount(requestDTO.getTo())
                .useEtPoint(requestDTO.getEtp())
                .transactionDate(LocalDate.now())
                .exchangeRate(requestDTO.getExchangeRate())
                .build();
        exChangeHistoryRepository.save(history);
        updatewalletExchange(member, nation, currency, requestDTO);
        updatewallet(member,requestDTO);
        if(member==null||nation==null||currency==null||requestDTO==null){
            return "error";
        }else{
            return "success";
        }
    }

    private void updatewallet(Member member, ExchangeRequestDTO requestDTO) {
        Wallet wallet = walletRepository.findById(member.getId()).orElseThrow();
        wallet.setEtPoint(wallet.getEtPoint().subtract(requestDTO.getEtp()));
        walletRepository.save(wallet);
    }

    private void updatewalletExchange(Member member, Nation nation, Currency currency, ExchangeRequestDTO requestDTO) {
        WalletExchange byMemberAndCurrencyCode = walletExchangeRepository.findByMemberAndCurrencyCode(member, currency);
        if (byMemberAndCurrencyCode == null) {
            WalletExchange walletExchange = WalletExchange.builder()
                   .member(member)
                   .nationCode(nation)
                   .currencyCode(currency)
                   .exchangeAmount(requestDTO.getTo())
                   .build();
            walletExchangeRepository.save(walletExchange);
        }else {
            byMemberAndCurrencyCode.setExchangeAmount(byMemberAndCurrencyCode.getExchangeAmount().add(requestDTO.getTo()));
            walletExchangeRepository.save(byMemberAndCurrencyCode);
        }
    }


    public List<ExchangeHistoryResponseDTO> getExchangeHistory(Integer id) {
        List<ExchangeHistory> historyList = exChangeHistoryRepository.findAllByMemberId(id);

        log.info("DB에서 가져온 history List: {}", historyList);
        List<ExchangeHistoryResponseDTO> responseDTOList = new ArrayList<>();
        for (ExchangeHistory e : historyList) {
            ExchangeHistoryResponseDTO responseDTO = new ExchangeHistoryResponseDTO(e);
            responseDTOList.add(responseDTO);
            log.info("DTO로 변환: {}", responseDTO);
        }
        return responseDTOList;
    }

}
