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

    function Track({ title, desc, color, children }) {
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
                minHeight: isMobile ? 'auto' : '405px',
                backgroundColor: color || 'transparent'
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
            backgroundColor: "transparent",
           // backgroundPosition: "center",
           // backgroundRepeat: "no-repeat",
            padding: isMobile ? "40px 0" : "0",
            position: "relative"
        }}>
           {/* <SvgTiler 
                key={isMobile ? 'mobile' : 'desktop'}
                show={true} 
                topSrc={isMobile ? "/hackumbc_bg_mobile_about.svg" : "/hackumbc_bg_about1.svg"}
                tileSrc={isMobile ? "/hackumbc_bg_mobile_about2.svg" : "/hackumbc_bg_about2.svg"} 
                aspectRatio={1.5}
                isMobile={isMobile}
            /> */}
        
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
                        Join us at UMBC for a 12-hour hackathon happening on <span style={{color: "rgba(105, 0, 16, 0.8)", 
                            fontWeight: 700, textDecoration: "underline"}}>April 18th</span>, 2026! Work alongside fellow students, 
                            bring your ideas to life, and develop your skills through engaging workshops!
                        </p>
                        <br/>
                        <p>
                        With lots of fun activities, amazing prizes, and swag for all participants, you'll be in for an exciting day!
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
                
                {/* Prizes section - old tracks commented out */}
{/* <div className="tracks-container" data-aos="fade-up"> old tracks */}
<div className="tracks-container" data-aos="fade-up">
    <div className="about-title-subheading text-black" style={{ marginTop: isMobile ? "20px" : "3vh" }}>
        Prizes
    </div>
    <div className="tracks" style={{ 
        gap: isMobile ? "15px" : "30px",
        marginTop: isMobile ? "20px" : "2vh",
        flexDirection: isMobile ? "column" : "row"
    }}>
        <Track title="1st Place" desc="Nintendo Switch 2 (x3)" color="#DD9E45">
            <div className="track-image-container" style={{ fontSize: '4rem' }}>
                🏆
            </div>
        </Track>
        <Track title="2nd Place" desc="Holy Stone Drones (x3)" color="#977837">
            <div className="track-image-container" style={{ fontSize: '4rem' }}>
                🥈
            </div>
        </Track>
        <Track title="3rd Place" desc="Amazon Fire Sticks 4K (x3)" color="#A34F2B">
            <div className="track-image-container" style={{ fontSize: '4rem' }}>
                🥉
            </div>
        </Track>
    </div>
</div>
            </div>    
        </div>
    );
}
