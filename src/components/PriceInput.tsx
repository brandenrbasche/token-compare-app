'use client';

const PriceInput = () => {

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('submitted', event.target[0].value);
    }

    return (
        <div className='px-4 flex items-center justify-center mb-4 border rounded-lg border-black/25'>
            <form onSubmit={handleSubmit}>
                <label htmlFor='priceInput' className='mr-[3px]'>Enter amount (USD): $</label>
                <input
                    className='h-full'
                    type='number'
                    id='priceInput'
                    placeholder='0.0'
                    required
                />
                <button
                    className='cursor-pointer inline-flex items-center justify-center rounded-md px-4 py-2 underline'
                >Calculate (press enter)
                </button>
            </form>
        </div>
    )
}

export default PriceInput;