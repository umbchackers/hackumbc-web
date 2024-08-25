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
    <div
      className="home-container"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, #000 40%, #63e 100%)",
      }}
    >
      <Image
        className="hack-logo dark:drop-shadow-[0_0_0.3rem_#ffffff70] light:invert"
        src="/hackText24.png"
        alt="hackUMBC Logo"
        width={480}
        height={480}
        priority
        data-aos="fade-in"
      />
      <p
        className="text-height text-white text-2xl mt-8 font-semibold"
        data-aos="fade-in"
      >
        {" "}
        10th
      </p>
      <LinkBox href="#about" color={false}></LinkBox>

      <div className="footer" data-aos="fade-in">
        <LinkBox
          href="sign-up"
          desc="Sign up and join us for the 10th anniversary @ hackUMBC!"
          title="Registration"
        ></LinkBox>
        <LinkBox
          href="mailto:sponsorship@hackumbc.tech"
          desc="Curious about sponsorship? Click here or email us sponsor@hackumbc.tech"
          title="Sponsorship"
        ></LinkBox>
      </div>
    </div>
  );
}
