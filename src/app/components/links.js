"use client";
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "../css/home.css";

export default function LinkBox({ href, title, desc }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    AOS.init({
        duration: 1200,
        easing: 'ease-in-out',
        once: true,
    });

    // Check if mobile on component mount
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="link-box-container"
      data-aos="fade-in"
      style={{
        position: 'relative',
        overflow: 'hidden',
        fontWeight: 600,
        transition: 'all 300ms ease',
        padding: isMobile ? '8px 12px' : '1rem',
        borderRadius: isMobile ? '2rem' : '5rem',
        border: '0.2rem solid #ffffff',
        color: 'white',
        background: '#ba4126',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        cursor: 'pointer',
        zIndex: 50,
        width: isMobile ? '90%' : '300px',
        height: isMobile ? 'auto' : '140px',
        minHeight: isMobile ? '100px' : '140px',
        margin: isMobile ? '4px 0' : '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
      onMouseEnter={(e) => {
        if (!isMobile) {
          const overlay = e.currentTarget.querySelector('.hover-overlay');
          if (overlay) overlay.style.top = '0';
        }
      }}
      onMouseLeave={(e) => {
        if (!isMobile) {
          const overlay = e.currentTarget.querySelector('.hover-overlay');
          if (overlay) overlay.style.top = '-100%';
        }
      }}
    >
      <a
        href={href}
        rel="noopener noreferrer"
        style={{
          display: 'block',
          textAlign: 'center',
          width: '100%',
          height: '100%',
          textDecoration: 'none',
          color: '#ffffff',
          position: 'relative',
          zIndex: 52
        }}
      >
        <h2
          style={{
            marginBottom: '0.5rem',
            fontSize: isMobile ? '1.1rem' : '1.3rem',
            fontWeight: 'bold',
            color: 'white'
          }}
        >
          {title}
          <span
            style={{
              display: 'inline-block',
              transition: 'transform 0.3s ease-in-out',
              marginLeft: '5px'
            }}
          >
            -&gt;
          </span>
        </h2>
        <p
          style={{
            opacity: 1,
            color: '#ffffff',
            fontSize: isMobile ? '0.8rem' : '0.9rem',
            padding: isMobile ? '0 5px' : '0'
          }}
        >
          {desc}
        </p>
      </a>
      <div
        className="hover-overlay"
        style={{
          content: '""',
          position: 'absolute',
          top: '-100%',
          left: 0,
          width: '100%',
          height: '100%',
          background: '#d64727',
          zIndex: 1,
          transition: 'top 0.5s ease',
          display: isMobile ? 'none' : 'block' // Hide hover effect on mobile
        }}
      />
    </div>
  );
}
