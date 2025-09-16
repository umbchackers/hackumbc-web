"use client";
import "../css/about.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect, useState } from 'react';
import SectionTitle from "../components/title";
import useIsMobile from '../../lib/use_is_mobile';
import SvgTiler from '../components/svg-tiler';

export default function About() {
    const isMobile = useIsMobile();

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
                    height: isMobile ? 'auto' : '450px',
                    minHeight: isMobile ? 'auto' : '405px'
                }}
                data-aos="fade-up">
                <div className={`flex items-center`}
                    style={{
                        padding: '15px 0px 15px 0px',
                        width: isMobile ? '150px' : '150px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexShrink: 0
                    }}>
                    {children}
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: isMobile ? 'auto' : '100%',
                    flex: isMobile ? 'none' : 1
                }}>
                    <div>
                        <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} mb-1 uppercase font-extrabold text-black`}>
                            {title}
                        </h1> 
                        <p className={`text-center ${isMobile ? 'text-sm' : ''} mb-3 font-medium text-black`}>
                            {desc}
                        </p> 
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="about-page" style={{
            // backgroundImage: "url('/hackumbc_bg_about.webp')",
            backgroundColor: "#fed5a9",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            padding: isMobile ? "40px 0" : "0",
            position: "relative"
        }}>
            <SvgTiler 
                key={isMobile ? 'mobile' : 'desktop'}
                show={true} 
                topSrc={isMobile ? "/hackumbc_bg_mobile_about.svg" : "/hackumbc_bg_about.svg"}
                tileSrc={isMobile ? "/hackumbc_bg_mobile_about2.svg" : "/hackumbc_bg_about2.svg"} 
                aspectRatio={1.5}
                isMobile={isMobile}
            />
        
            <div className="about-content">
                <div className="text-container" data-aos="fade-up">
                    <div className="about-section-title text-black"> 
                        <SectionTitle title="ABOUT" />
                    </div>
                    <div className="about-title-subheading text-black">
                        All About hackUMBC
                    </div>
                    <div className="about-text text-black" style={{paddingLeft: isMobile ? "10px" : "0px", width: isMobile ? "90%" : "auto", maxWidth: "700px" }}>
                        <p>
                        Join us at UMBC for the 11th annual hackUMBC, a 24-hour hackathon happening on <span style={{color: "rgb(186, 65, 38)", 
                            fontWeight: 700, textDecoration: "underline"}}>September 27th & 28th</span>, 2025! Work alongside fellow students, 
                            bring your ideas to life, and develop your skills through engaging workshops!
                        </p>
                        <br/>
                        <p>
                        With exciting activities, over $7,000 in prizes, and swag for every 
                        participant, hackUMBC is all about learning, creating, and having fun!
                        </p>
                        <br/>
                        <p>
                            Curious about the team that makes hackUMBC possible? 
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
                            title="General Tracks"
                            desc="Compete for overall awards and explore AI/ML, Health & Environment, and Education"
                        >
                            <div className="track-image-container">
                                <img
                                    src="/sticker-1.webp"
                                    alt="track-image"
                                    className="w-36 h-auto"
                                />
                            </div>
                        </Track>
                        <Track
                            title="Sponsor Tracks"
                            desc="Take on challenges hosted by our sponsors"
                        >
                            <div className="track-image-container">
                                <img
                                    src="/sticker-2.webp"
                                    alt="track-image"
                                    className="w-36 h-auto"
                                />
                            </div>
                        </Track>
                        <Track
                            title="Club Tracks"
                            desc="Special tracks from UMBC’s Game Developers Club and CyberDawgs"
                        >
                            <div className="track-image-container">
                                <img
                                    src="/sticker-3.webp"
                                    alt="track-image"
                                    className="w-36 h-auto"
                                />
                            </div>
                        </Track>
                        <Track
                            title="Miscellaneous Tracks"
                            desc="Fun or creative focuses for projects and sub-categories">
                            <div className="track-image-container">
                                <img
                                    src="/sticker-4.webp"
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
