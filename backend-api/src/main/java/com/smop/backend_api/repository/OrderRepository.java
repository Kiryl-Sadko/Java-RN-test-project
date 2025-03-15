package com.smop.backend_api.repository;

import com.smop.backend_api.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByProductId(Long id);
}
