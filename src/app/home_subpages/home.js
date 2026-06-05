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
    <div className="home-page" style={{       //allows scrolling on mobile
  position: "relative",
  height: isMobile ? "auto" : "100vh",
  overflow: isMobile ? "visible" : "hidden",
  minHeight: "100vh"
}}>
      {/* isMobile !== null && <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={isMobile ? '/hackumbc_bg_mobile.mp4' : '/hackumbc_bg_home.mp4'} type="video/mp4" />
        Your browser does not support the video tag
      </video> */}

    {/* Basic medieval background - placeholder until full bg is ready */}
    <div className="absolute top-0 left-0 w-full h-full z-0" 
     style={{ backgroundColor: '#E8C48D' }}
      />

      <div className="home-container" style={{ 
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: isMobile ? "12px" : "clamp(12px, 2.5vh, 28px)",
        paddingTop: isMobile ? "72px" : "clamp(96px, 14vh, 150px)",
        paddingBottom: isMobile ? "0" : "clamp(24px, 8vh, 100px)"
      }}>
        <div className="pointer-events-none" style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <object 
            data="/hackumbc 2026 text.svg" 
            alt="hackUMBC 2026" 
            style={{ width: isMobile ? '90%' : 'clamp(420px, 58vw, 800px)', maxWidth: '800px', height: 'auto' }}
          />
        </div>
        <div className="footer" style={{ 
          width: isMobile ? "90%" : "100%", 
          flexWrap: isMobile ? "nowrap" : "wrap",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "10px" : "20px",
          position: "relative",
          bottom: "auto",
        }}>
          {/* <LinkBox
            href="https://hackumbc.typeform.com/to/qM9YbL6E"
            desc="Apply to be an Organizer for hackUMBC 2026! Applications are open until 10/25."
            title="Apply to Organize"
          /> */}
          {/* <LinkBox
            href="/sign-up"
            desc="Registration for hackUMBC 2026 mini-hackathon is now open! Click this button to go to the sign up page!"
            title="Registration"
          /> */}
          <LinkBox
            href="https://hackumbc-minihackathon.devpost.com/"
            desc="Visit hackUMBC's Devpost to see project logistics, teams, and prizes!"
            title="Devpost"
          />
          <LinkBox
            href="#sponsors"
            desc="Want to sponsor hackUMBC? Click this button to learn more!"
            title="Sponsor"
          />
        </div>
      </div>
    </div>
  );
}
