"use client";
// have to use client for cao
import "../css/about.css";
import Image from "next/image";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from 'react';
import SectionTitle from "../components/title";

export default function About() {

    useEffect(() => {
        AOS.init({
            duration: 1200,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    function Track({ title, desc, children }) {
        return (
            <div className="p-4 flex flex-col items-center w-64 rounded-lg border-transparent
             hover:border-white/20 hover:shadow-lg backdrop-blur-sm cursor-default transition-all duration-300 " data-aos="fade-up">
                {children}
                <h1 className="text-2xl mb-1 uppercase font-extrabold">{title}</h1>
                <p className="text-center mb-5 font-medium">{desc}</p>
            </div>
        );
    }
    return (
        <div className="about-page">
            <div className="about-content">
                <div className="title" data-aos="fade-up">
                    <SectionTitle title="About" />
                </div>
                <div className="about-text" data-aos="fade-up">
                    <p>
                        Join hackUMBC for our 24-hour hackathon event where we challenge
                        our ideas to come to life! Collaborate with other students and
                        pick up some new skills in our workshop sessions!
                    </p>

                    <p>
                        With lots of fun activities, over $5,000 in prizes, and swag for
                        all participants, you'll be in for an exciting weekend!
                    </p>
                </div>
                <div className="tracks flex" data-aos="fade-up"> {/* adjusted the className styling for centering on mobile for tracks */}
                    <Track
                        title="General"
                        desc="Whatever you want! These are hacks that don't fit under any specific category."
                    >
                        <img
                            src="/sticker1.png"
                            alt="track-image"
                            className="w-36 h-auto"
                        />
                    </Track>
                    <Track
                        title="Education"
                        desc="Hacks that focus on learning and education."
                    >
                        <img
                            src="/sticker2.png"
                            alt="track-image"
                            className="w-36 h-auto"
                        />
                    </Track>
                    <Track
                        title="Technology"
                        desc="Hacks that focus on technology and innovation."
                    >
                        <img
                            src="/sticker3.png"
                            alt="track-image"
                            className="w-36 h-auto"
                        />
                    </Track>
                </div>
            </div>    
        </div>
    );
}
