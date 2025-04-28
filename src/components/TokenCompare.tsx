'use client';

import React, { useState } from 'react';
import CompareCard from "@/components/CompareCard";
import {userSourceTargetState, useSourceTargetDispatch, useSourceTargetState} from "@/context/SourceTargetContext";
import TokenButton from "@/components/TokenButton";
import {Token} from "@/types/tokenTypes";
import {tokenList} from "../../constants/tokens";
import PriceInput from "@/components/PriceInput";

// interface SourceTargetSelectorProps {
//     items: Token[];
// }
//
// interface TokenData {
//     address: string;
//     chain: string;
//     decimals: number;
//     symbol: string;
// }

export default function TokenCompare() {
    const { sourceSelection, targetSelection } = useSourceTargetState();
    const dispatch = useSourceTargetDispatch();

    const handleTokenClick = (token: Token) => {
        console.log('token', token);
        dispatch({
            type: 'SELECT_TOKEN',
            payload: { token }
        })
    }

    return (
        <div className='w-full flex flex-col'>
            <div className='mb-4'>
                <h1 className='text-2xl font-bold text-center'>Token Price Explorer</h1>
                <p className='text-center italic'>Select source and target token.</p>
            </div>

            <PriceInput />

            {/*TokenTypes buttons*/}
            <div className={'w-full flex gap-x-4 items-center items-center justify-center mb-4'}>
                {
                    tokenList.map((token: Token) => (
                        <TokenButton tokenName={token.tokenName} key={token.tokenName} onClick={() => handleTokenClick(token)} />
                    ))
                }
            </div>

            {/*TokenTypes compare*/}
            <div className='flex items-center justify-center w-full gap-x-4'>
                <CompareCard type={'Source'} token={sourceSelection || null} />
                <CompareCard type={'Target'} token={targetSelection || null} />
            </div>
        </div>
    );
}

