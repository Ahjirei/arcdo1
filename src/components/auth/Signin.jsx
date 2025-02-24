import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Eye, EyeOff, CircleAlert } from 'lucide-react';

export default function Signin() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    // Array of background images
    const bgImages = [
        '/public/bg.png',
        '/public/bg1.jpg',
        '/public/bg2.jpeg',
    ];

    // Select a random background image on each reload
    const randomBg = bgImages[Math.floor(Math.random() * bgImages.length)];

    useEffect(() => {
        const savedEmail = localStorage.getItem('savedEmail');
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const password = e.target.password.value;

        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Login failed: ${errorMessage}`);
            }

            const data = await response.json();
            if (data.refresh_token) {
                localStorage.setItem('token', data.refresh_token);
                localStorage.setItem('user_id', data.id);
                localStorage.setItem('role', data.role);

                if (rememberMe) {
                    localStorage.setItem('savedEmail', email);
                } else {
                    localStorage.removeItem('savedEmail');
                }

                navigate('/overview');
            } else {
                setError("Something went wrong. No token received.");
            }
        } catch (error) {
            setError(error.message);
            setTimeout(() => setError(''), 2000);
        }
    };

    return (
        <div className="h-screen w-full flex justify-end items-center bg-cover bg-center relative 
            before:absolute before:inset-0 before:bg-black/30 before:backdrop-blur-md md:before:hidden" 
            style={{ backgroundImage: `url(${randomBg})` }}>
            
            {/* Background Blur Overlay for Login Side (Desktop) */}
            <div className="hidden md:block absolute right-0 top-0 bottom-0 w-1/3 bg-black/30 backdrop-blur-md" />
            
            {/* Login Form */}
            <div className="w-full md:w-1/3 lg:w-1/4 bg-white p-6 shadow-lg relative z-10 m-4 rounded-xl">
                <h2 className="text-2xl font-bold text-center">Login to <span className="text-red-600">ARCDO Dashboard</span></h2>
                <p className="text-center text-gray-600 mb-4">Please enter your email and password to continue</p>
                {error && (
                    <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
                        <CircleAlert className="w-5 h-5 mr-2 text-red-700" />
                        <span>{error}</span>
                    </div>
                )}
                <form className="space-y-4" onSubmit={handleFormSubmit}>
                    <div>
                        <label className="block text-sm font-medium">Your email</label>
                        <input type="email" name="email" className="w-full mt-1 p-2 border rounded-md" placeholder="name@gmail.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Your password</label>
                        <div className="relative">
                            <input type={passwordVisible ? 'text' : 'password'} name="password" className="w-full mt-1 p-2 border rounded-md" placeholder="••••••••" required />
                            <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute inset-y-0 right-3 flex items-center text-gray-600">
                                {passwordVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <div>
                            <input type="checkbox" id="remember" className="mr-2" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <button type="button" className="text-red-500 hover:underline" onClick={() => navigate('/forgotPassword')}>Forgot Password?</button>
                    </div>
                    <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md">Sign In</button>
                    <p className="text-center text-sm mt-2">
                        Don't have an account? <button type="button" className="text-red-500 hover:underline" onClick={() => navigate('/signUp')}>Sign Up</button>
                    </p>
                </form>
            </div>
        </div>
    );
}
