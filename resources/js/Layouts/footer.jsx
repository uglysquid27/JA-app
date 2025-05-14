import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-4">About Us</h4>
            <p className="text-gray-300 text-sm">
              Pt. Arina Multikarya is a leading provider of innovative solutions...
              {/* Add a brief description of your company */}
            </p>
            <div className="mt-4">
              <a href="/company-profile" className="text-indigo-500 hover:underline text-sm">
                Learn More
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Products & Services</h4>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>
                <a href="/service-one" className="hover:underline">
                  Service One
                </a>
              </li>
              <li>
                <a href="/service-two" className="hover:underline">
                  Service Two
                </a>
              </li>
              <li>
                <a href="/products" className="hover:underline">
                  Our Products
                </a>
              </li>
              {/* Add more product/service links */}
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              {/* Add more quick links */}
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Information</h4>
            <p className="text-gray-300 text-sm">
              Jl. [Your Company Address], [City], [Postal Code]
            </p>
            <p className="text-gray-300 text-sm mt-2">
              Email: <a href="mailto:info@arinamultikarya.com" className="hover:underline">info@arinamultikarya.com</a>
            </p>
            <p className="text-gray-300 text-sm mt-2">
              Phone: <a href="tel:+62[YourPhoneNumber]" className="hover:underline">+62 [Your Phone Number]</a>
            </p>
            {/* Add social media icons/links if you have them */}
            {/* <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  </svg>
              </a>
              </div> */}
          </div>
        </div>
        <div className="mt-8 py-4 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Pt. Arina Multikarya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;