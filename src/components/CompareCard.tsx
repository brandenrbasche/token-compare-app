'use client';
import {useTokenData} from "@/context/SourceTargetContext";
import {Token} from "@/types/tokenTypes";

interface CompareCardProps {
    type: 'Source' | 'Target';
    token: Token;
}

const CompareCard = ({ type, token }: CompareCardProps) => {
    const tokenType = type === 'Source' ? 'source' : 'target';
    const tokenData = useTokenData(tokenType);
    
    const {assetData, priceData, isLoading, error} = tokenData || {};

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
                <div className='text-left w-full'>
                    <p className='underline'>Price data:</p>
                    <p><span className='font-bold'>Unit price:</span> {priceData?.unitPrice}</p>
                    <p><span className='font-bold'>Amount:</span> {priceData?.amount}</p>
                    <p><span className='font-bold'>Total:</span> {priceData?.total}</p>
                </div>
            )}
        </div>
    )
}

export default CompareCard;