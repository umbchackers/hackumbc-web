"use client";
import "../css/Sponsors.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from 'react';
import SectionTitle from "../components/title";

export default function Sponsors() {

    useEffect(() => {
        AOS.init({
            duration: 1200,
            easing: 'ease-in-out',
            once: true,
        });
        AOS.refresh();
    }, []);

    return (
        <div className="sponsors-page relative" style={{
            backgroundImage: "url('/hackumbc_bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
        }}>
            <div className="sponsors-section-title relative z-10 text-black" data-aos="fade-up">
                <SectionTitle title="SPONSORS"/>
            </div>
            <div className="sponsors-title-subheading relative z-10 text-black" data-aos="fade-up">
                Thank You to Our Incredible Sponsors!
            </div>
            <div className="sponsors-content relative z-10" data-aos="fade-up">
                <div className="sponsors-unified-container" data-aos="fade-up">
                    <div className="sponsors-intro-text">
                        hackUMBC wouldn't be possible without the generous support of our sponsors, click on their logos to check them out!
                    </div>
                    <div className="sponsors-all-logos">
                        {/* Diamond */}
                        <a href="https://coeit.umbc.edu/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/coeit.png"
                                alt="COEIT"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a>
                        
                        {/* Platinum */}
                        <a href="https://www.troweprice.com/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/trowepricelogo.jpg"
                                alt="T. Rowe Price"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a>
                        
                        {/* Gold */}
                        <a href="https://nightwing.us/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/nightwing.png"
                                alt="Nightwing"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a>
                        
                        {/* Silver */}
                        <a href="https://www.jhuapl.edu/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/apl.png"
                                alt="Johns Hopkins APL"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a>
                        <a href="https://www.ertcorp.com/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/ert.jpg"
                                alt="ERT"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a>
                        <a href="https://entrepreneurship.umbc.edu/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/alexbrowncenter.png"
                                alt="Alex Brown Center"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a>
                        <a href="https://boozallen.com/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/BAH.png"
                                alt="Booz Allen Hamilton"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a>
                        
                        {/* Bronze */}
                        <a href="https://cwit.umbc.edu/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/CWIT.jpg"
                                alt="CWIT"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a>
                        <a href="https://csee.umbc.edu/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/CSEE.png"
                                alt="CSEE"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a>
                        <a href="https://www.bestgateeng.com/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/bestgate.png"
                                alt="Bestgate"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a>
                        
                        {/* Partners */}
                        <a href="https://standoutstickers.com/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/stand-out-stickers.png"
                                alt="Stand Out Stickers"
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
                        <a href="https://northropgrumman.com/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/northrop.png"
                                alt="Northrop Grumman"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
