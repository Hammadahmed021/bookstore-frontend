import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-200 text-gray-700">
      {/* Top Section */}
      <div className="max-w-screen-xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold">Book Store</h3>
          <p className="text-sm mt-2">Your favorite online bookstore.</p>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="text-sm mt-2 space-y-1">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="text-center md:text-right">
          <h3 className="text-lg font-semibold">Contact</h3>
          <p className="text-sm mt-2">Email: support@bookstore.com</p>
          <p className="text-sm">Phone: +123 456 7890</p>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="bg-gray-300 py-4 text-center">
        <span className="text-sm">&copy; {year} Book Store. All rights reserved.

        </span>
      </div>
    </footer>
  );
};

export default Footer;
