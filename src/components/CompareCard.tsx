'use client';
import {useEffect} from "react";
import {useSourceTargetState, useTokenData} from "@/context/SourceTargetContext";
import {Token} from "@/types/tokenTypes";

interface CompareCardProps {
    type: 'Source' | 'Target';
    token: Token | null;
}

const CompareCard = ({ type, token }: CompareCardProps) => {
    const tokenType = type === 'Source' ? 'source' : 'target';
    const tokenData = useTokenData(tokenType);
    
    // Get both source and target data regardless of which card this is
    const { sourceData, targetData, priceUsdInput } = useSourceTargetState();
    
    // let usdToSourceAmount: number = 0; // how much source token USD amount buys
    // let usdToTargetAmount: number = 0; // how much target token USD amount buys
    // let sourceToTargetAmount: number = 0; // how much target token the specific amountSource would swap for

    const {assetData, priceData, isLoading, error} = tokenData || {};
    
    // Calculation effect when price input changes
    useEffect(() => {
        if (!priceUsdInput) return;
        
        try {
            const parsedUsd = parseFloat(priceUsdInput);
            if (isNaN(parsedUsd)) return;
            
            // // Calculations specific to source card
            // if (tokenType === 'source' && sourceData?.priceData) {
            //     // calculate how much source token the USD amount buys
            //     usdToSourceAmount = parsedUsd / sourceData.priceData.unitPrice;
            // }
            //
            // // Calculations specific to target card
            // if (tokenType === 'target' && sourceData?.priceData && targetData?.priceData) {
            //     usdToTargetAmount = parsedUsd / targetData.priceData.unitPrice;
            //     // calculate target token amount based on source token amount and price ratios
            //     // sourceToTargetAmount = usdToSourceAmount * (sourceData.priceData.unitPrice / targetData.priceData.unitPrice);
            // }

        } catch (error) {
            console.error('Error in price calculation:', error);
        }
    }, [priceUsdInput, sourceData, targetData, tokenType]);

    return (
        <div className='w-full h-full flex flex-col items-center justify-center border rounded-lg p-4'>
            {isLoading && <p>Loading token data...</p>}
            
            {error && <p className='text-red-500'>Error: {error}</p>}
            
            {!token && <p className='italic'>Select a {type.toLowerCase()} token.</p>}
            
            {assetData && (
                <>
                    <div className='text-center mb-4'>
                        <p>Selected {type}:</p>
                        <h2 className='text-xl font-bold'>{token?.tokenName} ({assetData?.name})</h2>
                    </div>
                    <div className='text-left w-full mb-4'>
                        <p className='underline'>Asset data</p>
                        <p><span className='font-bold'>Chain:</span> {assetData?.chain}</p>
                        <p><span className='font-bold'>Decimals:</span> {assetData?.decimals}</p>
                        <p><span className='font-bold'>Address:</span> {assetData?.address}</p>
                    </div>
                </>
            )}

            {priceData && (
                <div className='text-left w-full mb-4'>
                    <p className='underline'>Price data:</p>
                    <p><span className='font-bold'>Unit price:</span> {priceData?.unitPrice}</p>
                    <p><span className='font-bold'>Amount:</span> {priceData?.amount}</p>
                    <p><span className='font-bold'>Total:</span> {priceData?.total}</p>
                </div>
            )}

            {/* Source token card calculation display */}
            {tokenType === 'source' && priceUsdInput && sourceData?.priceData && (
                <div className='text-left w-full text-xl'>
                    <p><strong>Amount of {sourceData.assetData?.symbol} for ${priceUsdInput}: </strong> { (parseFloat(priceUsdInput) / sourceData.priceData.unitPrice).toFixed(6)}</p>
                    {/*<p><strong>Amount of {sourceData.assetData?.symbol} for ${priceUsdInput}: </strong> {usdToSourceAmount.toFixed(6)}</p>*/}
                </div>
            )}
            
            {/* Target token card calculation display */}
            {tokenType === 'target' && priceUsdInput && sourceData?.priceData && targetData?.priceData && (
                <div className='text-left w-full text-xl'>
                    <p><strong>Amount of {targetData.assetData?.symbol} for
                        ${priceUsdInput}: </strong> {(parseFloat(priceUsdInput) / targetData.priceData.unitPrice).toFixed(6)}
                    </p>
                </div>
            )}
        </div>
    )
}

export default CompareCard;