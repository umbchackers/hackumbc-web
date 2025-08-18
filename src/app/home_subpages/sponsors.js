"use client";
import "../css/Sponsors.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from 'react';
import SectionTitle from "../components/title";
import useIsMobile from '../../lib/use_is_mobile';
import MobileSvgTiler from '../components/mobile-svg-tiler';

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

    return (
        <div className="sponsors-page relative" style={{
            backgroundImage: "url('/hackumbc_bg_sponsors.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "relative"
        }}>
            <MobileSvgTiler 
                show={isMobile} 
                topSrc="/hackumbc_bg_mobile_sponsors3.svg" 
                tileSrc="/hackumbc_bg_mobile_sponsors3.svg" 
                aspectRatio={1440/1019.2}
            />
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
                        {/* diamond */}
                        <a href="https://coeit.umbc.edu/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/coeit.webp"
                                alt="COEIT"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a>
                        
                        {/* platinum */}
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
                        
                        {/* Gold */}
                        <a href="https://www.lockheedmartin.com/en-us/index.html" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/lockheedmartin.webp"
                                alt="Lockheed Martin"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a>
                        
                        {/* Silver */}
                        <a href="https://nightwing.us/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/nightwing.webp"
                                alt="Nightwing"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a>
                        
                        {/* silver */}
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
                        <a href="https://boozallen.com/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/BAH.webp"
                                alt="Booz Allen Hamilton"
                                className="sponsors-logo"
                                loading="eager"
                            />
                        </a>
                        
                        {/* bronze */}
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
                        
                        {/* partners */}
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
                        <a href="https://northropgrumman.com/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/northrop.webp"
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