"use client";
import React from "react";

const Footer = () => {
  return (

    <footer className="bg-black-800 text-white text-center py-4">
      <p>&copy; 2024 hackUMBC. All rights reserved.</p>
      <p className="mt-2">
        <a href="#" className="text-blue-400 hover:underline mx-2">
          Privacy Policy
        </a>{" "}
        |
        <a href="#" className="text-blue-400 hover:underline mx-2">
          Terms of Service
        </a>{" "}
        |
        <a href="#" className="text-blue-400 hover:underline mx-2">
          Contact Us
        </a>
      </p>
    </footer>
  );
};

export default Footer;
