package com.smop.backend_api.repository;

import com.smop.backend_api.model.Currency;
import com.smop.backend_api.model.ExchangeRate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.Optional;

public interface ExchangeRateRepository extends JpaRepository<ExchangeRate, Long> {

    /**
     * Retrieves the latest exchange rate for the specified currency before or at the given timestamp.
     *
     * @param currency  the currency to filter by
     * @param timestamp the maximum timestamp (inclusive)
     * @return an Optional containing the latest ExchangeRate if found, otherwise empty
     */
    Optional<ExchangeRate> findFirstByCurrencyAndTimestampLessThanEqualOrderByTimestampDesc(Currency currency, Instant timestamp);
}
