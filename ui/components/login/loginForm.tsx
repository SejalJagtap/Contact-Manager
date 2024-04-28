import { useState, FormEvent } from "react";
import { Button } from "../ui/button";

interface LoginFormProps {
    onSuccess: (accessToken: string) => void; // Update here
}

function LoginForm({ onSuccess }: LoginFormProps) {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('http://127.0.0.1:5001/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            console.log('Login successful:', data.accessToken);
            onSuccess(data.accessToken)
        } catch (error) {
            console.error('Failed to register:', error);
            setError('Failed to register. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <div className="mb-6">
                <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                    Username
                </label>
                <input
                    id="username"
                    required
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter username"
                />
            </div>

            <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                </label>
                <input
                    id="email"
                    required
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter email"
                />
            </div>

            <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                </label>
                <input
                    id="password"
                    required
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter password"
                />
            </div>

            {error && <p className="text-red-500 text-xs italic mb-6">{error}</p>}

            <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-400">
                {isLoading ? <span>Loading...</span> : <span>Login</span>}
            </Button>
        </form>
    );
}

export default LoginForm;
