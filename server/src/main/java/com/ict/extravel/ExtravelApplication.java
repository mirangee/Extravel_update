package com.ict.extravel;

import com.ict.extravel.domain.currency.repository.CurrencyRepository;
import com.ict.extravel.global.scheduler.exchage.ExchageCrolling;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ExtravelApplication {

    public static void main(String[] args) {
        SpringApplication.run(ExtravelApplication.class, args);

    }

}
