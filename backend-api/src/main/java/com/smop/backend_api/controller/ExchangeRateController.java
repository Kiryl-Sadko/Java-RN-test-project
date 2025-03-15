package com.smop.backend_api.controller;

import com.smop.backend_api.dto.ExchangeRateResponse;
import com.smop.backend_api.mapper.Mapper;
import com.smop.backend_api.model.Currency;
import com.smop.backend_api.model.ExchangeRate;
import com.smop.backend_api.repository.ExchangeRateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/exchange-rates")
@RequiredArgsConstructor
public class ExchangeRateController {

    private final ExchangeRateRepository exchangeRateRepository;

    @GetMapping("/latest")
    public ExchangeRateResponse getLatestExchangeRate(@RequestParam Currency currency,
                                                      @RequestParam Long timestamp) {
        Instant instant = Instant.ofEpochMilli(timestamp);
        Optional<ExchangeRate> rateOpt = exchangeRateRepository
                .findFirstByCurrencyAndTimestampLessThanEqualOrderByTimestampDesc(currency, instant);
        ExchangeRate rate = rateOpt.orElseThrow(() -> new RuntimeException("Exchange rate not found"));
        return Mapper.mapToResponse(rate);
    }
}
