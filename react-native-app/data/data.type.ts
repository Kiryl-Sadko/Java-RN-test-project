export interface ProductDto {
    id: number;
    name: string;
    price: number;
}

export interface OrderDto {
    id: number;
    product: ProductDto
    currency: string;
    timestamp: string; // ISO string
}

export interface EnrichedOrder extends OrderDto {
    localPrice: number;
}

export interface ExchangeRateDto {
    id: number;
    currency: string;
    rate: number;
    timestamp: string; // ISO string
}

