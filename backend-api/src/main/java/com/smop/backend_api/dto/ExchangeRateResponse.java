package com.smop.backend_api.dto;

import com.smop.backend_api.model.Currency;
import lombok.Builder;

import java.time.Instant;

@Builder
public record ExchangeRateResponse(Long id,
                                   Currency currency,
                                   Double rate,
                                   Instant timestamp) {
}
