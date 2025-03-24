import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    // Handle Email Login/Signup
    const handleEmailAuth = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please enter both email and password");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            if (isSignUp) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            navigate("/");
        } catch (err) {
            setError(getErrorMessage(err.code));
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Google Sign In
    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setError("");

        try {
            await signInWithPopup(auth, googleProvider);
            navigate("/");
        } catch (err) {
            if (err.code !== 'auth/popup-closed-by-user') {
                setError(getErrorMessage(err.code));
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Get user-friendly error messages
    const getErrorMessage = (code) => {
        switch (code) {
            case 'auth/user-not-found':
                return 'No account found with this email.';
            case 'auth/wrong-password':
                return 'Incorrect password.';
            case 'auth/invalid-email':
                return 'Invalid email address.';
            case 'auth/user-disabled':
                return 'This account has been disabled.';
            case 'auth/email-already-in-use':
                return 'An account with this email already exists.';
            case 'auth/weak-password':
                return 'Password should be at least 6 characters.';
            case 'auth/popup-blocked':
                return 'Sign-in popup was blocked. Please allow popups.';
            default:
                return 'An error occurred. Please try again.';
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#dfd86b] p-4">
            <div className="w-full max-w-6xl flex flex-col md:flex-row">
                {/* Left Side: Shoes Image */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
                    <img 
                        src="/image/shoes.png" 
                        alt="Shoes" 
                        width={500} 
                        height={500} 
                        className="object-cover w-full max-w-[300px] md:max-w-none" 
                    />
                </div>

                {/* Right Side: Login Form */}
                <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-center mb-4 md:mb-6">
                        {isSignUp ? "Create Account" : "Welcome Back"}
                    </h2>
                    
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center text-white bg-[#DB4437] py-2 px-4 rounded-lg hover:bg-[#c13122] disabled:bg-gray-400 mb-4"
                        disabled={isLoading}
                    >
                        <img src="/image/google.png" alt="Google" width={20} height={20} className="mr-2" />
                        {isLoading ? "Connecting..." : "Continue with Google"}
                    </button>

                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-gray-400"></div>
                        <span className="flex-shrink mx-4 text-gray-400">or</span>
                        <div className="flex-grow border-t border-gray-400"></div>
                    </div>

                    <form onSubmit={handleEmailAuth} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                placeholder={isSignUp ? "Create a password" : "Enter your password"}
                                required
                            />
                            {isSignUp && (
                                <p className="mt-1 text-sm text-gray-500">
                                    Must be at least 6 characters
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 disabled:bg-gray-400"
                        >
                            {isLoading ? (isSignUp ? "Creating Account..." : "Logging in...") : (isSignUp ? "Create Account" : "Login")}
                        </button>
                    </form>

                    <p className="text-center text-gray-600 mt-6">
                        {isSignUp ? "Already have an account?" : "Don't have an account?"}{' '}
                        <button
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-black font-medium hover:underline"
                        >
                            {isSignUp ? "Login here" : "Sign up here"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
