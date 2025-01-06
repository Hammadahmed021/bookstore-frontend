import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.svg'
import { Fa0, FaFacebook, FaFacebookF, FaGoogle, FaLinkedin } from "react-icons/fa6";


const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white font-primary">
      {/* Top Section */}
      <div className="max-w-screen-2xl mx-auto px-4 pt-12 pb-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="text-center md:text-left">
          <Link to="/">
            <img src={logo} className="invert" />
          </Link>
          <p className="text-sm mt-6 sm:mr-12">Welcome to Book Store, your go-to destination for discovering your next favorite read.</p>
        </div>
        <div className="text-start">
          <h3 className="text-2xl font-semibold">Useful Links</h3>
          <ul className="text-sm mt-4 space-y-2">
            <li>
              <a href="#" className="hover:underline hover:text-gray-400 transition-all">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-gray-400 transition-all">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-gray-400 transition-all">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="text-start">
          <h3 className="text-2xl font-semibold">Quick Links</h3>
          <ul className="text-sm mt-4 space-y-2">
            <li>
              <a href="#" className="hover:underline hover:text-gray-400 transition-all">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-gray-400 transition-all">
                All Categories
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-gray-400 transition-all">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-gray-400 transition-all">
                Legal Terms
              </a>
            </li>

          </ul>
        </div>
        <div className="text-start">
          <h3 className="text-2xl font-semibold">Contact</h3>
          <p className="text-sm mt-2">Email: support@bookstore.com</p>
          <p className="text-sm">Phone: +123 456 7890</p>
          <ul className="flex items-center gap-3 mt-4">
            <li><FaGoogle /></li>
            <li><FaFacebookF /></li>
            <li><FaLinkedin /></li>
          </ul>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="bg-gray-900 p-4 text-center">
        <span className="text-base">&copy; {year} Bookstore. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
