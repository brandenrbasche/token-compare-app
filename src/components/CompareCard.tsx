'use client';
import {useState, useEffect} from "react";
import {Token} from "@/types/tokenTypes";

interface CompareCardProps {
    type: 'Source' | 'Target';
    token: Token;
}

interface AssetData {
    address: string;
    chain: string;
    decimals: number;
    name: string;
    symbol: string;
}

const CompareCard = ({ type, token }: CompareCardProps) => {
    const [assetData, setAssetData] = useState<AssetData | null>();
    useEffect(() => {
        if (token === null) {
            console.log('token null');
        } else {
            const fetchData = async () => {
                try {
                    const response = await fetch('/api/getAssetErc20ByChainAndSymbol', {
                        headers: {
                            chainId: token?.chainId,
                            symbol: token?.tokenName,
                            apiKey: process.env.FUNKIT_API_KEY
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Error fetching asset data.');
                    }
                    const data = await response.json();
                    setAssetData({...data})
                    console.log('logging data: ', data);
                } catch(error) {
                    console.error('Error fetching asset data: ', error);
                }
            }

            fetchData();
        }
    }, [token]);

    return (
        <div className='w-full h-full flex flex-col items-center justify-center border rounded-lg p-4'>
            <div className='text-center'>
                <p>Selected {type}:</p>
                <h2 className='text-xl font-bold'>{token?.tokenName} ({assetData?.name})</h2>
            </div>
            <div className='text-left'>
                <p><span className='font-bold'>Chain:</span> {assetData?.chain}</p>
                <p><span className='font-bold'>Decimals:</span> {assetData?.decimals}</p>
                <p><span className='font-bold'>Address:</span> {assetData?.address}</p>
            </div>

        </div>
    )
}

export default CompareCard;