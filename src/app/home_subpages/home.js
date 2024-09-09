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
        <div className="home-date" data-aos="fade-in">
          <h1>
            September 28th & 29th
          </h1>
        </div>
        <Image
          className="hack-logo dark:drop-shadow-[0_0_0.3rem_#ffffff70] light:invert light-mode-text"
          src="/hackUMBCTextShadow.png"
          alt="hackUMBC Logo"
          width={480}
          height={480}
          priority
          data-aos="fade-in"  
        />
        <p
          className="text-height text-white text-2xl mt-8 font-semibold tenth-logo light-mode-text"
          data-aos="fade-in"
        >
          {" "}
          10th
        </p>

        <div className="footer light-mode-text" data-aos="fade-in">
          <LinkBox
            href="sign-up"
            desc="Sign up and join us for the 10th anniversary @ hackUMBC September 28th and 29th!"
            title="Registration"
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
