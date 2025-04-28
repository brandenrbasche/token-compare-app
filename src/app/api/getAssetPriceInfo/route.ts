import { NextRequest, NextResponse } from "next/server";
import { getAssetPriceInfo } from "@funkit/api-base";

const API_KEY: string = process.env.FUNKIT_API_KEY || '';

export async function GET(request: NextRequest) {
    try {
        const chainId: string = request.headers.get('chainId') || '';
        const assetTokenAddress: string = request.headers.get('assetTokenAddress') || '';

        const data = await getAssetPriceInfo({
            chainId,
            assetTokenAddress,
            apiKey: API_KEY
        });

        return NextResponse.json(data || { message: 'Data not found.' })

    } catch (err) {
        console.error('API Route Error: ', err);
        return NextResponse.json(
            { error: 'Internal Server Error', details: (err as Error).message },
            { status: 500 }
        )
    }
}