package com.smop.backend_api.dto;

import com.smop.backend_api.model.Currency;
import lombok.Builder;

import java.time.Instant;

@Builder
public record OrderResponse(Long id,
                            ProductResponse product,
                            Currency currency,
                            Instant timestamp) {
}
