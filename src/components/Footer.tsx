"use client";

import Image from "next/image";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1D4350] text-white py-6">
      {/* Newsletter */}
      <div className="text-center mb-6">
        <div className="flex flex-col items-center">
          <div className="text-4xl mb-3">
            <Image
              src="/images/mail.png"
              alt="Mail Icon"
              width={40}
              height={40}
            />
          </div>

          <h2 className="text-2xl font-semibold mb-2">Stay Connected</h2>
          <p className="text-sm mb-5">
            Get travel tips, match suggestions, and exclusive offers delivered
            to your inbox
          </p>

          <div className="flex justify-center items-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-xl bg-white text-gray-800 w-64 outline-none placeholder:text-gray-600"
            />
            <button className="bg-white text-[#f36b6b] font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
        {/* Logo & Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <div className="bg-[#1D4350] rounded-full p-2 w-10 h-10 flex items-center justify-center border border-white/30">
              <Image
                src="/images/aeroplane.png"
                alt="Travio Icon"
                width={22}
                height={22}
              />
            </div>
            Travio.
          </h3>

          <p className="text-white/80 mb-4">
            Connecting travelers worldwide for unforgettable journeys and
            meaningful friendships.
          </p>

          <div className="flex gap-3">
            <a className="bg-white/20 p-2 rounded-full hover:ring-2 hover:ring-white hover:scale-110 transition">
              <FaFacebookF />
            </a>
            <a className="bg-white/20 p-2 rounded-full hover:ring-2 hover:ring-white hover:scale-110 transition">
              <FaTwitter />
            </a>
            <a className="bg-white/20 p-2 rounded-full hover:ring-2 hover:ring-white hover:scale-110 transition">
              <FaInstagram />
            </a>
            <a className="bg-white/20 p-2 rounded-full hover:ring-2 hover:ring-white hover:scale-110 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Product */}
        <div className="md:pl-12 text-left md:ml-auto">
          <h4 className="font-semibold mb-3">Product</h4>
          <ul className="space-y-2 text-white/80">
            <li>
              <a>Features</a>
            </li>
            <li>
              <a>How It Works</a>
            </li>
            <li>
              <a>AI Tools</a>
            </li>
            <li>
              <a>Pricing</a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className="md:pl-12 text-left md:ml-auto">
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-white/80">
            <li>
              <a>About Us</a>
            </li>
            <li>
              <a>Careers</a>
            </li>
            <li>
              <a>Blog</a>
            </li>
            <li>
              <a>Press</a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="md:pl-12 text-left md:ml-auto">
          <h4 className="font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-white/80">
            <li>
              <a>Help Center</a>
            </li>
            <li>
              <a>Safety</a>
            </li>
            <li>
              <a>Community Guidelines</a>
            </li>
            <li>
              <a>Contact</a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="md:pl-12 text-left md:ml-auto">
          <h4 className="font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-white/80">
            <li>
              <a>Privacy Policy</a>
            </li>
            <li>
              <a>Terms of Service</a>
            </li>
            <li>
              <a>Cookie Policy</a>
            </li>
            <li>
              <a>Licenses</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-white/60 to-transparent my-6" />

      {/* Bottom */}
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/70 mt-6 px-6">
        <p>© 2025 Travio. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a>Privacy</a>
          <a>Terms</a>
          <a>Cookies</a>
        </div>
      </div>
    </footer>
  );
}
