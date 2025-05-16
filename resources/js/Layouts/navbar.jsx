import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/inertia-react";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline';
import ApplicationLogo from "@/Components/ApplicationLogo";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      setIsDark(true);
      window.document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      window.document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'auto';
  };

  const handleSmoothScroll = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setIsMobileMenuOpen(false);
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-700 transition-all duration-300 ${
        isScrolled ? "bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm dark:backdrop-blur-sm" : "bg-white dark:bg-gray-800"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-2 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img
            src="/img/logoArina.png"
            alt="Logo"
            className="h-12 w-auto md:h-16 scale-100 md:scale-200"
          />
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white focus:outline-none focus:text-black dark:focus:text-white"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>
        </div>

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex space-x-8 lg:space-x-12">
          <a
            href="#home"
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white font-semibold text-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            onClick={handleSmoothScroll}
          >
            Home
          </a>
          <a
            href="#about"
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white font-semibold text-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            onClick={handleSmoothScroll}
          >
            About
          </a>
          <a
            href="#why"
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white font-semibold text-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            onClick={handleSmoothScroll}
          >
            Services
          </a>
          <a
            href="#how"
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white font-semibold text-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            onClick={handleSmoothScroll}
          >
            Contact
          </a>
        </div>

        {/* Right Side (Desktop): Login Button and Theme Toggle */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative group inline-block">
            <Link
              href={route('login')}
              className="relative z-10 px-6 py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-[#85c4f9] to-[#1e73be] dark:from-[#3b82f6] dark:to-[#1d4ed8] shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105"
            >
              Login
            </Link>
            <div className="absolute inset-0 rounded-lg bg-black dark:bg-white opacity-0 group-hover:opacity-10 transition duration-300"></div>
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className="rounded-full p-2 transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <SunIcon className="w-6 h-6 text-yellow-400" />
            ) : (
              <MoonIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-full bg-white dark:bg-gray-900 z-40 transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6 py-5 flex justify-end">
          <button onClick={toggleMobileMenu} className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white focus:outline-none focus:text-black dark:focus:text-white">
            <FaTimes className="h-6 w-6" />
          </button>
        </div>
        <div className="flex flex-col items-center space-y-4 px-6 mt-10">
          <a
            href="#home"
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white font-semibold text-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            onClick={handleSmoothScroll}
          >
            Home
          </a>
          <a
            href="#about"
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white font-semibold text-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            onClick={handleSmoothScroll}
          >
            About
          </a>
          <a
            href="#why"
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white font-semibold text-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            onClick={handleSmoothScroll}
          >
            Services
          </a>
          <a
            href="#how"
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white font-semibold text-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            onClick={handleSmoothScroll}
          >
            Contact
          </a>
          <Link
            href={route('login')}
            className="relative z-10 px-6 py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-[#85c4f9] to-[#1e73be] dark:from-[#3b82f6] dark:to-[#1d4ed8] shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Login
          </Link>
          {/* Theme Toggle in Mobile Menu */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="rounded-full p-2 transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <SunIcon className="w-6 h-6 text-yellow-400" />
            ) : (
              <MoonIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;