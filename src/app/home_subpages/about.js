"use client";
// have to use client for cao
import "../css/about.css";
import Image from "next/image";
import SectionTitle from "../components/title";

export default function About() {
    function Track({ title, desc, children }) {
        return (
            <div className="p-4 flex flex-col items-center w-64 rounded-lg border-transparent hover:border-white/20 hover:shadow-lg backdrop-blur-sm cursor-default transition-all duration-300">
                {children}
                <h1 className="text-2xl mb-1 uppercase font-extrabold">{title}</h1>
                <p className="text-center mb-5 font-medium">{desc}</p>
            </div>
        );
    }
    
    return (
        <div className="about-page">
            <div className="about-content">

                <div className="title">
                    <SectionTitle title="About" />
                </div>
                <div className="about-text">
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
                <div className="tracks flex space-x-40 items-center">
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
