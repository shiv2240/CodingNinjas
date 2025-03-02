import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';

// Import Firebase Database
import { getDatabase, ref, set } from 'firebase/database';

const Login = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();
    const { login, googleSignIn } = useAuth();

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password) {
            toast.error("Please enter your name, email, and password to login");
            return;
        }

        try {
            const userCredential = await login(formData.email, formData.password);
            const user = userCredential.user;

            // Store the name & email in Firebase Realtime Database
            const db = getDatabase();
            await set(ref(db, `users/${user.uid}/profile`), {
                name: formData.name,
                email: formData.email
            });

            toast.success('Logged in Successfully!');
            navigate('/');
        } catch (err) {
            toast.error(err.message);
        }
    }
    

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            toast.success("Successfully logged in with Google!");
            navigate("/");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className='w-full h-screen flex flex-col md:flex-row'>
            <Toaster />

            {/* Left Section (Video & Branding) */}
            <div className='w-full sm:w-1/4 md:w-1/2 h-screen relative flex items-center justify-center bg-black'>
                <video autoPlay loop muted playsInline className='w-full h-full object-cover'>
                    <source src='/videos/ekatha.mp4' type='video/mp4' />
                    Your browser does not support the video tag.
                </video>

                <div className="absolute inset-0 bg-black/50"></div>

                <div className="absolute top-5 left-5 flex items-center cursor-pointer" onClick={() => navigate('/')}>
                    <img src='/logo.svg' alt='Logo' className='w-10 h-10 object-contain' />
                    <span className='text-white text-2xl font-semibold ml-3'>KathaVachan</span>
                </div>

                {/* Hide text on small screens */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute text-center text-white px-8 hidden sm:block"
                >
                    <h2 className="text-4xl font-extrabold bg-gradient-to-r from-sky-400 to-blue-600 text-transparent bg-clip-text">
                        🚀 AI-Driven Business Transformation
                    </h2>
                    <p className="text-lg mt-4">
                        Automate. Simplify. Innovate. Let AI handle the paperwork while you focus on growth.
                    </p>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-lg mt-2 font-medium text-gray-300"
                    >
                        Your **business voice assistant** for seamless **data collection & eKatha creation**.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="text-lg mt-2 text-gray-400 italic"
                    >
                        "Efficiency is not an option—it's the new standard." ✨
                    </motion.p>
                </motion.div>
            </div>

            {/* Right Section (Login Form) */}
            <div className='w-full md:w-1/2 h-screen flex items-center justify-center bg-gray-900 px-6'>
                <motion.form
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    onSubmit={handleSubmit}
                    className='w-full max-w-sm glass border border-gray-200 shadow-xl shadow-blue-500/30 p-8 rounded-2xl'
                >
                    <h1 className='text-3xl text-white font-medium mb-8 py-4 text-center'>
                        𝖂𝖊𝖑𝖈𝖔𝖒𝖊 𝖙𝖔 <span className="bg-gradient-to-r from-blue-400 to-sky-500 text-transparent bg-clip-text text-4xl">𝖑𝖔𝖌𝖎𝖓</span> ✍
                    </h1>

                    {/* Name Input */}
                    <label className='text-gray-300'>Name</label>
                    <input
                        className='border border-gray-300 px-2 text-black bg-gray-100 py-1.5 rounded my-2 mb-4 w-full'
                        type='text'
                        placeholder='Enter Your Name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                    />

                    {/* Email Input */}
                    <label className='text-gray-300'>Email</label>
                    <input
                        className='border border-gray-300 px-2 text-black bg-gray-100 py-1.5 rounded my-2 mb-4 w-full'
                        type='text'
                        placeholder='Enter Your Email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                    />

                    {/* Password Input */}
                    <label className='text-gray-300'>Password</label>
                    <input
                        className='border border-gray-300 text-black rounded my-2 bg-gray-100 px-2 py-1.5 w-full'
                        type='password'
                        placeholder='Enter Your password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <p className='text-sm text-gray-300 mt-2 mb-2'>
                        Don't have an account?
                        <span
                            className='text-sky-400 ml-1 cursor-pointer font-medium hover:text-sky-800'
                            onClick={() => navigate("/signup")}
                        > Sign Up</span>
                    </p>

                    <motion.button
                        type='submit'
                        whileHover={{ scale: 1.05 }}
                        className='px-4 py-2 w-full border bg-sky-500 text-white rounded-xl mt-4 text-xl cursor-pointer hover:bg-blue-600 transition duration-300'>
                        Login 🛡️
                    </motion.button>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-gray-900 rounded-lg text-gray-200">Or continue with</span>
                            </div>
                        </div>
                        <button
                            onClick={handleGoogleSignIn}
                            className="w-full mt-4 py-2 px-4 bg-white text-gray-700 border border-gray-300 rounded-md shadow-md flex items-center justify-center gap-2 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        >
                            <FcGoogle className="text-xl" />
                            <span>Sign in with Google</span>
                        </button>
                    </div>
                </motion.form>
            </div>
        </div>
    );
}

export default Login;
