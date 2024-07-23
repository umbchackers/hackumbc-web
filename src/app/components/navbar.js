import React from "react";
import "../css/Navbar.css";
import Link from 'next/link'


export default function Navbar() {
  return (<>
   <div className="nav-bar-container w-full flex justify-center py-2.5">
      <a href="https://link.hackumbc.tech/mlh" target="_blank">
        <img
          className="mlh-trust-badge"
          src="mlh-trust-badge.png"
          alt="Major League Hacking 2022 Hackathon Season"
        />
      </a>
      <nav className="nav-desktop">
        <div className="nav-left">
          <Link href="header" offset={-300} duration={700} smooth="true">
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
                        href=""
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
                        href=""
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
            href=""
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
    </div>
  
  </>)
};