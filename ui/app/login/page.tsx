'use client'
import LoginForm from "@/components/login/loginForm";
import { useRouter } from "next/navigation";
import Image from "next/image";
import contactBg from "@/public/Contact.jpg";
import Link from "next/link";
export default function Login() {
    const router = useRouter();

    const handleLoginSuccess = (accessToken: string) => {
        localStorage.setItem("accessToken", accessToken);
        router.push('/');
    };

    return (
        <main className="min-h-screen">
            <div className="grid grid-cols-12 bg-gradient-to-r from-purple-200 via-white to-sky-200 min-h-screen">
                <div className="col-span-5 flex justify-center items-center">
                    <Image src={contactBg} alt="Background" objectFit="cover" />
                </div>

                <div className="col-span-7 flex justify-center items-center">
                    <div className="w-full max-w-lg bg-opacity-80 p-10 rounded-lg border border-gray-300  shadow-md">
                        <h1 className="text-4xl font-bold mb-4 text-blue-500  text-center">Login to your account</h1>
                        <LoginForm onSuccess={handleLoginSuccess} />
                        <div className="mt-4 text-center">
                            <p>Not yet registered? <Link href="/register" className="text-blue-600">Register here</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
