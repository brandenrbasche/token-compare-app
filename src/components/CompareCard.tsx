import {Token} from "@/types/tokenTypes";

interface CompareCardProps {
    type: 'Source' | 'Target';
    token: Token;
}

const CompareCard = ({ type, token }: CompareCardProps) => {
    return (
        <div className='w-full h-full flex flex-col items-center justify-center border rounded-lg'>
            <p className='text-center'>Selected { type }:</p>
            <h2 className='text-xl font-bold'>{token?.tokenName}</h2>

        </div>
    )
}

export default CompareCard;