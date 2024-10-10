import { NextResponse } from 'next/server';
import { db } from '~/data/db';

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    try {
        const customers = await db.customer.findMany({
            skip,
            take: limit,
        });
        const totalCustomers = await db.customer.count();
        return NextResponse.json({
            customers,
            currentPage: page,
            totalPages: Math.ceil(totalCustomers / limit),
        }, { status: 200 });
    } catch (error) {
        console.error("GET /api/customers error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

export const POST = async (req: Request) => {
    try {
        const { email, fullname, duree } = await req.json();

        // Validate input
        if (!email || !fullname || typeof duree !== 'number') {
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }

        const existingCustomer = await db.customer.findFirst({
            where: {
                OR: [
                    { email },
                    { fullname }
                ]
            }
        });

        if (existingCustomer) {
            return NextResponse.json({ error: "Customer with the same email or fullname already exists" }, { status: 409 });
        }

        const newCustomer = await db.customer.create({ data: { email, fullname, duree } });
        return NextResponse.json(newCustomer, { status: 201 });

    } catch (error) {
        console.error("POST /api/customers error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};


export const DELETE = async (req: Request) => {
    try {
        const { id } = await req.json();
        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }
        const deletedCustomer = await db.customer.delete({ where: { id } });
        return NextResponse.json(deletedCustomer, { status: 200 });
    } catch (error) {
        console.error("DELETE /api/customers error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

export const PUT = async (req: Request) => {
    try {
        const { id, email, fullname, duree } = await req.json();
        if (!id || !email || !fullname || typeof duree !== 'number') {
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }
        const updatedCustomer = await db.customer.update({
            where: { id },
            data: { email, fullname, duree },
        });
        return NextResponse.json(updatedCustomer, { status: 200 });
    } catch (error) {
        console.error("PUT /api/customers error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};