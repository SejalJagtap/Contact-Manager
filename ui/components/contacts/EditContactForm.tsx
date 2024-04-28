import React, { useState } from 'react';

import {
    Button
} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import {
    Input
} from "@/components/ui/input"
import {
    Label
} from "@/components/ui/label"
import { AiFillEdit } from 'react-icons/ai';

interface ContactFormProps {
    onEditContact: () => void;
    name: string;
    phone: string;
    email: string;
    _id: string;
}

export function EditContactForm({ onEditContact, name: initialName, phone: initialPhone, email: initialEmail, _id: _id }: ContactFormProps) {
    const [name, setName] = useState(initialName);
    const [phone, setPhone] = useState(initialPhone);
    const [email, setEmail] = useState(initialEmail);

    const handleEditContact = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                throw new Error("Invalid access");
            }

            const response = await fetch(`http://127.0.0.1:5001/api/contacts/${_id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    phone,
                    email
                })
            });

            if (!response.ok) {
                throw new Error('Failed to edit contact');
            }

            onEditContact();
        } catch (error) {
            console.error('Error editing contact:', error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <AiFillEdit />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Contact</DialogTitle>
                    <DialogDescription>
                        Edit contact details.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-right">
                            Mobile No.
                        </Label>
                        <Input
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>

                    <Button type="submit" className="bg-blue-500 hover:bg-blue-400" onClick={handleEditContact}>Save</Button>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
