import { NextRequest, NextResponse } from "next/server";
import { db } from "~/data/db";

export async function GET(req: NextRequest, { params }: { params: { id: string }}) {
    const { id } = params;
    try {
        const customer = await db.customer.findUnique({ where: { id } });
        if (!customer) {
            return NextResponse.json({ error: "Customer not found" }, { status: 404 });
        }
        return NextResponse.json(customer, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}