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
        // Create array of 30 organizers with unique names and roles
        const organizers = [
            // row 1
            { name: "Chachi Watterson", role: "Team Spirit Animal", image: "/Organizer Headshots/chachi.JPG", linkedin: "https://www.linkedin.com/in/julian-chavez-b82a13254/" },
            { name: "Julian Chavez", role: "Advisor", image: "/Organizer Headshots/julian.JPG", linkedin: "https://www.linkedin.com/in/julian-chavez-b82a13254/" },
            { name: "Darsh Patel", role: "Tech Team Lead", image: "/Organizer Headshots/darsh.JPG", linkedin: "https://www.linkedin.com/in/darshp623/" },
            { name: "Bella Goltser", role: "President", image: "/Organizer Headshots/bella.JPG", linkedin: "https://www.linkedin.com/in/isabella-goltser-bb1b21284" },
            { name: "Jack Winkler", role: "Internal Vice President", image: "/Organizer Headshots/jack.JPG", linkedin: "https://www.linkedin.com/in/jack-winkler-159575276/" },
            
            // row 2
            { name: "Claire Kim", role: "Advisor", image: "/Organizer Headshots/claire.JPG", linkedin: "https://www.linkedin.com/in/claire-kim-49187416a/" },
            { name: "Muhammad Umar", role: "External Vice President", image: "/Organizer Headshots/umar.JPG", linkedin: "https://www.linkedin.com/in/umbc-muhammadumar" },
            { name: "Pahal Dave", role: "Marketing Team Lead", image: "/Organizer Headshots/pahal.JPG", linkedin: "https://www.linkedin.com/in/pahaldave/" },
            { name: "Julliana Gepilano", role: "Design Team Lead", image: "/Organizer Headshots/jay.JPG", linkedin: "https://www.linkedin.com/in/julianna-gepilano-686b22284/" },
            { name: "Hira Khan", role: "Sponsorship Team Lead", image: "/Organizer Headshots/hira.JPG", linkedin: "https://www.linkedin.com/in/hirakhan22/" },
            
            // row 3
            { name: "Kanishk Srivasta", role: "Treasurer", image: "/Organizer Headshots/kanishk.JPG", linkedin: "https://www.linkedin.com/in/kanishksrivastava15/" },
            { name: "Romain Dzeinse", role: "Tech Team", image: "/Organizer Headshots/romain.JPG", linkedin: "https://www.linkedin.com/in/romaindzeinse/" },
            { name: "Kimberly Calderon", role: "Tech Team", image: "/Organizer Headshots/kimberly.JPG", linkedin: "https://www.linkedin.com/in/kimberly-calderon3/" },
            { name: "Jolin Jiang", role: "Marketing Team", image: "/Organizer Headshots/jolin.JPG", linkedin: "https://www.linkedin.com/in/jolin-jiang-a018a02b6/" },
            { name: "Fatou Sonko", role: "Marketing Team", image: "/Organizer Headshots/fatou.JPG", linkedin: "https://www.linkedin.com/in/fatou-sonko/" },
            
            // row 4
            { name: "Jillian Casey", role: "Design Team", image: "/Organizer Headshots/jillian.JPG", linkedin: "https://www.linkedin.com/in/jillian-casey-2757352b1/" },
            { name: "Prajita Shrestha", role: "Marketing Team", image: "/Organizer Headshots/pj.JPG", linkedin: "https://www.linkedin.com/in/prajita/" },
            { name: "Angel Pham", role: "Marketing Team", image: "/Organizer Headshots/angel.JPG", linkedin: "https://www.linkedin.com/in/duyen-pham-b60465290/" },
            { name: "Lillian Tapa", role: "Design Team", image: "/Organizer Headshots/lillian.JPG", linkedin: "https://www.linkedin.com/in/lilian-tapa-456177186/" },
            { name: "Momin Imran", role: "Tech Team", image: "/Organizer Headshots/momin.JPG", linkedin: "https://www.linkedin.com/in/mominimran1/" },
            
            // row 5
            { name: "Jaebrel Santos", role: "Sponsorship Team", image: "/Organizer Headshots/jaeb.JPG", linkedin: "https://www.linkedin.com/in/jaebrel-santos-310752352" },
            { name: "Pooja Patel", role: "Design Team", image: "/Organizer Headshots/pooja.JPG", linkedin: "https://www.linkedin.com/in/pooja-patel-635151271/" },
            { name: "Shakib Chowdhury", role: "Tech Team", image: "/Organizer Headshots/shakib.JPG", linkedin: "https://www.linkedin.com/in/shakib-chowdhury-6bbbb2284/" },
            { name: "Sydney Spradlin", role: "Design Team", image: "/Organizer Headshots/sydney.JPG", linkedin: "https://www.linkedin.com/in/sydney-spradlin-1b46662ba/" },
            { name: "Natalie Watson", role: "Marketing Team", image: "/Organizer Headshots/natalie.JPG", linkedin: "https://www.linkedin.com/in/darshp623/" },
            
            // row 6
            { name: "Fiona Acquah", role: "Sponsorship Team", image: "/Organizer Headshots/fiona.JPG", linkedin: "https://www.linkedin.com/in/darshp623/" },
            { name: "Shrikanth Bhatnagar", role: "Tech Team", image: "/Organizer Headshots/shrikanth.JPG", linkedin: "https://www.linkedin.com/in/shrikant-bhatnagar-85b59a346/" },
            { name: "Victor Osunji", role: "Tech Team", image: "/Organizer Headshots/victor.JPG", linkedin: "https://www.linkedin.com/in/victor-osunji-bb030a232/" },
            { name: "Waasi Ahmad", role: "Sponsorship Team", image: "/Organizer Headshots/waasi.JPG", linkedin: "https://www.linkedin.com/in/waasi-ahmad-0231b9292/" },
            { name: "Abdullah Gill", role: "Sponsorship Team", image: "/Organizer Headshots/abdullah.JPG", linkedin: "https://www.linkedin.com/in/abdullah-gill-9a5672273/" },
        ];
        
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