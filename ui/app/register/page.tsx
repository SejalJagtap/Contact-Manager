'use client'
import RegisterForm from "@/components/register/registerForm";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link"; // Import Link from Next.js

import contactBg from "@/public/Contact.jpg";

export default function Register() {
    const router = useRouter();

    const handleRegistrationSuccess = () => {
        router.push('/login');
    };

    return (
        <main className="min-h-screen">
            <div className="grid grid-cols-12 bg-gradient-to-r from-purple-200 via-white to-sky-200 min-h-screen">
                <div className="col-span-5 flex justify-center items-center">
                    <Image src={contactBg} alt="Background" objectFit="cover" />
                </div>

                <div className="col-span-7 flex justify-center items-center">
                    <div className="w-full max-w-lg bg-opacity-80 p-10 rounded-lg border border-gray-300 shadow-md">
                        <h1 className="text-4xl font-bold mb-4 text-blue-500 text-center">Create your account</h1>
                        <RegisterForm onSuccess={handleRegistrationSuccess} />
                        <div className="mt-4 text-center">
                            <p>Already registered? <Link href="/login" className="text-blue-600">Log in here</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
