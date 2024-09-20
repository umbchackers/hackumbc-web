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
        className="home-container"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #000 40%, #63e 100%)",
        }}
      >
        <Image
          className="hack-logo dark:drop-shadow-[0_0_0.3rem_#ffffff70] light:invert light-mode-text"
          src="/newhackLogo24.png"
          alt="hackUMBC Logo"
          width={800}
          height={800}
          priority
          data-aos="fade-in"
          data-aos-duration="400"  
        />
        <div className="footer light-mode-text" data-aos="fade-in">
          <LinkBox
            href="sign-up"
            desc="Sign up and join us for the 10th anniversary @ hackUMBC September 28th and 29th!"
            title="Registration"
            className="light-mode-text"
          ></LinkBox>
          <LinkBox
            href="https://hackumbc-fall-2024.devpost.com/"
            desc="Click this to go to the Devpost, where you can view logistics for projects, teams, and prizes!"
            title="Devpost"
            className="light-mode-text"
          ></LinkBox>
          <LinkBox
            href="mailto:sponsor@hackumbc.tech"
            desc="Curious about sponsorship? Click here to email us: sponsor@hackumbc.tech"
            title="Sponsorship"
            className="light-mode-text"
          ></LinkBox>
        </div>
      </div>
    </div>
  );
}
