"use client";
import React, { useState, useEffect } from "react";
import "../css/Navbar.css";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <>
      <div className="nav-bar-container w-full flex justify-center py-2.5 light-mode-text">
         {!isMobile && (
          <a
             id="mlh-trust-badge" 
            href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=white"
            target="_blank"
          >
            <img
              src="https://logged-assets.s3.amazonaws.com/trust-badge/2027/mlh-trust-badge-2027-white.svg"
              alt="Major League Hacking 2026 Hackathon Season"
              fetchPriority="high"
            />
          </a>   
        )} 
        <nav className="nav-desktop light-mode-text">
          <div className="nav-left">
            <Link href="/#home">
              <img className="nav-logo light-mode-text" src="/hackumbc2026logo.svg" alt="logo" />
            </Link>
            <Link
              className="nav-link light-mode-text"
              href={currentPath === "/" ? "#about" : "/#about"}
            >
              About
            </Link>
            <Link
              className="nav-link light-mode-text"
              href={currentPath === "/" ? "#schedule" : "/#schedule"}
            >
              Schedule
            </Link>
            <Link
              className="nav-link light-mode-text"
              href={currentPath === "/" ? "#faq" : "/#faq"}
            >
              FAQ
            </Link>
            <Link
              className="nav-link light-mode-text"
              href={currentPath === "/" ? "#sponsors" : "/#sponsors"}
            >
              Sponsors
            </Link>
            <Link
              className="nav-link light-mode-text"
              href="/team"
            >
              Organizers
            </Link>
          </div>
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
              <Link 
                href={currentPath === "/" ? "#about" : "/#about"} 
                className="light-mode-text"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                href={currentPath === "/" ? "#schedule" : "/#schedule"} 
                className="light-mode-text"
                onClick={() => setIsMenuOpen(false)}
              >
                Schedule
              </Link>
            </li>
            <li>
              <Link 
                href={currentPath === "/" ? "#faq" : "/#faq"} 
                className="light-mode-text"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link 
                href={currentPath === "/" ? "#sponsors" : "/#sponsors"} 
                className="light-mode-text"
                onClick={() => setIsMenuOpen(false)}
              >
                Sponsors
              </Link>
            </li>
            <li>
              <Link 
                href="/team" 
                className="light-mode-text"
                onClick={() => setIsMenuOpen(false)}
              >
                Organizers
              </Link>
            </li>
          </ul>
        </div>
        </nav>
      </div>
    </>
  );
}
