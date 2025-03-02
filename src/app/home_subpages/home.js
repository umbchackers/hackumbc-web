"use client";
import Image from "next/image";
import "../css/home.css";
import LinkBox from "../components/links";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const [isMobile, setIsMobile] = useState(true);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div 
      className="home-page relative" 
      style={{
        backgroundImage: "url('/hackumbc_bg.gif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="home-container">

        <div className="footer light-mode-text" data-aos="fade-in">
          <LinkBox
            href="/sign-up"
            desc="Want to experience a code rush? Register for our upcoming 8 hour mini event!"
            title="Registration"
          />
          <LinkBox
            href="https://hackumbc-fall-2024.devpost.com/"
            desc="Click this to go to the Devpost, where you can view logistics for projects, teams, and prizes!"
            title="Devpost"
          />
          <LinkBox
            href="mailto:sponsor@hackumbc.tech"
            desc="Curious about sponsorship? Click here to email us: sponsor@hackumbc.tech"
            title="Sponsorship"
          />
        </div>
      </div>
    </div>
  );
}
