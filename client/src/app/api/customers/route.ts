import { NextResponse } from 'next/server';
import { db } from '~/data/db';

export const GET = async (req: Request) => {
    try {
        const customers = await db.customer.findMany();
        return NextResponse.json(customers, { status: 200 });
    } catch (error) {
        console.error("GET /api/customers error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

export const POST = async (req: Request) => {
    try {
        const { email, fullname, duree } = await req.json();
        if (!email || !fullname || typeof duree !== 'number') {
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }
        const newCustomer = await db.customer.create({ data: { email, fullname, duree } });
        return NextResponse.json(newCustomer, { status: 201 });
    } catch (error) {
        console.error("POST /api/customers error:", error); // Ajout du log d'erreur
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