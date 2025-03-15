export interface ProductDto {
    id: number;
    name: string;
    price: number;
}

export interface OrderDto {
    id: number;
    productId: number;
    productName: string;
    timestamp: string; // ISO string
}

export interface ExchangeRateDto {
    id: number;
    currency: string;
    rate: number;
    timestamp: string; // ISO string
}

