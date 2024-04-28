import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface ContactFormProps {
    onAddContact: () => void;
}

export function ContactForm({ onAddContact }: ContactFormProps) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");
    const { toast } = useToast();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    const validateForm = () => {
        let valid = true;
        if (!emailRegex.test(email)) {
            setEmailError("Invalid email format");
            valid = false;
        } else {
            setEmailError("");
        }

        if (!phoneRegex.test(phone)) {
            setPhoneError("Invalid phone format");
            valid = false;
        } else {
            setPhoneError("");
        }

        return valid;
    };

    const handleAddContact = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                throw new Error("Invalid access");
            }

            const response = await fetch('http://127.0.0.1:5001/api/contacts', {
                method: 'POST',
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
                throw new Error('Failed to add contact');
            }

            // Clear input fields
            setName("");
            setPhone("");
            setEmail("");

            // Show success toast
            toast({
                title: "Contact Added",
                description: "The contact has been successfully added.",
                duration: 5000,
            });

            // Call the callback function to inform parent component
            onAddContact();

        } catch (error) {
            console.error('Error adding contact:', error);
            // Show error toast
            toast({
                title: "Failed to add contact",
                description: "An error occurred while trying to add the contact.",
                duration: 5000,
            });
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-blue-500 hover:bg-blue-400">+ Create New Contact</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Contact</DialogTitle>
                    <DialogDescription>
                        Add contact to your contact list.
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
                        {phoneError && <p className="col-span-4 text-red-500 text-sm">{phoneError}</p>}
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
                        {emailError && <p className="col-span-4 text-red-500 text-sm">{emailError}</p>}
                    </div>
                </div>
                <DialogFooter>

                    <Button type="button" className="bg-blue-500 hover:bg-blue-400" onClick={handleAddContact}>Add</Button>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
