import React, { useEffect, useState } from 'react';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

// import { Button } from '../ui/button';
import { ContactForm } from './ContactForm';
import { AiFillDelete } from 'react-icons/ai';
import { EditContactForm } from './EditContactForm';

interface Contact {
    _id: string;
    name: string;
    phone: string;
    email: string;
}

const ContactList: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                throw new Error('Access token not found');
            }

            const response = await fetch("http://127.0.0.1:5001/api/contacts/", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch contacts");
            }

            const data = await response.json();
            setContacts(data);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    const handleDeleteContact = async (_id: string) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                throw new Error('Access token not found');
            }

            const response = await fetch(`http://127.0.0.1:5001/api/contacts/${_id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                throw new Error("Failed to delete contact");
            }

            fetchContacts();
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    const refreshContactList = () => {
        fetchContacts();
    };

    return (
        <>
            <div className='flex justify-end mt-4'>
                <ContactForm onAddContact={refreshContactList}></ContactForm>
            </div>
            {contacts.length === 0 ? (
                <div className='text-center m-auto'>There are no contacts available.</div>
            ) : (
                <div className='w-[80%] m-auto border mt-4'>
                    <Table >
                        <TableCaption>A list of your contacts.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Mobile no.</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Edit</TableHead>
                                <TableHead>Delete</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {contacts.map((contact, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{contact.name}</TableCell>
                                    <TableCell>{contact.phone}</TableCell>
                                    <TableCell>{contact.email}</TableCell>
                                    <TableCell>

                                        <EditContactForm
                                            onEditContact={refreshContactList}
                                            name={contact.name}
                                            phone={contact.phone}
                                            email={contact.email}
                                            _id={contact._id}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <button onClick={() => handleDeleteContact(contact._id)}>
                                            <AiFillDelete />
                                        </button>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </>
    );
}

export default ContactList;
