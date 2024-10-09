import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
    console.log("get request");
    return NextResponse.json({ message: "Request successful" });
};
