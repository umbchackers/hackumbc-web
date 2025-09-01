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
    AOS.refresh();
  }, []);

  const [isMobile, setIsMobile] = useState(null);

  // handle resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // initial check on component mount
    handleResize();

    // add event listener for resize events
    window.addEventListener("resize", handleResize);

    // cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="home-page" style={{
      position: "relative",
      height: "100vh",
      overflow: "hidden"
    }}>
      {isMobile !== null && <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={isMobile ? '/hackumbc_bg_mobile.mp4' : '/hackumbc_bg_home.mp4'} type="video/mp4" />
        Your browser does not support the video tag
      </video>}
      <div className="home-container" style={{ 
        zIndex: 10,
        display: "flex",
        alignItems: isMobile ? "flex-start" : "center",
        justifyContent: "center",
        paddingTop: isMobile ? "50vh" : "0" // reduced button height on mobile
      }}>
        <div className="footer" style={{ 
          width: isMobile ? "90%" : "100%", 
          flexWrap: isMobile ? "nowrap" : "wrap",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "10px" : "20px",
          position: isMobile ? "relative" : "absolute",
          bottom: isMobile ? "auto" : "100px",
        }}>
          {<LinkBox
            href="/sign-up"
            desc="Registration for hackUMBC 2025 is now open! Click this button to go to the sign up page!"
            title="Registration"
          />}
          <LinkBox
            href="https://hackumbc-fall-2024.devpost.com/"
            desc="Click to visit Devpost, where you can view logistics for projects, teams, and prizes!"
            title="Devpost"
          />
          <LinkBox
            href="https://hackumbc.typeform.com/to/c7JqYV9s"
            desc="Want to be part of the behind-the-scenes magic? Click this button to sign up for our volunteer team!"
            title="Volunteer"
          />
        </div>
      </div>
    </div>
  );
}
