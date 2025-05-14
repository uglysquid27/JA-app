import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/inertia-react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Disable scrolling when the mobile menu is open
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
      setIsMobileMenuOpen(false); // Close mobile menu after navigation
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 bg-white shadow-sm transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-sm" : "bg-white"
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
            className="text-gray-700 hover:text-black focus:outline-none focus:text-black"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>
        </div>

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex space-x-8 lg:space-x-12">
          <a
            href="#home"
            className="text-gray-700 hover:text-black font-semibold text-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            onClick={handleSmoothScroll}
          >
            Home
          </a>
          <a
            href="#about"
            className="text-gray-700 hover:text-black font-semibold text-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            onClick={handleSmoothScroll}
          >
            About
          </a>
          <a
            href="#why"
            className="text-gray-700 hover:text-black font-semibold text-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            onClick={handleSmoothScroll}
          >
            Services
          </a>
          <a
            href="#how"
            className="text-gray-700 hover:text-black font-semibold text-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            onClick={handleSmoothScroll}
          >
            Contact
          </a>
        </div>

        {/* Button (Desktop) */}
        <div className="hidden md:block relative group inline-block">
          <Link
            href={route('login')}
            className="relative z-10 px-6 py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-[#85c4f9] to-[#1e73be] shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105"
          >
            Login
          </Link>
          <div className="absolute inset-0 rounded-lg bg-black opacity-0 group-hover:opacity-10 transition duration-300"></div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-full bg-white z-40 transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6 py-5 flex justify-end">
          <button onClick={toggleMobileMenu} className="text-gray-700 hover:text-black focus:outline-none focus:text-black">
            <FaTimes className="h-6 w-6" />
          </button>
        </div>
        <div className="flex flex-col items-center space-y-4 px-6 mt-10">
          <a
            href="#home"
            className="text-gray-700 hover:text-black font-semibold text-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            onClick={handleSmoothScroll}
          >
            Home
          </a>
          <a
            href="#about"
            className="text-gray-700 hover:text-black font-semibold text-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            onClick={handleSmoothScroll}
          >
            About
          </a>
          <a
            href="#why"
            className="text-gray-700 hover:text-black font-semibold text-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            onClick={handleSmoothScroll}
          >
            Services
          </a>
          <a
            href="#how"
            className="text-gray-700 hover:text-black font-semibold text-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            onClick={handleSmoothScroll}
          >
            Contact
          </a>
          <Link
            href={route('login')}
            className="relative z-10 px-6 py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-[#85c4f9] to-[#1e73be] shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105"
            onClick={() => setIsMobileMenuOpen(false)} // Close menu on login
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;