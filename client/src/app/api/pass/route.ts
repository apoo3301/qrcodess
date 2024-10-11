import { welcomeTemplate } from '~/lib/template/badge';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fetch from 'node-fetch';

export const POST = async (req: Request) => {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const imageUrl = 'https://qrcodess-rho.vercel.app/badge.png';
        const response = await fetch(imageUrl);
        const imageBuffer = await response.arrayBuffer();
        const imageBase64 = Buffer.from(imageBuffer).toString('base64');

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: '"QR PASS" <noreply@example.com>',
            to: email,
            subject: 'Your QR Code',
            html: welcomeTemplate,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};
