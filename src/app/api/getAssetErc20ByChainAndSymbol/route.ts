import {NextRequest, NextResponse} from "next/server";
import {getAssetErc20ByChainAndSymbol } from "@funkit/api-base";

const API_KEY = process.env.FUNKIT_API_KEY || '';

export async function GET(request: NextRequest) {
    try {
        const chainId: string = request.headers.get('chainId') || '';
        const symbol: string = request.headers.get('symbol') || '';

        console.log('logging headers on server: ', chainId, symbol);

        const data = await getAssetErc20ByChainAndSymbol({
                chainId: chainId,
                symbol: symbol,
                apiKey: API_KEY
            }
        );

        return NextResponse.json(data || { message: 'Data not found.' })
    } catch (err) {
        console.error('API Route Error: ', err);
        return NextResponse.json(
            { error: 'Internal Server Error', details: (err as Error).message },
            { status: 500 }
        )
    }
}