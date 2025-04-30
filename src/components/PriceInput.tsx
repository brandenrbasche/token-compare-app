'use client';
import { useRef, useState, useEffect } from 'react';
import { useSourceTargetDispatch, useSourceTargetState } from '@/context/SourceTargetContext';

const PriceInput = () => {
    const { priceUsdInput } = useSourceTargetState();
    const dispatch = useSourceTargetDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    const [localValue, setLocalValue] = useState(priceUsdInput);
    
    // Sync local state with context when priceUsdInput changes (e.g., on reset)
    useEffect(() => {
        setLocalValue(priceUsdInput);
    }, [priceUsdInput]);

    // Handle local state change without updating global context
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Validate input to prevent potential issues with invalid values
        const value = e.target.value;
        if (value === '' || !isNaN(parseFloat(value))) {
            setLocalValue(value);
        }
    };

    // Only update global state on form submission (Enter key)
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Validate before dispatching
        const trimmedValue = localValue.trim();
        if (trimmedValue === '' || !isNaN(parseFloat(trimmedValue))) {
            dispatch({
                type: 'SET_PRICE_USD_INPUT',
                payload: { value: trimmedValue }
            });
        }
    };

    return (
        <div className='p-4 flex items-center justify-center mb-4 border rounded-lg border-black/25'>
            <form onSubmit={handleSubmit}>
                <label htmlFor='priceInput' className='mr-[3px]'>Enter amount (USD): $</label>
                <input
                    className='h-full'
                    type='number'
                    id='priceInput'
                    placeholder='0.0'
                    value={localValue}
                    onChange={handleChange}
                    ref={inputRef}
                    required
                />
                <button
                    type="submit"
                    className='cursor-pointer inline-flex items-center justify-center rounded-md px-4 py-2 text-blue-500 hover:text-blue-700'
                >
                    Calculate (or press enter)
                </button>
            </form>
        </div>
    );
};

export default PriceInput;