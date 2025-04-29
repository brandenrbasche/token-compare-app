'use client';

import {useSourceTargetState} from "@/context/SourceTargetContext";

const TokenSwapSummary = () => {
    const { sourceData, targetData, priceUsdInput } = useSourceTargetState();
    return (
        <div className='w-full text-center'>
            {sourceData && targetData && priceUsdInput && (
                <h1 className='text-2xl'>Amount of {targetData?.assetData?.symbol} after swap:
                    <strong> {(parseInt(priceUsdInput) / sourceData?.priceData?.unitPrice) * (sourceData?.priceData?.unitPrice / targetData?.priceData?.unitPrice)}</strong>
                </h1>
            )}
        </div>
    )
}

export default TokenSwapSummary;