import React from 'react';

type TokenButtonProps = {
    tokenName: string;
    onClick: () => void;
}

const TokenButton = ({tokenName, onClick}: TokenButtonProps) => {
    return (
        <button
            onClick={onClick}
            className='cursor-pointer bg-blue-500 hover:bg-blue-600 text-white shadow-md inline-flex items-center justify-center rounded-md font-semibold transition-colors duration-200 px-4 py-2'>
            {tokenName}
        </button>
    )
};

export default TokenButton;