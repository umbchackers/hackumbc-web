"use client";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "../css/home.css";

export default function LinkBox({ href, title, desc }) {

  useEffect(() => {
    AOS.init({
        duration: 1200,
        easing: 'ease-in-out',
        once: true,
    });
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
        padding: '1rem',
        borderRadius: '5rem',
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
        width: '300px',
        height: '140px',
        margin: '10px',
      }}
      onMouseEnter={(e) => {
        const overlay = e.currentTarget.querySelector('.hover-overlay');
        if (overlay) overlay.style.top = '0';
      }}
      onMouseLeave={(e) => {
        const overlay = e.currentTarget.querySelector('.hover-overlay');
        if (overlay) overlay.style.top = '-100%';
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
            fontSize: '1.3rem',
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
            fontSize: '0.9rem'
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
        }}
      />
    </div>
  );
}
