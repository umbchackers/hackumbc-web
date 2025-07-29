"use client";
import "../css/team.css";
import Navbar from "../components/navbar";
import { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function secret(){
const pageRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
          setIsMobile(window.innerWidth <= 768);
        };
      
        checkMobile();
        window.addEventListener('resize', checkMobile);
      
        // Initialize AOS with mobile-specific settings
        AOS.init({
          duration: isMobile ? 800 : 1400,
          easing: 'ease-in-out',
          once: true,
          disable: isMobile ? 'phone' : false, // Disable animations on mobile
          startEvent: 'DOMContentLoaded',
        });
      
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0);
          document.body.style.overflow = 'auto';
          document.body.style.height = 'auto';
          document.documentElement.style.overflow = 'auto';
          document.documentElement.style.height = 'auto';
          document.body.style.position = 'relative';
      
          // Instead of forcing a redraw on the body, only update the minHeight of your container
          setTimeout(() => {
            if (pageRef.current) {
              const height = pageRef.current.scrollHeight;
              pageRef.current.style.minHeight = height + 'px';
            }
          }, 100);
        }
      
        return () => {
          document.body.style.overflow = '';
          document.body.style.height = '';
          document.documentElement.style.overflow = '';
          document.documentElement.style.height = '';
          document.body.style.position = '';
          window.removeEventListener('resize', checkMobile);
        };
      }, [isMobile]);

      return (
        <div className="team-page-wrapper" ref={pageRef} style={{ 
            minHeight: '100vh', 
            width: '100%', 
            position: 'relative', 
            overflowY: 'auto',
            overflowX: 'hidden',
            WebkitOverflowScrolling: 'touch'
        }}>
            <Navbar />
            <div className="team-page secret-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <div className="team-content">
                    <div className="secret-container">
                        <h1>Congratulations, you found the secret!</h1>
                    </div>
                </div>
            </div>
        </div>
      )
}