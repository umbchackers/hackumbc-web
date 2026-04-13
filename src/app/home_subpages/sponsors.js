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
           backgroundColor: "#E8C48D",
            //backgroundSize: "cover",
           // backgroundPosition: "center",
            // backgroundRepeat: "no-repeat",
            position: "relative"
        }}>
            {/*<SvgTiler 
                key={isMobile ? 'mobile' : 'desktop'}
                show={true} 
                topSrc={isMobile ? "/hackumbc_bg_mobile_sponsors3.svg" : "/hackumbc_bg_faq2.svg"} 
                tileSrc={isMobile ? "/hackumbc_bg_mobile_sponsors3.svg" : "/hackumbc_bg_faq2.svg"} 
                aspectRatio={1.5}
                isMobile={isMobile}
            /> */}
            <div className="sponsors-section-title relative z-10 text-black" data-aos="fade-up">
               {/* <SectionTitle title="SPONSORS"/> */}
               <SectionTitle title="WORKSHOPS"/>
            </div>
            <div className="sponsors-title-subheading relative z-10 text-black" data-aos="fade-up">
               {/*} Thank You to Our Incredible Sponsors!*/}
               Check Out Our Workshops!
            </div>
            <div className="sponsors-content relative z-10" data-aos="fade-up">
                <div className="sponsors-unified-container" data-aos="fade-up">
                    <div className="sponsors-intro-text">
                       {/*} hackUMBC wouldn't be possible without the generous support of our sponsors, click on their logos to check them out! */}
                       Explore our workshops below!
                    </div>

                    {/* ── OLD SPONSOR LOGOS (commented out) ──
                    <div className="sponsors-all-logos">
                         //diamond 
                        <a href="https://coeit.umbc.edu/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/coeit.webp"
                                alt="COEIT"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a>
                        
                         //platinum 
                        <a href="https://www.troweprice.com/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/trowepricelogo.webp"
                                alt="T. Rowe Price"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a>
                        <a href="https://doit.umbc.edu/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/doit.webp"
                                alt="DoIT"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a>
                        
                                   //Gold 
                        <a href="https://www.lockheedmartin.com/en-us/index.html" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/lockheedmartin.webp"
                                alt="Lockheed Martin"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a>
                        <a href="https://nightwing.us/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/nightwing.webp"
                                alt="Nightwing"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a>
                        <a href="https://base44.com/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/base44.webp"
                                alt="Base44"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a>
                        
                        
                        <a href="https://www.jhuapl.edu/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/apl.webp"
                                alt="Johns Hopkins APL"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a>
                        <a href="https://www.ertcorp.com/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/ert.webp"
                                alt="ERT"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a>
                        <a href="https://entrepreneurship.umbc.edu/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/alexbrowncenter.webp"
                                alt="Alex Brown Center"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a>
                              //bronze 
                        <a href="https://boozallen.com/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/BAH.webp"
                                alt="Booz Allen Hamilton"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a>
                        <a href="https://cwit.umbc.edu/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/CWIT.webp"
                                alt="CWIT"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a>
                        <a href="https://csee.umbc.edu/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/CSEE.webp"
                                alt="CSEE"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a>
                        <a href="https://www.bestgateeng.com/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/bestgate.webp"
                                alt="Bestgate"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a>
                        <a href="https://www.nex-sys.tech/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/Nexsys.webp"
                                alt="Nexsys Labs"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a>
                        <a href="https://firaxis.com/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/Firaxis.webp"
                                alt="Firaxis Games"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a>
                        <a href="https://www.clipstudio.net/en/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/clip-studio.webp"
                                alt="Clip Studio Paint"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a>
                        
                        // partners 
                        <a href="https://mlh.link/MLH-PureButtons-hackathons" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/pure-buttons.webp"
                                alt="Pure Buttons"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a>
                        <a href="https://mlh.io/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="https://static.mlh.io/brand-assets/logo/official/mlh-logo-white.png"
                                alt="MLH"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a>
                        {/* <a href="https://northropgrumman.com/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/northrop.webp"
                                alt="Northrop Grumman"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a> 
                    </div>
                    ── END OLD SPONSOR LOGOS ── */}
                     {/* ── WORKSHOPS ── */}
                    <div className="workshops-list">
                        {workshops.map((workshop, index) => (
                            <div className="workshop-card" key={index} data-aos="fade-up">
                                <h3 className="workshop-title">{workshop.title}</h3>
                                <p className="workshop-host">Hosted by: {workshop.host}</p>
                                <p className="workshop-description">{workshop.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
}