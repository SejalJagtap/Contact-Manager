'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "@/components/ui/NavBar";
import ContactList from "@/components/contacts/ContactList";

export default function Contacts() {
  const router = useRouter();

  useEffect(() => {

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {

      router.push('/login');
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center ">
      <Navbar />
      <ContactList />
    </main>
  );
}
