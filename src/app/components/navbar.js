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
      setIsMobile(window.innerWidth <= 768);
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
              href="/#home"
              onClick={() => {
                if (currentPath === "/") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  window.location.href = "/";
                }
              }}
            >
              <img className="nav-logo light-mode-text" src="hackumbcdog2025.png" alt="logo" />
            </Link>
            <Link
              id="left-nav-button"
              to="about"
              smooth="true"
              duration={500}
              className="nav-link light-mode-text"
              href={currentPath === "/" ? "#about" : "/#about"}
              onClick={() => {
                if (currentPath === "/") {
                  window.scrollTo({ top: document.getElementById('about').offsetTop, behavior: "smooth" });
                } else {
                  window.location.href = "/#about";
                }
              }}
            >
              About
            </Link>
            <Link
              id="left-nav-button"
              to="schedule"
              smooth="true"
              duration={500}
              className="nav-link light-mode-text"
              href={currentPath === "/" ? "#schedule" : "/#schedule"}
              onClick={() => {
                if (currentPath === "/") {
                  window.scrollTo({ top: document.getElementById('schedule').offsetTop, behavior: "smooth" });
                } else {
                  window.location.href = "/#schedule";
                }
              }}
            >
              Schedule
            </Link>
            <Link
              id="left-nav-button"
              to="faq"
              offset={0}
              smooth="true"
              duration={500}
              className="nav-link light-mode-text"
              href={currentPath === "/" ? "#faq" : "/#faq"}
              onClick={() => {
                if (currentPath === "/") {
                  window.scrollTo({ top: document.getElementById('faq').offsetTop, behavior: "smooth" });
                } else {
                  window.location.href = "/#faq";
                }
              }}
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
              href={currentPath === "/" ? "#sponsors" : "/#sponsors"}
              onClick={() => {
                if (currentPath === "/") {
                  window.scrollTo({ top: document.getElementById('sponsors').offsetTop, behavior: "smooth" });
                } else {
                  window.location.href = "/#sponsors";
                }
              }}
            >
              Sponsors
            </Link>
            <Link
              id="left-nav-button"
              className="nav-link light-mode-text"
              href="/team"
            >
              Organizers
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
              <Link 
                href={currentPath === "/" ? "#about" : "/#about"} 
                className="light-mode-text"
                onClick={() => {
                  if (currentPath === "/") {
                    window.scrollTo({ top: document.getElementById('about').offsetTop, behavior: "smooth" });
                  }
                  setIsMenuOpen(false);
                }}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                href={currentPath === "/" ? "#schedule" : "/#schedule"} 
                className="light-mode-text"
                onClick={() => {
                  if (currentPath === "/") {
                    window.scrollTo({ top: document.getElementById('schedule').offsetTop, behavior: "smooth" });
                  }
                  setIsMenuOpen(false);
                }}
              >
                Schedule
              </Link>
            </li>
            <li>
              <Link 
                href={currentPath === "/" ? "#faq" : "/#faq"} 
                className="light-mode-text"
                onClick={() => {
                  if (currentPath === "/") {
                    window.scrollTo({ top: document.getElementById('faq').offsetTop, behavior: "smooth" });
                  }
                  setIsMenuOpen(false);
                }}
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link 
                href={currentPath === "/" ? "#sponsors" : "/#sponsors"} 
                className="light-mode-text"
                onClick={() => {
                  if (currentPath === "/") {
                    window.scrollTo({ top: document.getElementById('sponsors').offsetTop, behavior: "smooth" });
                  }
                  setIsMenuOpen(false);
                }}
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
      </div>
    </>
  );
}
