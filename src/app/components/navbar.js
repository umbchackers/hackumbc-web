"use client";
import React, { useState } from "react";
import "../css/Navbar.css";
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from 'react';
//fixed hrefs for navbar

export default function Navbar() {

  useEffect(() => {
    AOS.init({
        duration: 1200,
        easing: 'ease-in-out',
        once: true,
    });
  }, []);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const toggleMenu = () => setIsMenuOpen(prev => !prev);
  
  return (<>
   <div className="nav-bar-container w-full flex justify-center py-2.5">
      <a href="https://link.hackumbc.tech/mlh" target="_blank">
        <img
          className="mlh-trust-badge"
          src="mlh-trust-badge.png"
          alt="Major League Hacking 2022 Hackathon Season"
        />
      </a>
      <nav className="nav-desktop" data-aos="fade-in">
        <div className="nav-left">
          <Link href="https://link.hackumbc.tech/mlh" offset={-300} duration={700} smooth="true">
            <img
              className="nav-logo"
              src="hackLogo24.png"
              alt="logo"
            />
          </Link>
          <Link
            id="left-nav-button"
            to="about"
            smooth="true"
            duration={500}
            className="nav-link"
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
            className="nav-link"
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
            className="nav-link"
            href="#sponsors"
          >
            Sponsors
          </Link>
          {/*<a id='left-nav-button' className='nav-link' href="https://oldlemonpepper.github.io/ILSBMap/" target='_blank'>Map</a>*/}
          {/* <Link
            id="left-nav-button"
            to="schedule"
            smooth={true}
            duration={500}
            className="nav-link"
          >
            Schedule
          </Link> */}
        </div>

        <div className="nav-right">
          {/* <a href= 'https://hackumbc.typeform.com/to/nWcCFMXi' id="signup-button" className='nav-sign-up'>REGISTER</a> 
                <a href= 'https://hackumbc.typeform.com/to/MqNdLmuH' id="vsignup-button" className='nav-sign-up'>VOLUNTEER</a> */}
        </div>
      </nav>
    {/*hamburger menu*/}
        <div id="hamburger-nav" className="hamburger-menu">
          <div className={`hamburger-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul className={`menu-links ${isMenuOpen ? 'open' : ''}`}>
            <li><Link href="#about">About</Link></li>
            <li><Link href="#faq">FAQ</Link></li>
            <li><Link href="#sponsors">Sponsors</Link></li>
          </ul>
        </div>
      </div>
    </>
  );
}