import {ExchangeRateDto, OrderDto, ProductDto} from "@/data/data.type";

const IP_ADDRESS = '192.168.1.65'
const BASE_URL = `http://${IP_ADDRESS}:8080/api/v1`;

/**
 * Fetch all products.
 */
export async function fetchProducts(): Promise<ProductDto[]> {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
        throw new Error(`Error fetching products: ${response.statusText}`);
    }
    return response.json();
}

/**
 * Fetch orders for a specific product.
 * @param productId - The ID of the product.
 */
export async function fetchProductOrders(productId: number): Promise<OrderDto[]> {
    const response = await fetch(`${BASE_URL}/products/${productId}/orders`);
    if (!response.ok) {
        throw new Error(`Error fetching orders for product ${productId}: ${response.statusText}`);
    }
    return response.json();
}

/**
 * Fetch the latest exchange rate for a given currency before a specific timestamp.
 * @param currency - The currency code (e.g., 'EUR', 'GBP').
 * @param timestamp - The timestamp in epoch milliseconds.
 */
export async function fetchLatestExchangeRate(currency: string, timestamp: number): Promise<ExchangeRateDto> {
    const url = `${BASE_URL}/exchange-rates/latest?currency=${encodeURIComponent(currency)}&timestamp=${timestamp}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error fetching exchange rate for ${currency}: ${response.statusText}`);
    }
    return response.json();
}

/**
 * Fetch the list of supported currencies.
 */
export async function fetchCurrencies(): Promise<string[]> {
    const response = await fetch(`${BASE_URL}/currencies`);
    if (!response.ok) {
        throw new Error(`Error fetching currencies: ${response.statusText}`);
    }
    return response.json();
}
