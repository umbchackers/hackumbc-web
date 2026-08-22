"use client";
import "../css/about.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import SectionTitle from "../components/title";
import useIsMobile from '../../lib/use_is_mobile';

const TRACKS = [
    {
        frameSrc: "/main-tracks.webp",
        alt: "Main Tracks",
        textColor: "#1a1523",
        description: "Compete for prizes across domains like AI/ML, Health, Sustainability, and Education",
    },
    {
        frameSrc: "/club-track.webp",
        alt: "Club Tracks",
        textColor: "#cab183",
        description: "Unique challenges hosted by campus club partners",
    },
    {
        frameSrc: "/sponsorship-tracks.webp",
        alt: "Sponsorship Tracks",
        textColor: "#ceac80",
        description: "Tackle real-world challenges hosted by our industry sponsors",
    },
    {
        frameSrc: "/mis-tracks.webp",
        alt: "Miscellaneous Tracks",
        textColor: "#a4adb1",
        description: "Fun or creative focuses for projects and sub-categories",
    },
];

function TrackItem({ frameSrc, alt, textColor, description }) {
    return (
        <div className="track-frame" data-aos="fade-up">
            <img src={frameSrc} alt={alt} className="track-frame-img" />
            <div className="track-frame-content" style={{ color: textColor }}>
                <p className="track-frame-text">{description}</p>
            </div>
        </div>
    );
}

export function About() {
    const isMobile = useIsMobile();

    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    return (
        <div
            className="about-page"
            style={{
                backgroundColor: "transparent",
                padding: isMobile ? "80px 0 20px 0" : "0",
                position: "relative",
            }}
        >
            <div className="about-content">
                <div className="text-container" data-aos="fade-up">
                    <div className="about-section-title text-black">
                        <SectionTitle title="ABOUT" />
                    </div>
                    <div className="about-text text-black" style={{paddingLeft: isMobile ? "10px" : "0px", width: isMobile ? "90%" : "auto", maxWidth: "700px" }}>
                        <p>
                        Join us at UMBC for a 24-hour hackathon happening on <span style={{color: "rgba(105, 0, 16, 0.8)", 
                            fontWeight: 700, textDecoration: "underline"}}>September 26th-27th </span>
                             in the ITE and Engineering Buildings. Work alongside fellow students, 
                            bring your ideas to life, and develop your skills through engaging workshops!
                        </p>
                        <br />
                        <p>
                            With lots of fun activities, amazing prizes, and swag for all participants, you'll be in for an exciting day!
                        </p>
                        <br />
                        <p>
                            Curious about the team that makes hackUMBC possible?
                            <a
                                href="/team"
                                className="team-link rainbow-ripple"
                                style={{
                                    WebkitTextStroke: "0.5px rgba(0,0,0,0.1)",
                                    marginLeft: "5px",
                                    transition: "all 0.3s ease",
                                }}
                            >
                                Meet our organizing team! (Click here)
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function Tracks() {
    const isMobile = useIsMobile();

    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    return (
        <div
            className="tracks-container"
            data-aos="fade-up"
            style={{
                padding: isMobile ? "20px 0" : "0",
                position: "relative",
            }}
        >
            <div
                className="about-section-title text-black"
                style={{ marginBottom: "50px", marginTop: "0" }}
            >
                <SectionTitle title="TRACKS" />
            </div>
            <div className="tracks-row" style={{ marginTop: "0"}}>
                {TRACKS.map((track) => (
                    <TrackItem key={track.alt} {...track} />
                ))}
            </div>
        </div>
    );
}

export default About