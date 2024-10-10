'use client';

import { Alert, AlertDescription } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { createCustomer } from "~/actions/create-customer";
import { Anchor } from "lucide-react";
import { useState } from 'react';

export default function IgyMarinaEmailInputPage() {
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === '' || fullname.trim() === '') {
      setMessage('Please enter a valid email address and full name.');
    } else {
      try {
        await createCustomer(email, fullname, 7);
        setMessage(`Thank you! The email ${email} and full name ${fullname} have been submitted.`);
      } catch (error) {
        setMessage('There was an error submitting your information. Please try again.');
      }
      setEmail('');
      setFullname('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md p-6 sm:p-8 space-y-6 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <Anchor className="h-12 w-12 text-blue-600 mx-auto" />
          <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-black">IGY MARINAS Email Signup</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-black">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fullname" className="text-black">Full Name</Label>
            <Input
              id="fullname"
              type="text"
              placeholder="Enter your full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full">Submit</Button>
        </form>
        {message && (
          <Alert>
            <AlertDescription className="text-black">{message}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}