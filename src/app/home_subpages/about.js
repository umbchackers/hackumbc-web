"use client";
import "../css/about.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect, useState } from 'react';
import SectionTitle from "../components/title";

export default function About() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        AOS.init({
            duration: 1200,
            easing: 'ease-in-out',
            once: true,
        });
        AOS.refresh();

        // Check if mobile on component mount
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function Track({ title, desc, children }) {
        return (
            <div className={`flex flex-col items-center ${isMobile ? 'w-full' : 'w-64'} rounded-lg border-transparent 
                bg-white/10 hover:border-white/20 hover:shadow-lg backdrop-blur-sm cursor-default transition-all duration-300`}
                style={{
                    padding: isMobile ? '15px 10px' : '0.5rem',
                    maxWidth: isMobile ? '300px' : 'none',
                    margin: isMobile ? '0 auto' : '0',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    justifyContent: isMobile ? 'flex-start' : 'space-between',
                    height: isMobile ? 'auto' : '350px'
                }}
                data-aos="fade-up">
                <div className={`flex items-center`}
                    style={{
                        padding: '15px 0px 15px 0px',
                        width: isMobile ? '150px' : '150px',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    {children}
                </div>
                <div>
                    <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} mb-1 uppercase font-extrabold text-black`}>
                        {title}
                    </h1> 
                    <p className={`text-center ${isMobile ? 'text-sm' : ''} mb-3 font-medium text-black`}>
                        {desc}
                    </p> 
                </div>
            </div>
        );
    }

    return (
        <div className="about-page" style={{
            backgroundImage: "url('/hackumbc_bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            padding: isMobile ? "40px 0" : "0"
        }}>
            <div className="about-content">
                <div className="text-container" data-aos="fade-up">
                    <div className="about-section-title text-black"> 
                        <SectionTitle title="ABOUT" />
                    </div>
                    <div className="about-title-subheading text-black">
                        All About hackUMBC
                    </div>
                    <div className="about-text text-black" style={{ width: isMobile ? "100%" : "auto", maxWidth: "700px" }}>
                        <p>
                            Join hackUMBC for the 11th year of our 24-hour hackathon event,  
                            <span style={{color: "rgb(186, 65, 38)", fontWeight: 700, textDecoration: "underline"}}> September 27th & 28th</span>, 
                            where we compete to bring our innovation to life! 
                            Team up with students and develop your skills in our workshop sessions!
                        </p>
                        <br/>
                        <p>
                            With lots of fun activities, $TBD in prizes, and swag for
                            all participants, you'll be in for an exciting weekend!
                        </p>
                        <br/>
                        <p>
                            Want to learn more about the organizers behind hackUMBC? 
                            <a
                                href="/team"
                                className="team-link rainbow-ripple"
                                style={{
                                    WebkitTextStroke: '0.5px rgba(0,0,0,0.1)',
                                    marginLeft: '5px',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                Meet our organizing team! (Click here)
                            </a>
                        </p>
                    </div>
                </div>
                
                <div className="tracks-container" data-aos="fade-up">
                    <div className="tracks" style={{ 
                        gap: isMobile ? "15px" : "30px",
                        marginTop: isMobile ? "20px" : "2vh",
                        flexDirection: isMobile ? "column" : "row"
                    }}>
                        <Track
                            title="TBD"
                            desc="TBD."
                        >
                            <div className="track-image-container">
                                <img
                                    src="/sticker-1.png"
                                    alt="track-image"
                                    className="w-36 h-auto"
                                />
                            </div>
                        </Track>
                        <Track
                            title="TBD"
                            desc="TBD."
                        >
                            <div className="track-image-container">
                                <img
                                    src="/sticker-2.png"
                                    alt="track-image"
                                    className="w-36 h-auto"
                                />
                            </div>
                        </Track>
                        <Track
                            title="TBD"
                            desc="TBD."
                        >
                            <div className="track-image-container">
                                <img
                                    src="/sticker-3.png"
                                    alt="track-image"
                                    className="w-36 h-auto"
                                />
                            </div>
                        </Track>
                        <Track
                            title="TBD"
                            desc="TBD!">
                            <div className="track-image-container">
                                <img
                                    src="/sticker-4.png"
                                    alt="track-image"
                                    className="w-36 h-auto"
                                />
                            </div>
                        </Track>
                    </div>
                </div>
            </div>    
        </div>
    );
}
