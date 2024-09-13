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
        border: '0.1rem solid transparent',
        borderColor: '#ffffff',
        color: 'white',
        background: 'linear-gradient(to right, #0da682, #3d208b)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.querySelector('.hover-overlay').style.top = '0';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.querySelector('.hover-overlay').style.top = '-100%';
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
        }}
      >
        <h2
          style={{
            marginBottom: '0.5rem',
            fontSize: '2xl',
            fontWeight: 'bold',
          }}
        >
          {title}
          <span
            style={{
              display: 'inline-block',
              transition: 'transform 0.3s ease-in-out',
            }}
          >
            -&gt;
          </span>
        </h2>
        <p
          style={{
            opacity: 1,
            color: '#ffffff',
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
          background: 'linear-gradient(to right, #16c99f, #4400fa)',
          zIndex: -1,
          transition: 'top 0.5s ease',
        }}
      />
    </div>
  );
}
