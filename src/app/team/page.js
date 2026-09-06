"use client";
import "../css/team.css";
import Navbar from "../components/navbar";
import { useEffect, useRef, useState, useMemo } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SectionTitle from "../components/title";
import MasterSiteBackground from "../components/master-site-background";
import Image from 'next/image';

const organizers = [
        // eboard
        { name: "Bella Goltser", role: "President", image: "/organizers/bella.webp", linkedin: "https://www.linkedin.com/in/isabella-goltser-bb1b21284" },
        { name: "Pahal Dave", role: "External Vice President", image: "/organizers/pahal.webp", linkedin: "https://www.linkedin.com/in/pahaldave/" },
        { name: "Jack Winkler", role: "Internal Vice President", image: "/organizers/jack.webp", linkedin: "https://www.linkedin.com/in/jack-winkler-159575276/" },
        { name: "Esther Adekola", role: "Executive Assistant", image: "/organizers/esther.webp", linkedin: "https://www.linkedin.com/in/esther-adekola-a685ba352/" },
        { name: "Tirth Patel", role: "Advisor", image: "/organizers/tirth.webp", linkedin: "https://www.linkedin.com/in/tirthofficials/" },

        // directors
        { name: "Natalie Watson", role: "Marketing Team Director", image: "/organizers/natalie.webp", linkedin: "https://www.linkedin.com/in/natalie-w-17a7a3242/" },
        { name: "Shakib Chowdhury", role: "Tech Team Director", image: "/organizers/shakib.webp", linkedin: "https://www.linkedin.com/in/shakib-chowdhury-6bbbb2284/" },
        { name: "Jay Gepilano", role: "Design Team Director", image: "/organizers/jay.webp", linkedin: "https://www.linkedin.com/in/julianna-gepilano-686b22284/" },
        { name: "Jaebrel Santos", role: "Sponsorship Team Director", image: "/organizers/jaebrel.webp", linkedin: "https://www.linkedin.com/in/jaebrel-santos-310752352" },
        // tech team
        { name: "Nareh Avagyan", role: "Tech Team", image: "/organizers/nareh.webp", linkedin: "https://www.linkedin.com/in/nareh-avagyan/"},
        { name: "Hero Emenalom", role: "Tech Team", image: "/organizers/hero.webp", linkedin: "https://www.linkedin.com/in/heroemenalom/" },
        { name: "Marianne Nguyen", role: "Tech Team", image: "/organizers/marianne.webp", linkedin: "https://www.linkedin.com/in/marianne-p-nguyen/" },
        { name: "Connor Wu", role: "Tech Team", image: "/organizers/connor.webp", linkedin: "https://www.linkedin.com/in/connor-wu-776551291/" },

        // marketing team
        { name: "Emma Hurd", role: "Marketing Team", image: "/organizers/emma.webp", linkedin: "https://www.linkedin.com/in/emma-hurd/" },
        { name: "Cullen Pepper", role: "Marketing Team", image: "/organizers/cullen.webp", linkedin: "https://www.linkedin.com/in/cullen-pepper-10aa22379/" },
        { name: "Angel Pham", role: "Marketing Team", image: "/organizers/angel.webp", linkedin: "https://www.linkedin.com/in/duyen-pham-b60465290/" },
        // { name: "Hafsah Khan", role: "Marketing Team", image: "/organizers/hafsah.webp", linkedin: "https://www.linkedin.com/in/hafsah-khan-468b06310/" },
        { name: "Adriel Beckley", role: "Marketing Team", image: "/organizers/adriel.webp", linkedin: "https://www.linkedin.com/in/adrielbeckley/" },
        
        // design team
        { name: "Jolin Jiang", role: "Design Team", image: "/organizers/jolin.webp", linkedin: "https://www.linkedin.com/in/jolin-jiang-a018a02b6/" },
        { name: "Sydney Spradlin", role: "Design Team", image: "/organizers/sydney.webp", linkedin: "https://www.linkedin.com/in/sydney-spradlin-7186052b1/" },
        { name: "Andrew Shindle", role: "Design Team", image: "/organizers/andrew.webp", linkedin: "https://www.linkedin.com/in/ashindle/" },
        { name: "Deborah Olunuga", role: "Design Team", image: "/organizers/deborah.webp", linkedin: "https://www.linkedin.com/in/deborah-olunuga-706534390/" },
        
        // sponsorship team
        { name: "Fiona Acquah", role: "Sponsorship Team", image: "/organizers/fiona.webp", linkedin: "https://www.linkedin.com/in/fiona-acquah/" },
        { name: "Romain Dzeinse", role: "Sponsorship Team", image: "/organizers/romain.webp", linkedin: "https://www.linkedin.com/in/romaindzeinse/" },
        { name: "Jagrat Patel", role: "Sponsorship Team", image: "/organizers/jagrat.webp", linkedin: "https://www.linkedin.com/in/stayjagrat/" },
    ];

export default function Team() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
          setIsMobile(window.innerWidth <= 768);
        };
      
        checkMobile();
        window.addEventListener('resize', checkMobile);
      
        // initialize AOS with mobile-specific settings
        AOS.init({
          duration: 400,
          easing: 'ease-in-out',
          once: true,
          disable: 'mobile', // disable animations on mobile
          throttleDelay: 99,
          debounceDelay: 50,
        });
      
        return () => {
          window.removeEventListener('resize', checkMobile);
        };
      }, []);

    
    // Optimized frame image reference
    const frameImage = "/headshot-frame.webp";
    const frameImageC = "/headshot-frameC.webp";

    // function to create organizer cards
    const renderOrganizerCards = () => {
        return organizers.map((organizer, index) => {
            const isPriority = index < 4;
            const frame = index < 9 ? frameImageC : frameImage;

            return ( 
                <div 
                    className="organizer-card" 
                    key={organizer.id || organizer.name || index} 
                >
                    <a href={organizer.linkedin} target="_blank" rel="noopener noreferrer">
                        <div className="organizer-portrait">
                            <div className="organizer-image-wrapper">
                                <img
                                    src={organizer.image} 
                                    alt={organizer.name}
                                    className="organizer-image object-cover w-full h-full absolute inset-0"
                                    loading={index < 4 ? "eager" : "lazy"}
                                    decoding="async"
                                />
                            </div>

                            <img
                                src={frame}
                                alt="" 
                                className="organizer-frame absolute inset-0 w-full h-full pointer-events-none"
                                aria-hidden="true"
                                draggable={false}
                                loading={index < 4 ? "eager" : "lazy"}
                                decoding="async"
                            />

                            <div className="organizer-nameplate">
                                <h3 className="organizer-name">{organizer.name}</h3>
                                <p className="organizer-role">{organizer.role}</p>
                            </div>
                        </div>
                    </a>
                </div>
            );
        });
    };
        
    return (
        <main id="team" className="relative min-h-screen min-h-[100dvh] w-full">
            <MasterSiteBackground />
            <div className="team-page-wrapper relative z-[1] w-full min-h-screen">
                <Navbar />
                <div className="team-page">
                    <div className="team-content">
                        <div className="team-title-container" data-aos={isMobile ? "" : "fade-down"}>
                            <div className="about-section-title">
                                <SectionTitle title="Our Team" color="text-white" />
                            </div>
                            <p className="team-title-subheading text-white">
                                Meet the amazing people behind hackUMBC!
                            </p>
                            <p className="team-subtitle text-white">
                                Click specific cards to learn more about our organizers!
                            </p>
                        </div>
                        
                        <div className="organizers-grid" data-aos={isMobile ? undefined : "fade-up"} >
                            {renderOrganizerCards()}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
} 
