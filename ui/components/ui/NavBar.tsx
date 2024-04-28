import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png"
import { Button } from "./button";
import { useRouter } from "next/navigation";
const Navbar = () => {
    const router = useRouter();
    const handleLogout = () => {
        localStorage.removeItem('accessToken');

        router.push('/login');
    }
    return (
        <nav className="bg-blue-500 p-4  w-full sticky top-0 mb-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <Link href="/"
                        className="flex-shrink-0">
                        <Image src={logo} alt="Logo" width={40} height={40} />

                    </Link>
                    <div className="ml-4 text-white font-semibold">My Contact Manager</div>
                </div>
                <div>
                    <Button className="bg-gradient-to-r from-purple-200 via-white to-sky-200 text-blue-600" onClick={handleLogout}>Logout</Button>
                </div>
                {/* <div>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/" className="text-white hover:text-gray-200">Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/about"
                                className="text-white hover:text-gray-200">About
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact"
                                className="text-white hover:text-gray-200">Contact
                            </Link>
                        </li>
                    </ul>
                </div> */}
            </div>
        </nav>
    );
};

export default Navbar;
