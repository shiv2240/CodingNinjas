import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { motion } from 'framer-motion';

const Signup = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const { signup } = useAuth();

    function handleChange(e) {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (formData.password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (!formData.email || !formData.password) {
            toast.error("Please enter your email and password to sign up");
            return;
        }

        try {
            await signup(formData.email, formData.password);
            toast.success('Sign up Successfully!');
            setFormData({ email: "", password: "" });
            navigate("/login");
        } catch (err) {
            toast.error(err.message);
        }
    }

    return (
        <div className='w-full h-screen flex flex-col md:flex-row'>
            <Toaster />

            {/* Left Side: Video with Motivational Overlay */}
            <div className='w-full sm:w-1/4 md:w-1/2 h-screen relative flex items-center justify-center bg-black'>
                <video autoPlay loop muted playsInline className='w-full h-full object-cover'>
                    <source src='/videos/ekatha.mp4' type='video/mp4' />
                    Your browser does not support the video tag.
                </video>

                <div className="absolute inset-0 bg-black/50"></div>

                <div className="absolute top-5 left-5 flex items-center cursor-pointer" onClick={()=> navigate('/')}>
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



            <div className='w-full md:w-1/2 h-screen flex items-center justify-center bg-gray-900 px-6'>
                <motion.form
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    onSubmit={handleSubmit}
                    className='w-full max-w-sm glass border border-gray-200 shadow-xl shadow-purple-500/30 p-8 rounded-2xl'>

                    <h1 className='text-3xl text-white font-medium mb-8 py-4 text-center'>
                        𝖂𝖊𝖑𝖈𝖔𝖒𝖊 𝖙𝖔 <span className="bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text text-4xl">𝕾𝖎𝖌𝖓𝖚𝖕</span> ✍
                    </h1>

                    <label className='text-gray-300'>Email</label>
                    <input
                        className='border border-gray-300 px-2 text-black bg-gray-100 py-1.5 rounded my-2 mb-4 w-full'
                        type='email'
                        placeholder='Enter Your Email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <label className='text-gray-300'>Password</label>
                    <input
                        className='border border-gray-300 text-black rounded my-2 bg-gray-100 px-2 py-1.5 w-full'
                        type='password'
                        placeholder='Enter Your password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <label className='text-gray-300'>Confirm Password</label>
                    <input
                        className='border border-gray-300 text-black rounded my-2 bg-gray-100 px-2 py-1.5 w-full'
                        type='password'
                        placeholder='Confirm Your password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <p className='text-sm text-gray-300 mt-2 mb-2'>
                        Already have an account?
                        <span
                            className='text-purple-400 ml-1 cursor-pointer font-medium hover:text-purple-800'
                            onClick={() => navigate("/login")}
                        > Login</span>
                    </p>

                    <motion.button
                        type='submit'
                        whileHover={{ scale: 1.05 }}
                        className='px-4 py-2 w-full border bg-purple-500 text-white rounded-xl mt-4 text-xl cursor-pointer hover:bg-purple-600 transition duration-300'>
                        Sign up 🔐
                    </motion.button>
                </motion.form>
            </div>
        </div>
    );
}

export default Signup;
