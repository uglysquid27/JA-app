import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import DefaultNavbar from '@/Layouts/navbar';

export default function Home() {
    return (
        <div>
            {/* Hero Section */}
            <DefaultNavbar />
            <section id="hero" className="hero bg-white min-h-screen flex items-center justify-center pt-20">
                <div className="hero-content flex flex-col lg:flex-row items-center lg:justify-between px-6 lg:px-20 w-full max-w-7xl">
                    {/* Text Section */}
                    <div className="lg:w-1/2 text-center lg:text-left font-poppins">
                        <h1 className="text-5xl lg:text-6xl font-bold mb-4 text-black">
                            Corporate
                            <span className="relative inline-block highlight-blue-sky ml-2">Ride.</span>
                        </h1>
                        <h1 className="text-5xl lg:text-6xl font-bold mb-4 text-black">
                            Coordination
                            <span className="relative inline-block highlight-blue ml-2">System.</span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-6">
                            Effortlessly manage VIP transport requests with real-time tracking, automatic logging, and secure driver assignment—all in one system built for enterprise mobility.
                        </p>
                        <div className="flex justify-center lg:justify-start space-x-4">
                            <div className="relative group">
                                <Link
                                    href={route('book')}
                                    className="bg-[#85C4F9] text-black font-bold py-4 px-8 border-2 border-black relative z-10 inline-block text-center"
                                >
                                    Book a Ride
                                </Link>
                                <div className="absolute top-2 left-2 bg-black w-full h-full z-0 transition-all duration-300 group-hover:top-0 group-hover:left-0"></div>
                            </div>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="lg:w-1/2 flex items-center justify-center mt-10 lg:mt-0">
                        <div className="max-w-sm rounded-lg bg-gray-200 flex items-center justify-center" style={{ height: '300px', width: '300px' }}>
                            <span className="text-gray-500">Image Placeholder</span>
                        </div>
                    </div>
                </div>
            </section>

            <section id="about" className="hero bg-white min-h-12 flex items-center justify-center pt-20">
                <div className="hero-content flex flex-col lg:flex-row items-center lg:justify-between px-6 lg:px-20 w-full max-w-7xl">
                    {/* Text Section */}
                    <div className="lg:w-full text-center lg:text-left font-poppins">
                        <h1 className="text-5xl lg:text-6xl font-bold mb-4 text-black">
                            About this App

                        </h1>
                        <p className="text-lg text-gray-600 mb-6">
                            This application is developed to support the General Affairs (GA) Department in managing the company's internal transportation needs more efficiently and systematically. It simplifies the process of requesting, assigning, and monitoring rides for employees, ensuring effective vehicle utilization and time management.
                        </p>

                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="service" className="min-h-24 pt-60 px-8">
                <div className="max-w-6xl mx-auto text-center font-poppins">
                    <h2 className="text-4xl font-bold text-black mb-12">Our Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
                        {[
                            {
                                title: 'Ride Requests',
                                description: 'Easily create and manage ride requests.',
                                image: '/img/spread.png',
                            },
                            {
                                title: 'Driver Assignment',
                                description: 'Assign drivers in real-time with schedule conflict detection.',
                                image: '/img/treat.png',
                            },
                            {
                                title: 'Automatic Logging',
                                description: 'Capture departure and arrival times automatically—no manual input required.',
                                image: '/img/protect.png',
                            },
                        ].map((service, index) => (
                            <div key={index} className="relative h-full w-full max-w-sm">
                                <div className="absolute top-2 left-2 w-full h-full bg-[#85C4F9] rounded-lg z-0"></div>
                                <div className="relative bg-white border-2 border-black rounded-lg p-8 z-10 h-full flex flex-col items-center">
                                    <div className="mb-6">
                                        <img src={service.image} alt={service.title} className="mx-auto w-14 h-14 scale-150" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-black">{service.title}</h3>
                                    <p className="text-gray-600 text-center">{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how" className="bg-white min-h-screen pt-60 px-8">
                <div className="max-w-6xl mx-auto text-center font-poppins">
                    <h2 className="text-4xl font-bold text-black mb-6">How It Works</h2>
                    <p className="text-gray-600 text-lg mb-12">
                        We've made it simple, fast, and accessible for everyone.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                        {[
                            {
                                step: 1,
                                title: 'Submit Ride Request',
                                text: 'Employees fill out a request form with destination, pickup time, and purpose.',
                                color: '#a0f0c5',
                            },
                            {
                                step: 2,
                                title: 'Admin Review & Assignment',
                                text: 'The GA Admin approves the request and assigns an available driver and vehicle.',
                                color: '#85C4F9',
                            },
                            {
                                step: 3,
                                title: 'Driver Executes the Ride',
                                text: 'The assigned driver carries out the trip and updates the ride status in the system.',
                                color: '#a0f0c5',
                            },
                            {
                                step: 4,
                                title: 'Ride Completion & Logging',
                                text: 'The ride is marked complete and stored in the system for tracking and reporting.',
                                color: '#85C4F9',
                            },
                        ].map(({ step, title, text, color }) => (
                            <div key={step} className="flex flex-col items-center">
                                <div className="w-20 h-20 flex items-center justify-center rounded-full text-2xl font-bold border-2 border-black mb-4" style={{ backgroundColor: color }}>
                                    {step}
                                </div>
                                <h4 className="text-xl font-bold mb-2 text-black">{title}</h4>
                                <p className="text-gray-600 text-center">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <DefaultNavbar />

            {/* Inline style classes */}
            <style>
                {`
          .highlight-blue::before, .highlight-blue-sky::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 100%;
            height: 0.6em;
            z-index: -1;
            border-radius: 4px;
          }
          .highlight-blue::before {
            background-color: #1E73BE;
          }
          .highlight-blue-sky::before {
            background-color: #85C4F9;
          }
          .font-poppins {
            font-family: 'Poppins', sans-serif;
          }
        `}
            </style>
        </div>
    );
}
