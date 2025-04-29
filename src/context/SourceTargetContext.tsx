import React, { createContext, useReducer, useContext, Dispatch, ReactNode, useEffect } from 'react';
import {Token, TokenData, AssetData, PriceData} from "@/types/tokenTypes";

interface SourceTargetState {
    sourceSelection: Token | null;
    targetSelection: Token | null;
    nextClickSets: 'source' | 'target';
    sourceData: TokenData | null;
    targetData: TokenData | null;
    priceUsdInput: string;
}

const initialState: SourceTargetState = {
    sourceSelection: null,
    targetSelection: null,
    nextClickSets: 'source',
    sourceData: null,
    targetData: null,
    priceUsdInput: ''
}

// action definition
type Action = 
    | { type: 'SELECT_TOKEN', payload: { token: Token }}
    | { type: 'SET_TOKEN_LOADING', payload: { tokenType: 'source' | 'target' }}
    | { type: 'SET_TOKEN_ASSET_DATA', payload: { tokenType: 'source' | 'target', data: AssetData }}
    | { type: 'SET_TOKEN_PRICE_DATA', payload: { tokenType: 'source' | 'target', data: PriceData }}
    | { type: 'SET_TOKEN_ERROR', payload: { tokenType: 'source' | 'target', error: string }}
    | { type: 'SET_PRICE_USD_INPUT', payload: { value: string }}
    | { type: 'RESET_STATE' };
// TODO: add more actions later (ex/ reset selections)

/* Reducer Function: */
function sourceTargetReducer(state: SourceTargetState, action: Action): SourceTargetState {
    switch (action.type) {
        case 'SELECT_TOKEN': {
            const { token } = action.payload;

            if (state.nextClickSets === 'source') {
                return {
                    ...state,
                    sourceSelection: token,
                    sourceData: { token, isLoading: true },
                    nextClickSets: 'target' // toggle for next selection
                };
            } else {
                return {
                    ...state,
                    targetSelection: token,
                    targetData: { token, isLoading: true },
                    nextClickSets: 'source'
                };
            }
        }
        case 'SET_TOKEN_LOADING': {
            const { tokenType } = action.payload;
            if (tokenType === 'source') {
                return {
                    ...state,
                    sourceData: state.sourceData ? { ...state.sourceData, isLoading: true } : null
                };
            } else {
                return {
                    ...state,
                    targetData: state.targetData ? { ...state.targetData, isLoading: true } : null
                };
            }
        }
        case 'SET_TOKEN_ASSET_DATA': {
            const { tokenType, data } = action.payload;
            if (tokenType === 'source') {
                return {
                    ...state,
                    sourceData: state.sourceData ? { ...state.sourceData, assetData: data } : null
                };
            } else {
                return {
                    ...state,
                    targetData: state.targetData ? { ...state.targetData, assetData: data } : null
                };
            }
        }
        case 'SET_TOKEN_PRICE_DATA': {
            const { tokenType, data } = action.payload;
            if (tokenType === 'source') {
                return {
                    ...state,
                    sourceData: state.sourceData ? { ...state.sourceData, priceData: data, isLoading: false } : null
                };
            } else {
                return {
                    ...state,
                    targetData: state.targetData ? { ...state.targetData, priceData: data, isLoading: false } : null
                };
            }
        }
        case 'SET_TOKEN_ERROR': {
            const { tokenType, error } = action.payload;
            if (tokenType === 'source') {
                return {
                    ...state,
                    sourceData: state.sourceData ? { ...state.sourceData, error, isLoading: false } : null
                };
            } else {
                return {
                    ...state,
                    targetData: state.targetData ? { ...state.targetData, error, isLoading: false } : null
                };
            }
        }
        case 'SET_PRICE_USD_INPUT': {
            const { value } = action.payload;
            return {
                ...state,
                priceUsdInput: value
            };
        }
        case 'RESET_STATE': {
            return initialState;
        }
        default: {
            return state;
        }
    }
}

/* Context Creation */
interface SourceTargetContextProps {
    state: SourceTargetState;
    dispatch: Dispatch<Action>;
    fetchTokenData: (token: Token, type: 'source' | 'target') => void;
}

const SourceTargetContext = createContext<SourceTargetContextProps | undefined>(undefined);

// Provider:
interface SourceTargetProviderProps {
    children: ReactNode;
}

export function SourceTargetProvider({ children }: SourceTargetProviderProps) {
    const [state, dispatch] = useReducer(sourceTargetReducer, initialState);
    
    // Function to fetch data for a token
    const fetchTokenData = async (token: Token, type: 'source' | 'target') => {
        if (!token) return;
        
        // Set loading state
        dispatch({
            type: 'SET_TOKEN_LOADING',
            payload: { tokenType: type }
        });
        
        try {
            // First fetch: Get asset data
            const assetResponse = await fetch('/api/getAssetErc20ByChainAndSymbol', {
                headers: {
                    chainId: token.chainId,
                    symbol: token.tokenName,
                }
            });
            
            if (!assetResponse.ok) throw new Error('Failed to fetch asset data');
            
            const assetData = await assetResponse.json();
            
            dispatch({
                type: 'SET_TOKEN_ASSET_DATA',
                payload: { tokenType: type, data: assetData }
            });
            
            // Second fetch: Get price data using the asset data
            const priceResponse = await fetch('/api/getAssetPriceInfo', {
                headers: {
                    chainId: token.chainId,
                    assetTokenAddress: assetData.address,
                }
            });
            
            if (!priceResponse.ok) throw new Error('Failed to fetch price data');
            
            const priceData = await priceResponse.json();
            
            dispatch({
                type: 'SET_TOKEN_PRICE_DATA',
                payload: { tokenType: type, data: priceData }
            });
            
        } catch (error) {
            console.error(`Error fetching ${type} token data:`, error);
            dispatch({
                type: 'SET_TOKEN_ERROR',
                payload: { 
                    tokenType: type, 
                    error: error instanceof Error ? error.message : 'Unknown error' 
                }
            });
        }
    };
    
    // Auto-fetch data when tokens are selected
    useEffect(() => {
        if (state.sourceSelection) {
            fetchTokenData(state.sourceSelection, 'source');
        }
    }, [state.sourceSelection]);
    
    useEffect(() => {
        if (state.targetSelection) {
            fetchTokenData(state.targetSelection, 'target');
        }
    }, [state.targetSelection]);
    
    const value = { state, dispatch, fetchTokenData };

    return (
        <SourceTargetContext.Provider value={value}>
            {children}
        </SourceTargetContext.Provider>
    )
}

// Custom hooks:
export function useSourceTargetState(): SourceTargetState {
    const context = useContext(SourceTargetContext);
    if (context === undefined) throw new Error('useSourceTargetState must be used within a SourceTargetProvider');
    return context.state;
}

export function useSourceTargetDispatch(): Dispatch<Action> {
    const context = useContext(SourceTargetContext);
    if (context === undefined) throw new Error('useSourceTargetDispatch must be used within a SourceTargetProvider');
    return context.dispatch;
}

export function useTokenData(type: 'source' | 'target'): TokenData | null {
    const context = useContext(SourceTargetContext);
    if (context === undefined) throw new Error('useTokenData must be used within a SourceTargetProvider');
    return type === 'source' ? context.state.sourceData : context.state.targetData;
}

export function useFetchTokenData(): (token: Token, type: 'source' | 'target') => void {
    const context = useContext(SourceTargetContext);
    if (context === undefined) throw new Error('useFetchTokenData must be used within a SourceTargetProvider');
    return context.fetchTokenData;
}