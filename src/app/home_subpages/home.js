"use client";
import Image from "next/image";
import "../css/home.css";
import LinkBox from "../components/links";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { StarsBackground } from "../components/stars-background";

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
    <div className="home-page relative" style={{
      background: "radial-gradient(125% 125% at 50% 10%, #000 40%, #005f73 100%)",
    }}>
      <StarsBackground className="z-0" />
      <div className="home-container relative z-10">
        <Image
          className="hack-logo drop-shadow-[0_0_5px_rgba(255,255,255,255)] light:invert light-mode-text"
          src="/hacklogo2025.png"
          alt="hackUMBC Logo"
          width={800}
          height={800}
          priority
          data-aos="fade-in"
          data-aos-duration="400"  
        />
        <div className="footer light-mode-text" data-aos="fade-in">
          {/*{<LinkBox
            href="https://hackumbc.typeform.com/to/zBg8SfON"
            desc="hackUMBC 2024 is now over, but register to be an Organizer for 2025 by November 10th!"
            title="Registration"
            className="light-mode-text"
          ></LinkBox>}*/}
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
