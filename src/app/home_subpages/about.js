"use client";
// have to use client for cao
import "../css/about.css";
import Image from "next/image";
import { Carousel } from "@material-tailwind/react";
import SectionTitle from  "../components/title";
// import { Track } from "../components/tracks"


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
        <div className="h-screen [background:radial-gradient(125%_125%_at_50%_90%,#000_40%,#63e_100%)]">

            <div className="relative h-32 w-32">
                <SectionTitle title="About" className="absolute bottom-0 left-0"/>
                <Carousel className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                <Track
                        title="General"
                        desc="Whatever you want! These are hacks that don't fit under any specific category."
                    >
                        <img
                            src="/Dog_General.png"
                            alt="track-image"
                            className="w-36 h-auto"
                        />
                    </Track>
                    <Track
                        title="Education"
                        desc="Hacks that focus on learning and education."
                    >
                        <img
                            src="/Dog_Education.png"
                            alt="track-image"
                            className="w-36 h-auto"
                        />
                    </Track>
                    <Track
                        title="Equity"
                        desc="Hacks that promote equality and inclusiveness."
                    >
                        <img
                            src="/Dog_Equity.png"
                            alt="track-image"
                            className="w-36 h-auto"
                        />
                    </Track>
                    <Track
                        title="Healthcare"
                        desc="Hacks that aim to improve health and wellness."
                    >
                        <img
                            src="/Dog_Healthcare.png"
                            alt="track-image"
                            className="w-36 h-auto"
                        />
                    </Track>
                    <Track
                        title="Hobbies"
                        desc="Hacks that focus on hobbies and leisure activities."
                    >
                        <img
                            src="/Dog_Hobbies.png"
                            alt="track-image"
                            className="w-36 h-auto"
                        />
                    </Track>
                    <Track
                        title="Wifi"
                        desc="Hacks that focus on connectivity and network improvements."
                    >
                        <img
                            src="/Dog_Wifi.png"
                            alt="track-image"
                            className="w-36 h-auto"
                        />
                    </Track>
                </Carousel>
            </div>
        </div>
    )
}
