'use client';

import React from 'react';
import CompareCard from "@/components/CompareCard";
import {useSourceTargetDispatch, useSourceTargetState} from "@/context/SourceTargetContext";
import TokenButton from "@/components/TokenButton";
import {Token} from "@/types/tokenTypes";
import {tokenList} from "../../constants/tokens";
import PriceInput from "@/components/PriceInput";
import TokenSwapSummary from "@/components/TokenSwapSummary";

export default function TokenCompare() {
    const { sourceSelection, targetSelection } = useSourceTargetState();
    const dispatch = useSourceTargetDispatch();

    const handleTokenClick = (token: Token) => {
        dispatch({
            type: 'SELECT_TOKEN',
            payload: { token }
        })
    }
    
    const handleReset = () => {
        dispatch({
            type: 'RESET_STATE'
        });
    }

    return (
        <div className='w-full flex flex-col px-20'>
            <div className='mb-4'>
                <div className='flex w-full items-center justify-center relative'>
                    <h1 className='text-2xl font-bold text-center'>Token Price Explorer</h1>
                    <div className='absolute right-0'>
                        <button
                            onClick={handleReset}
                            className='px-5 mt-1 py-1 cursor-pointer font-bold relative group'
                        >
                            <span>🔁 Reset</span>
                            <span
                                className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                        </button>
                    </div>
                </div>
                <p className='text-center italic'>Select tokens and enter price to begin.</p>
            </div>

            {/*TokenTypes buttons*/}
            <div className={'w-full flex gap-x-4 items-center items-center justify-center mb-4'}>
                {
                    tokenList.map((token: Token) => (
                        <TokenButton tokenName={token.tokenName} key={token.tokenName}
                                     onClick={() => handleTokenClick(token)}/>
                    ))
                }
            </div>

            <PriceInput/>

            {/*TokenTypes compare*/}
            <div className='flex items-center justify-center w-full gap-x-4 mb-4'>
                <CompareCard type={'Source'} token={sourceSelection}/>
                <CompareCard type={'Target'} token={targetSelection}/>
            </div>

            {/*Swap summary info: */}
            <TokenSwapSummary />
        </div>
    );
}

