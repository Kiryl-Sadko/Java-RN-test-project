package com.smop.backend_api.mapper;

import com.smop.backend_api.dto.ExchangeRateResponse;
import com.smop.backend_api.dto.OrderResponse;
import com.smop.backend_api.dto.ProductResponse;
import com.smop.backend_api.model.ExchangeRate;
import com.smop.backend_api.model.Order;
import com.smop.backend_api.model.Product;

public final class Mapper {

    private Mapper() {
    }

    public static ProductResponse mapToResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .build();
    }

    public static OrderResponse mapToResponse(Order o) {
        return OrderResponse.builder()
                .id(o.getId())
                .product(mapToResponse(o.getProduct()))
                .currency(o.getCurrency())
                .timestamp(o.getTimestamp())
                .build();
    }

    public static ExchangeRateResponse mapToResponse(ExchangeRate rate) {
        return ExchangeRateResponse.builder()
                .id(rate.getId())
                .currency(rate.getCurrency())
                .rate(rate.getRate())
                .timestamp(rate.getTimestamp())
                .build();
    }
}
