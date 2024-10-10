"use server"

import { db } from "~/data/db";

export async function createCustomer(email: string, fullname: string, duree: number) {
  try {
    const newCustomer = await db.customer.create({
      data: {
        email,
        fullname,
        duree,
      },
    });
    console.log('Customer created successfully:', newCustomer);
    return newCustomer;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw new Error('Failed to create customer');
  }
}
