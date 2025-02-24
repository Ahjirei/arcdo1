import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Array of background images
    const bgImages = [
        '/public/bg.png',
        '/public/bg1.jpg',
        '/public/bg2.jpeg',
    ];

    // Select a random background image on each reload
    const randomBg = bgImages[Math.floor(Math.random() * bgImages.length)];

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSignInClick = () => {
        navigate("/login");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3001/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setMessage('A reset link has been sent to your email.');
                setIsSubmitted(true);
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Failed to send reset link. Please try again.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen w-full flex justify-center items-center bg-cover bg-center relative"
            style={{ backgroundImage: `url(${randomBg})` }}>
            {/* Background Blur Overlay for Mobile */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-md md:hidden" />

            {/* Forgot Password Form */}
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md relative z-10">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <h3 className="text-2xl font-semibold text-center mb-4">
                        Forgot Password
                    </h3>
                </div>
                <div className="p-9 md:p-10">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                                Enter email address
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                className="mt-1 p-2 w-full border-black rounded-md focus:ring-2 focus:ring-red-800 focus:outline-none"
                                placeholder="name@example.com"
                                required
                            />
                        </div>

                        {message && (
                            <div className="text-sm text-center mb-4 text-gray-700">
                                {message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading || isSubmitted}
                            className={`w-full px-4 py-2 rounded-lg font-medium text-white transition duration-300 
                                ${isLoading || isSubmitted ? 'bg-gray-400' : 'bg-[#800101] hover:bg-red-600'}
                                focus:outline-none focus:ring-4 focus:ring-red-400`}
                        >
                            {isSubmitted ? 'Check your Email' : isLoading ? 'Sending Verification...' : 'Send Verification'}
                        </button>

                        <div className="text-sm font-medium text-gray-700">
                            Already have an account?{' '}
                            <a href="#" className="text-red-500 font-semibold hover:underline" onClick={handleSignInClick}>
                                Sign In
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
