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

  const [isMobile, setIsMobile] = useState(false);

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
    <div className="home-page" style={{
      backgroundImage: isMobile ? "url('/mobile-bg-home.gif')" : "url('/hackumbc_bg.gif')",
      backgroundSize: isMobile ? "auto 130vh" : "cover",
      backgroundPosition: isMobile ? "center -30vh" : "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "scroll",
      height: "100vh",
      width: "100%",
      overflow: "hidden",
      marginBottom: "-1px",
    }}>
      <div className="home-container" style={{ 
        zIndex: 10,
        display: "flex",
        alignItems: isMobile ? "flex-start" : "center",
        justifyContent: "center",
        paddingTop: isMobile ? "40vh" : "0",
        height: "100%",
      }}>
        <div className="footer" style={{ 
          width: isMobile ? "90%" : "100%", 
          flexWrap: isMobile ? "nowrap" : "wrap",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "10px" : "20px",
          position: isMobile ? "relative" : "absolute",
          bottom: isMobile ? "auto" : "100px",
        }}>
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
