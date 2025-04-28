export interface Token {
    tokenName: string;
    chainId: string;
    // symbol: string;
}

export interface AssetData {
    address: string;
    chain: string;
    decimals: number;
    name: string;
    symbol: string;
}

export interface PriceData {
    unitPrice: number;
    amount: number;
    total: number;
}

export interface TokenData {
    token: Token;
    assetData?: AssetData;
    priceData?: PriceData;
    isLoading: boolean;
    error?: string;
}

export interface PriceInfo {
    assetTokenAddress: string;
    chainId: string;
    // priceUsd: string;
}