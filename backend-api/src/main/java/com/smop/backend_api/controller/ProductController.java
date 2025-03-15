package com.smop.backend_api.controller;

import com.smop.backend_api.dto.OrderResponse;
import com.smop.backend_api.dto.ProductResponse;
import com.smop.backend_api.mapper.Mapper;
import com.smop.backend_api.repository.OrderRepository;
import com.smop.backend_api.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    @GetMapping
    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll().stream()
                .map(Mapper::mapToResponse)
                .toList();
    }

    @GetMapping("/{id}/orders")
    public List<OrderResponse> getOrdersByProduct(@PathVariable Long id) {
        return orderRepository.findAllByProductId(id).stream()
                .map(Mapper::mapToResponse)
                .toList();
    }
}
