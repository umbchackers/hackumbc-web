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
      
        // initialize AOS with mobile-specific settings
        AOS.init({
          duration: isMobile ? 800 : 1400,
          easing: 'ease-in-out',
          once: true,
          disable: isMobile ? 'phone' : false, // disable animations on mobile
          startEvent: 'DOMContentLoaded',
        });
      
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0);
          document.body.style.overflow = 'auto';
          document.body.style.height = 'auto';
          document.documentElement.style.overflow = 'auto';
          document.documentElement.style.height = 'auto';
          document.body.style.position = 'relative';
      
          // instead of forcing a redraw on the body, only update the minHeight of your container
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
         

    // function to create organizer cards
    const renderOrganizerCards = () => {
        // create array of 30 organizers with unique names and roles
        const organizers = [
            // row 1
            { name: "Bella Goltser", role: "President", image: "/organizers/bella.webp", linkedin: "https://www.linkedin.com/in/isabella-goltser-bb1b21284" },
            { name: "Pahal Dave", role: "External Vice President", image: "/organizers/pahal.webp", linkedin: "https://www.linkedin.com/in/pahaldave/" },
            { name: "Jack Winkler", role: "Internal Vice President", image: "/organizers/jack.webp", linkedin: "https://www.linkedin.com/in/jack-winkler-159575276/" },
            { name: "Esther Adekola", role: "Executive Assistant", image: "/organizers/esther.webp", linkedin: "https://www.linkedin.com/in/esther-adekola-a685ba352/" },
            
            // row 2
            { name: "Natalie Watson", role: "Marketing Team Director", image: "/organizers/natalie.webp", linkedin: "https://www.linkedin.com/in/natalie-w-17a7a3242/" },
            { name: "Shakib Chowdhury", role: "Tech Team Director", image: "/organizers/shakib.webp", linkedin: "https://www.linkedin.com/in/shakib-chowdhury-6bbbb2284/" },
            { name: "Jay Gepilano", role: "Design Team Director", image: "/organizers/jay.webp", linkedin: "https://www.linkedin.com/in/julianna-gepilano-686b22284/" },
            { name: "Jaebrel Santos", role: "Sponsorship Team Director", image: "/organizers/jaebrel.webp", linkedin: "https://www.linkedin.com/in/jaebrel-santos-310752352" },
            
            // row 3
            { name: "Nareh Avagyan", role: "Tech Team", image: "/organizes/nareh.webp", linkedin: "https://www.linkedin.com/in/nareh-avagyan/"},
            { name: "Hero Emenalom", role: "Tech Team", image: "/organizers/hero.webp", linkedin: "https://www.linkedin.com/in/heroemenalom/" },
            { name: "Marianne Nguyen", role: "Tech Team", image: "/organizers/marianne.webp", linkedin: "https://www.linkedin.com/in/marianne-p-nguyen/" },
            { name: "Connor Wu", role: "Tech Team", image: "/organizers/connor.webp", linkedin: "https://www.linkedin.com/in/connor-wu-776551291/" },
            { name: "Shrikant Bhatnagar", role: "Tech Team", image: "/organizers/shrikant.webp", linkedin: "https://www.linkedin.com/in/shrikant-bhatnagar-85b59a346/" },
            
            // row 4
            { name: "Emma Hurd", role: "Marketing Team", image: "/organizers/romain.webp", linkedin: "https://www.linkedin.com/in/emma-hurd/" },
            { name: "Cullen Pepper", role: "Marketing Team", image: "/organizers/cullen.webp", linkedin: "https://www.linkedin.com/in/cullen-pepper-10aa22379/" },
            { name: "Angel Pham", role: "Marketing Team", image: "/organizers/angel.webp", linkedin: "https://www.linkedin.com/in/duyen-pham-b60465290/" },
            { name: "Hafsah Khan", role: "Marketing Team", image: "/organizers/hafsah.webp", linkedin: "" },
            { name: "Adriel Beckly", role: "Marketing Team", image: "/organizers/adriel.webp", linkedin: "https://www.linkedin.com/in/adrielbeckley/" },
            
            // row 5
            { name: "Fatou Sonko", role: "Design Team", image: "/organizers/fatou.webp", linkedin: "https://www.linkedin.com/in/fatou-sonko/" },
            { name: "Jolin Jiang", role: "Design Team", image: "/organizers/jolin.webp", linkedin: "https://www.linkedin.com/in/jolin-jiang-a018a02b6/" },
            { name: "Sydney Spradlin", role: "Design Team", image: "/organizers/sydney.webp", linkedin: "https://www.linkedin.com/in/sydney-spradlin-7186052b1/" },
            { name: "Andrew Shindle", role: "Design Team", image: "/organizers/andrew.webp", linkedin: "https://www.linkedin.com/in/ashindle/" },
            { name: "Deborah Olunuga", role: "Design Team", image: "/organizers/deborah.webp", linkedin: "https://www.linkedin.com/in/deborah-olunuga-706534390/" },
            
            // row 6
            { name: "Prajita Shrestha", role: "Sponsorship Team", image: "/organizers/prajita.webp", linkedin: "https://www.linkedin.com/in/prajita/" },
            { name: "Fiona Acquah", role: "Sponsorship Team", image: "/organizers/fiona.webp", linkedin: "https://www.linkedin.com/in/darshp623/" },
            { name: "Romain Dzeinse", role: "Sponsorship Team", image: "/organizers/romain.webp", linkedin: "https://www.linkedin.com/in/romaindzeinse/" },
            { name: "Andy Cruz", role: "Sponsorship Team", image: "/organizers/andy.webp", linkedin: "https://www.linkedin.com/in/cruz-andy/" },
            { name: "Jagrat Patel", role: "Sponsorship Team", image: "/organizers/jagrat.webp", linkedin: "https://www.linkedin.com/in/stayjagrat/" },
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
    <main id="team">
        <div id="team" className="team-page-wrapper" ref={pageRef} style={{ 
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
        </main>
    );
} 