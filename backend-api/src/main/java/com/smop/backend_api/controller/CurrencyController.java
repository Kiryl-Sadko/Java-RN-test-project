package com.smop.backend_api.controller;


import com.smop.backend_api.model.Currency;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/v1/currencies")
public class CurrencyController {

    @GetMapping
    public List<String> getSupportedCurrencies() {
        return Arrays.stream(Currency.values())
                .map(Enum::name)
                .toList();
    }
}
