import React from 'react';
import { usePage } from '@inertiajs/inertia-react'; // Inertia hook


export default function DefaultNavbar({ children }){
    <div className="navbar bg-[#ffffff] shadow-sm fixed top-0 w-full z-50">
      <div className="flex justify-between items-center w-full px-10 py-2">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          <img
            src="/img/logoArina.png"
            alt="Logo"
            className="h-16 w-auto scale-200"
          />
        </a>

        {/* Center Links */}
        <div className="flex space-x-12">
          <a
            href="#home"
            className="text-gray-700 hover:text-black font-bold text-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Home
          </a>
          <a
            href="#about"
            className="text-gray-700 hover:text-black font-bold text-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            About
          </a>
          <a
            href="#why"
            className="text-gray-700 hover:text-black font-bold text-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Services
          </a>
          <a
            href="#how"
            className="text-gray-700 hover:text-black font-bold text-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Contact
          </a>
        </div>

          <div className="relative group inline-block">
            <button className="relative z-10 px-6 py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-[#85c4f9] to-[#1e73be] shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105">
              <a href="/login">Login</a>
            </button>
            <div className="absolute inset-0 rounded-lg bg-black opacity-0 group-hover:opacity-10 transition duration-300"></div>
          </div>
      </div>
      {/* Main content */}
      <div className="flex-1 p-6 overflow-y-auto min-h-screen">
                <main>{children}</main>
            </div>
    </div>
    
}
