import React from 'react';
import { FaUserPlus, FaCalendarCheck, FaChartLine, FaMobileAlt, FaCalendarAlt, FaRegChartBar } from 'react-icons/fa';

import websiteImg from '../assets/howtouse-web.jpg';
import mobileImg from '../assets/howtouse-mobile.jpg';

const steps = [
    { title: 'Registration', description: 'Visit our homepage and click on "Member Area" to create your account. Fill out the required information to get started.', icon: <FaUserPlus /> },
    { title: 'Booking Lessons', description: 'Log in to your account and navigate to the "Book Lessons" section. Choose your preferred lesson type, date, and instructor.', icon: <FaCalendarCheck /> },
    { title: 'Tracking Your Progress', description: 'Access your personal dashboard to view your lesson history, upcoming appointments, and progress reports.', icon: <FaChartLine /> },
];

const mobileSteps = [
    { title: 'Download and Install', description: 'Download our app from the Apple App Store or Google Play. Sign in or register a new account.', icon: <FaMobileAlt /> },
    { title: 'Scheduling and Managing Lessons', description: 'Use the app to easily schedule lessons, view your calendar, and receive notifications about your bookings.', icon: <FaCalendarAlt /> },
    { title: 'Tracking and Feedback', description: 'Stay updated on your progress, receive lesson feedback from instructors, and track completion milestones.', icon: <FaRegChartBar /> },
];

export default function HowToUse() {
    return (
        <div className="HowToUse py-10">
            <div className="text">
                <h2 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold text-blue-600 mb-12 text-center">How To Use</h2>
            </div>
            <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">

                {/* Website Steps Section */}
                <div className="mt-8 mb-4 lg:flex lg:items-center lg:space-x-8">
                    <div className="lg:w-1/2">
                        <h3 className="text-xl font-bold text-blue-600 mb-4">Website Steps</h3>
                        {steps.map((step, index) => (
                            <div className="flex" key={index}>
                                <div className="flex flex-col items-center mr-4">
                                    <div className="flex items-center justify-center w-10 h-10 border rounded-full text-blue-600 text-2xl">
                                        {step.icon}
                                    </div>
                                    {index < steps.length - 1 && <div className="w-px h-full bg-gray-300"></div>}
                                </div>
                                <div className="pt-1 pb-8">
                                    <p className="mb-2 text-lg font-bold">Step {index + 1}: {step.title}</p>
                                    <p className="text-gray-700">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:w-1/2 lg:flex lg:justify-center  mt-8 lg:mt-0">
                        <img
                            src={websiteImg.src}
                            alt="Website Usage"
                            className="w-full h-auto max-w-sm rounded shadow-lg"
                        />
                    </div>
                </div>

                {/* Mobile Steps Section */}
                <div className="mt-16 mb-4 lg:flex lg: lg:items-center lg:space-x-8">
                    <div className="lg:w-1/2">
                        <h3 className="text-xl font-bold text-blue-600 mb-4">Mobile App Steps</h3>
                        {mobileSteps.map((step, index) => (
                            <div className="flex" key={index}>
                                <div className="flex flex-col items-center mr-4">
                                    <div className="flex items-center justify-center w-10 h-10 border rounded-full text-blue-600 text-2xl">
                                        {step.icon}
                                    </div>
                                    {index < mobileSteps.length - 1 && <div className="w-px h-full bg-gray-300"></div>}
                                </div>
                                <div className="pt-1 pb-8">
                                    <p className="mb-2 text-lg font-bold">Step {index + 1 }: {step.title}</p>
                                    <p className="text-gray-700">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:w-1/2 lg:flex lg:justify-center mt-8 lg:mt-0">
                        <img
                            src={mobileImg.src}
                            alt="Mobile App Usage"
                            className="w-full h-auto max-w-sm rounded shadow-lg"
                        />
                    </div>
                </div>

                {/* Success Section */}
                <div className="flex mt-16">
                    <div className="flex flex-col items-center mr-4">
                        <div className="flex items-center justify-center w-10 h-10 border rounded-full text-blue-600 text-2xl">
                            <svg className="w-6 text-gray-600" stroke="currentColor" viewBox="0 0 24 24">
                                <polyline fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="6,12 10,16 18,8"></polyline>
                            </svg>
                        </div>
                    </div>
                    <div className="pt-1">
                        <p className="mb-2 text-lg font-bold">Success</p>
                        <p className="text-gray-700">Congratulations, you've completed all steps successfully!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
