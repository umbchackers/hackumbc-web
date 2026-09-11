"use client";
import "../css/Sponsors.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from 'react';
import SectionTitle from "../components/title";
import useIsMobile from '../../lib/use_is_mobile';
import SvgTiler from '../components/svg-tiler';

export default function Sponsors() {

    const isMobile = useIsMobile();

    useEffect(() => {
        AOS.init({
            duration: 1200,
            easing: 'ease-in-out',
            once: true,
        });
        AOS.refresh();
    }, []);
 

    //add
    const workshops = [
    {
        title: "GDG Workshop: Getting Started with Google Cloud",
        host: "Google Developer Groups (GDG)",
        description: "This Google Developer Groups (GDG) workshop will introduce participants to the fundamentals of deploying an application on Google Cloud. Attendees will learn how to set up a cloud project, configure authentication, and deploy a live application using Cloud Run. Designed for beginners, this session requires no prior cloud experience."
    },
    {
        title: "Digital Detectives: Solving a Cyber Mystery with KC7",
        host: "CWIT Cyber Leads",
        description: "Join the CWIT Cyber Leads for a hands-on introduction to cybersecurity analysis. In this workshop, attendees will use the KC7 Cyber platform to bridge the gap between theory and practice. You’ll learn how to navigate security logs, identify malicious activity, and solve a mystery. This is designed for those who love solving puzzles and want to experience the reality of a cyber investigation."
    }
];

    return (
        <div className="sponsors-page relative" style={{
            // backgroundImage: "url('/hackumbc_bg_sponsors.webp')",
           backgroundColor: "transparent",
            //backgroundSize: "cover",
           // backgroundPosition: "center",
            // backgroundRepeat: "no-repeat",
            position: "relative"
        }}> 

            <div className="sponsors-section-title relative z-10 text-black" data-aos="fade-up">
               <SectionTitle title="SPONSORS"/>
               {/* <SectionTitle title="WORKSHOPS"/> */}
            </div>
            <div className="sponsors-title-subheading relative z-10 text-black" data-aos="fade-up">
                 Thank You to Our Incredible Sponsors!
               {/* Check Out Our Workshops! */}
            </div>
            <div className="sponsors-content relative z-10" data-aos="fade-up">
                <div className="sponsors-unified-container" data-aos="fade-up">
                    <div className="sponsors-frame-wrapper">
                        <img
                            src="/sponsor_frame.png"
                            className="sponsors-frame"
                            alt=""
                        />

                        <div className="sponsors-all-logos">
                            <div className="sponsors-row sponsors-row-large sponsors-row-dual">
                                <a href="https://coeit.umbc.edu/" target="_blank" rel="noopener noreferrer">
                                    <img src="/coeit.png" alt="COEIT" className="sponsors-logo" loading="eager" />
                                </a>
                                <a href="https://doit.umbc.edu/" target="_blank" rel="noopener noreferrer">
                                    <img src="/doit.png" alt="DoIT" className="sponsors-logo" loading="eager" />
                                </a>
                            </div>

                            <div className="sponsors-row sponsors-row-large sponsors-row-solo">
                                <a href="https://www.troweprice.com/" target="_blank" rel="noopener noreferrer">
                                    <img src="/troweprice.png" alt="T. Rowe Price" className="sponsors-logo" loading="eager" />
                                </a>
                            </div>

                            <div className="sponsors-row sponsors-row-medium sponsors-row-triple">
                                <a href="https://www.jhuapl.edu/" target="_blank" rel="noopener noreferrer">
                                    <img src="/apl.png" alt="Johns Hopkins APL" className="sponsors-logo" loading="eager" />
                                </a>
                                <a href="https://nightwing.us/" target="_blank" rel="noopener noreferrer">
                                    <img src="/nightwing.png" alt="Nightwing" className="sponsors-logo" loading="eager" />
                                </a>
                                <a href="https://www.bwtechumbc.com/" target="_blank" rel="noopener noreferrer">
                                    <img src="/bwtech.webp" alt="bwTECH" className="sponsors-logo sponsors-logo-bwtech" loading="eager" />
                                </a>
                            </div>

                            <div className="sponsors-row sponsors-row-small sponsors-row-five">
                                <a href="https://csee.umbc.edu/" target="_blank" rel="noopener noreferrer">
                                    <img src="/csee.png" alt="CSEE" className="sponsors-logo" loading="eager" />
                                </a>
                                <a href="https://entrepreneurship.umbc.edu/" target="_blank" rel="noopener noreferrer">
                                    <img src="/alex-brown-center.png" alt="Alex Brown Center" className="sponsors-logo sponsors-logo-alex" loading="eager" />
                                </a>
                                <a href="https://firaxis.com/" target="_blank" rel="noopener noreferrer">
                                    <img src="/firaxis.webp" alt="Firaxis Games" className="sponsors-logo" loading="eager" />
                                </a>
                                <a href="https://mlh.io/" target="_blank" rel="noopener noreferrer">
                                    <img src="/mlh.svg" alt="MLH" className="sponsors-logo sponsors-logo-mlh" loading="eager" />
                                </a>
                                <a href="https://www.realmone.com/" target="_blank" rel="noopener noreferrer">
                                    <img src="/realmone.png" alt="RealmOne" className="sponsors-logo sponsors-logo-realmone" loading="eager" />
                                </a>
                            </div>

                            <div className="sponsors-row sponsors-row-partner sponsors-row-quad">
                                <a href="https://www.celsius.com/" target="_blank" rel="noopener noreferrer">
                                    <img src="/celsius.webp" alt="Celsius" className="sponsors-logo sponsors-logo-celsius" loading="eager" />
                                </a>
                                <a href="https://loveablaze.org/" target="_blank" rel="noopener noreferrer">
                                    <img src="/love-ablaze.png" alt="Love Ablaze" className="sponsors-logo" loading="eager" />
                                </a>
                                <a href="https://mlh.link/MLH-PureButtons-hackathons" target="_blank" rel="noopener noreferrer">
                                    <img src="/purebuttons.png" alt="Pure Buttons" className="sponsors-logo" loading="eager" />
                                </a>
                                <a href="https://www.redbull.com/" target="_blank" rel="noopener noreferrer">
                                    <img src="/redbull.svg" alt="Red Bull" className="sponsors-logo" loading="eager" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}