"use client";
import React, { useState, useEffect } from "react";
import "../css/Navbar.css";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // handle resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check on component mount
    handleResize();

    // Add event listener for resize events
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <>
      <div className="nav-bar-container w-full flex justify-center py-2.5 light-mode-text">
        {!isMobile && (
          <a href="https://mlh.io/seasons/2025/events" target="_blank">
            <img
              className="mlh-trust-badge light-mode-text"
              src="mlh-trust-badge.png"
              alt="Major League Hacking 2025 Hackathon Season"
            />
          </a>
        )}
        <nav className="nav-desktop light-mode-text">
          <div className="nav-left">
            <Link
              offset={-300}
              duration={700}
              smooth="true"
              href="hackumbc.tech/#home"
            >
              <img className="nav-logo light-mode-text" src="hackLogo24.png" alt="logo" />
            </Link>
            <Link
              id="left-nav-button"
              to="about"
              smooth="true"
              duration={500}
              className="nav-link light-mode-text"
              href="#about"
            >
              About
            </Link>
            <Link
              id="left-nav-button"
              to="faq"
              offset={0}
              smooth="true"
              duration={500}
              className="nav-link light-mode-text"
              href="#faq"
            >
              FAQ
            </Link>
            <Link
              id="left-nav-button"
              to="sponsors"
              offset={0}
              smooth="true"
              duration={500}
              className="nav-link light-mode-text"
              href="#sponsors"
            >
              Sponsors
            </Link>
          </div>

          <div className="nav-right light-mode-text">
            {/* Add any additional right-side links or buttons here */}
          </div>
        </nav>
        {/*hamburger menu*/}
        <div id="hamburger-nav" className="hamburger-menu">
          <div
            className={`hamburger-icon ${isMenuOpen ? "open" : ""} light-mode-text`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul className={`menu-links ${isMenuOpen ? "open" : ""} light-mode-text`}>
            <li>
              <Link href="#about" className="light-mode-text">About</Link>
            </li>
            <li>
              <Link href="#faq" className="light-mode-text">FAQ</Link>
            </li>
            <li>
              <Link href="#sponsors" className="light-mode-text">Sponsors</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
