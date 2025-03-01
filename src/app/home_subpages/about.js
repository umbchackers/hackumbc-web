"use client";

import "../css/about.css";
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
            <div
                className="p-4 flex flex-col items-center w-64 rounded-lg border-transparent bg-white/10
                hover:border-white/20 hover:shadow-lg backdrop-blur-sm cursor-default transition-all duration-300"
                data-aos="fade-up"
            >
                {children}
                <h1 className="text-2xl mb-1 uppercase font-extrabold text-black">{title}</h1>
                <p className="text-center mb-5 font-medium text-black">{desc}</p>
            </div>
        );
    }

    return (
        <div
            className="about-page relative"
            style={{
                backgroundImage: "url('/hackumbc_bg.png')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center top",
                backgroundColor: "#fff"
            }}
        >
            <div className="about-content relative z-10">
                <div className="text-container" data-aos="fade-up">
                    <div className="about-section-title text-black">
                        <SectionTitle title="ABOUT" />
                    </div>
                    <div className="about-title-subheading text-black">
                        All About hackUMBC
                    </div>
                    <div className="about-text text-black">
                        <p>
                            Join hackUMBC for the 11th year of our 24-hour hackathon event where we compete to bring our innovation to life!
                            Team up with students and develop your skills in our workshop sessions!
                        </p>
                        <br />
                        <p>
                            With lots of fun activities, over $5,000 in prizes, and swag for
                            all participants, you'll be in for an exciting weekend!
                        </p>
                    </div>
                </div>

                <div className="tracks-container" data-aos="fade-up">
                    <div className="tracks">
                        <Track
                            title="General"
                            desc="Projects that don't fit under any category."
                        >
                            <img
                                src="/sticker1.png"
                                alt="track-image"
                                className="w-36 h-auto"
                            />
                        </Track>
                        <Track
                            title="Entrepreneurial"
                            desc="Projects that focus on learning & education."
                        >
                            <img
                                src="/sticker2.png"
                                alt="track-image"
                                className="w-36 h-auto"
                            />
                        </Track>
                        <Track
                            title="Company"
                            desc="Projects that focus on company missions."
                        >
                            <img
                                src="/sticker4.png"
                                alt="track-image"
                                className="w-36 h-auto"
                            />
                        </Track>
                        <Track
                            title="Game-Jam"
                            desc="Collaboration with Game-Dev club!"
                        >
                            <img
                                src="/gamedevlogo.png"
                                alt="track-image"
                                className="w-36 h-auto"
                            />
                        </Track>
                    </div>
                </div>
            </div>
        </div>
    );
}
