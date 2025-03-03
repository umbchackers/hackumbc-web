"use client";
import "../css/team.css";
import Navbar from "../components/navbar";
import { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SectionTitle from "../components/title";

export default function Team() {
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
         

    // Function to create organizer cards
    const renderOrganizerCards = () => {
        // For now, we'll create 30 identical cards as specified
        const organizers = Array(30).fill({
            name: "Darsh Patel",
            role: "Tech Team Lead",
            image: "/darsh.png",
            linkedin: "https://www.linkedin.com/in/darshp623/"
        });
        
        return organizers.map((organizer, index) => (
            <div 
                className="organizer-card" 
                key={index} 
                data-aos={isMobile ? "" : "fade-up"} 
                data-aos-delay={isMobile ? "" : (100 + (index % 5) * 100)}
            >
                <a href={organizer.linkedin} target="_blank" rel="noopener noreferrer">
                    <div className="organizer-image-container">
                        <img 
                            src={organizer.image} 
                            alt={organizer.name}
                            className="organizer-image"
                            loading={index < 10 ? "eager" : "lazy"}
                        />
                    </div>
                    <div className="organizer-info">
                        <h3 className="organizer-name">{organizer.name}</h3>
                        <p className="organizer-role">{organizer.role}</p>
                    </div>
                </a>
            </div>
        ));
    };

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
            <div className="team-page">
                <div className="team-content">
                    <div className="team-title-container" data-aos={isMobile ? "" : "fade-down"}>
                        <SectionTitle title="Our Team" color="text-white" />
                        <p className="team-title-subheading text-white">
                            Meet the amazing people behind hackUMBC!
                        </p>
                        <p className="team-subtitle text-white">
                            Click specific cards to learn more about our Organizers!
                        </p>
                    </div>
                    
                    <div className="organizers-grid">
                        {renderOrganizerCards()}
                    </div>
                </div>
            </div>
        </div>
    );
} 