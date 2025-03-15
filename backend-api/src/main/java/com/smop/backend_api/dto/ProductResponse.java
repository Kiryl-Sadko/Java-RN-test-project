package com.smop.backend_api.dto;

import lombok.Builder;

@Builder
public record ProductResponse(Long id,
                              String name,
                              Double price) {
}
