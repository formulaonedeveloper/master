"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ImgSignUp from '@/app/assets/signUp.jpg';
import toast from 'react-hot-toast';
import { Register } from '@/app/services/authService';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const phone = e.target.phone.value;

        if (!firstName || !lastName || !email || !password || !phone) {
            setError('All fields are required.');
            toast.error('All fields are required.');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError('Please enter a valid email address.');
            toast.error('Please enter a valid email address.');
            return;
        }

        const phonePattern = /^\d{11}$/;
        if (!phonePattern.test(phone)) {
            setError('Please enter a valid phone number (10 digits).');
            toast.error('Please enter a valid phone number (10 digits).');
            return;
        }

        try {
            await Register(email, password, {
                first_name: firstName || '',
                last_name: lastName || '',
                middle_name: '',
                third_name: '',
                date: '',
                password: password,
                address: '',
                gender: '',
                language: '',
                phone: phone || '',
                license_info: '',
            });

            toast.success("User registered successfully");
            router.push('/');

            if (typeof window !== "undefined") {
                localStorage.setItem('typeUser', 'user');
            }

        } catch (error) {
            console.error("Error adding user:", error);
            toast.error(error.message);
        }

        setError('');
    }

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div className="flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
                        <div className="w-full flex-1 mt-8">
                            <div className="mx-auto max-w-xs">
                                <form className='mt-12' onSubmit={handleSubmit}>
                                    <input
                                        className="w-full px-8 py-4 mb-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                    />
                                    <input
                                        className="w-full px-8 py-4 mb-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                    />
                                    <input
                                        className="w-full px-8 py-4 mb-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                    />
                                    <input
                                        className="w-full px-8 py-4 mb-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="text"
                                        name="phone"
                                        placeholder="Phone Number"
                                    />
                                    <input
                                        className="w-full px-8 py-4 mb-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="Password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-sm text-gray-500 mt-1"
                                    >
                                        {showPassword ? 'Hide Password' : 'Show Password'}
                                    </button>
                                    <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                        <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="8.5" cy="7" r="4" />
                                            <path d="M20 8v6M23 11h-6" />
                                        </svg>
                                        <span className="ml-3">Sign Up</span>
                                    </button>
                                    <p className="mt-6 text-xs text-gray-600 text-center">
                                        I agree to abide by templatana's
                                        <a href="#" className="border-b border-gray-500 border-dotted"> Terms of Service </a>
                                        and its
                                        <a href="#" className="border-b border-gray-500 border-dotted"> Privacy Policy </a>
                                    </p>
                                    <p className="mt-8 text-md text-gray-600 text-center">
                                        Already have an account?
                                        <Link href="/login" className="border-b border-gray-500 border-dotted"> Sign in </Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div className="flex items-center justify-center h-full w-full">
                        <Image
                            src={ImgSignUp}
                            width={500}
                            height={500}
                            className="object-cover w-full h-full rounded-lg"
                            alt="Background"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
