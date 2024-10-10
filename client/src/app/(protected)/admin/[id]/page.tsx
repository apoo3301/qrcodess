"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "~/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "~/components/ui/dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "~/components/ui/dropdown-menu";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { FilePenIcon, ChevronDownIcon, TrashIcon } from "lucide-react";
import { useToast } from "~/hooks/use-toast";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function CustomerDetailPage({ params }: { params: any }) {
    const { id } = params;
    const { toast } = useToast();
    const router = useRouter();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
    const [customerData, setCustomerData] = useState({
        id: '',
        email: '',
        fullName: '',
        duration: '',
        createdAt: '',
    });

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await fetch(`/api/customers/${id}`);
                if (!response.ok) throw new Error('Failed to fetch customer');
                const data = await response.json();
                setCustomerData({
                    id: data.id,
                    email: data.email,
                    fullName: data.fullname,
                    duration: data.duree.toString(),
                    createdAt: data.createdAt,
                });
            } catch (error) {
                if (error instanceof Error) {
                    toast({ description: `Failed to load customer: ${error.message}`, variant: 'destructive' });
                } else {
                    toast({ description: 'Failed to load customer', variant: 'destructive' });
                }
                router.push('/admin');
            }
        };
        fetchCustomer();
    }, [id, router, toast]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/customers`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: customerData.id }),
            });
            if (!response.ok) throw new Error('Failed to delete customer');
            toast({ description: 'Customer deleted successfully.', variant: 'default' });
            router.push('/admin');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            toast({ description: `Failed to delete customer: ${errorMessage}`, variant: 'destructive' });
        }
    };

    const handleSaveCustomer = async () => {
        try {
            const response = await fetch(`/api/customers`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: customerData.id,
                    email: customerData.email,
                    fullname: customerData.fullName,
                    duree: parseFloat(customerData.duration),
                }),
            });
            if (!response.ok) throw new Error('Failed to update customer');
            toast({ description: 'Customer updated successfully.', variant: 'default' });
            setIsEditModalOpen(false);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            toast({ description: `Failed to update customer: ${errorMessage}`, variant: 'destructive' });
        }
    };
    

    const handleEditCustomer = () => {
        setIsEditModalOpen(true);
    };

    const send = async () => {
        if (customerData.email) {
            try {
                await fetch('/api/send-pass', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: customerData.email }),
                });
                toast({ description: 'Your message has been sent.', variant: 'default', title: 'Email sent' });
            } catch (error) {
                toast({ variant: 'destructive', title: 'Uh oh! Something went wrong.', description: 'There was a problem with your request.' });
            }
        } else {
            console.error('No email available');
        }
    };

    return (
        <div className="grid gap-6 md:grid-cols-[1fr_300px] max-w-6xl mx-auto px-4 py-8 md:px-6">
            <Card className="col-span-1">
                <CardHeader>
                    <CardTitle>{customerData.fullName}</CardTitle>
                    <Separator />
                </CardHeader>
                <CardContent>
                    <Label>Email</Label>
                    <Input value={customerData.email} readOnly />
                    <Label>Duration</Label>
                    <Input value={customerData.duration} readOnly />
                    <Label>Created At</Label>
                    <Input value={customerData.createdAt} readOnly />
                </CardContent>
            </Card>

            <div className="flex flex-col gap-4">
                <Button onClick={handleEditCustomer} variant="outline">
                    <FilePenIcon className="mr-2 h-4 w-4" /> Edit Customer
                </Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                            <TrashIcon className="mr-2 h-4 w-4" /> Delete Customer
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the customer.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            Send QR Code <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setIsEmailDialogOpen(true)}>
                            {customerData.email}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Customer</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        <Label>Name</Label>
                        <Input
                            value={customerData.fullName}
                            onChange={(e) => setCustomerData({ ...customerData, fullName: e.target.value })}
                        />
                        <Label>Email</Label>
                        <Input
                            value={customerData.email}
                            onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                        />
                        <Label>Duration</Label>
                        <Input
                            value={customerData.duration}
                            onChange={(e) => setCustomerData({ ...customerData, duration: e.target.value })}
                        />
                    </DialogDescription>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveCustomer}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Send Password</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        <p>Are you sure you want to send the password to <strong>{customerData.email}</strong>?</p>
                    </DialogDescription>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEmailDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={send}>Send</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
