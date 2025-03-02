"use client";
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

  return (
    <div className="home-page">
      <div 
        style={{
          backgroundImage: "url('/hackumbc_bg.gif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1
        }}
      ></div>
      
      <div className="home-container">
        <div className="footer">
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
