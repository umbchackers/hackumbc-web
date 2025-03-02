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
    }, []);

    function SponsorTier({ title, iconSrc, children }) {
        return (
            <div className="sponsors-tier-container" data-aos="fade-up">
                <h1 className="sponsors-tier-title">
                    <img src={iconSrc} alt="icon" className="sponsors-icon" />
                    {title}
                    <img src={iconSrc} alt="icon" className="sponsors-icon" />
                </h1>
                <div className="sponsors-logos">
                    {children}
                </div>
            </div>
        );
    }

    return (
        <div className="sponsors-page relative" style={{
            backgroundImage: "url('/hackumbc_bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
        }}>
            <div className="sponsors-section-title relative z-10 text-black" data-aos="fade-up">
                <SectionTitle title="SPONSORS" />
            </div>
            <div className="sponsors-title-subheading relative z-10 text-black" data-aos="fade-up">
                Thank You to Our Incredible Sponsors!
            </div>
            <div className="sponsors-content relative z-10" >
                <div className="sponsors-tiers">
                    <SponsorTier title="OUR AMAZING SPONSORS" iconSrc="/partners.png" data-aos="fade-up">
                        {/* Diamond */}
                        <a href="https://coeit.umbc.edu/" target="_blank" rel="noopener noreferrer" className="sponsor-link diamond">
                            <img
                                src="/coeit.png"
                                alt="sponsor"
                                className="sponsors-logo"
                                data-aos="fade-up"
                            />
                        </a>
                        
                        {/* Platinum */}
                        <a href="https://www.troweprice.com/" target="_blank" rel="noopener noreferrer" className="sponsor-link platinum">
                            <img
                                src="/trowepricelogo.jpg"
                                alt="sponsor"
                                className="sponsors-logo"
                                data-aos="fade-up"
                            />
                        </a>
                        
                        {/* Gold */}
                        <a href="https://nightwing.us/" target="_blank" rel="noopener noreferrer" className="sponsor-link gold">
                            <img
                                src="/nightwing.png"
                                alt="sponsor"
                                className="sponsors-logo"
                                data-aos="fade-up"
                            />
                        </a>
                        
                        {/* Silver */}
                        <a href="https://www.jhuapl.edu/" target="_blank" rel="noopener noreferrer" className="sponsor-link silver">
                            <img
                                src="/apl.png"
                                alt="sponsor"
                                className="sponsors-logo"
                                data-aos="fade-up"
                            />
                        </a>
                        <a href="https://www.ertcorp.com/" target="_blank" rel="noopener noreferrer" className="sponsor-link silver">
                            <img
                                src="/ert.jpg"
                                alt="sponsor"
                                className="sponsors-logo"
                                data-aos="fade-up"
                            />
                        </a>
                        <a href="https://entrepreneurship.umbc.edu/" target="_blank" rel="noopener noreferrer" className="sponsor-link silver">
                            <img
                                src="/alexbrowncenter.png"
                                alt="sponsor"
                                className="sponsors-logo"
                                data-aos="fade-up"
                            />
                        </a>
                        <a href="https://boozallen.com/" target="_blank" rel="noopener noreferrer" className="sponsor-link silver">
                            <img
                                src="/BAH.png"
                                alt="sponsor"
                                className="sponsors-logo"
                                data-aos="fade-up"
                            />
                        </a>
                        
                        {/* Bronze */}
                        <a href="https://cwit.umbc.edu/" target="_blank" rel="noopener noreferrer" className="sponsor-link bronze">
                            <img
                                src="/CWIT.jpg"
                                alt="sponsor"
                                className="sponsors-logo"
                                data-aos="fade-up"
                            />
                        </a>
                        <a href="https://csee.umbc.edu/" target="_blank" rel="noopener noreferrer" className="sponsor-link bronze">
                            <img
                                src="/CSEE.png"
                                alt="sponsor"
                                className="sponsors-logo"
                                data-aos="fade-up"
                            />
                        </a>
                        <a href="https://www.bestgateeng.com/" target="_blank" rel="noopener noreferrer" className="sponsor-link bronze">
                            <img
                                src="/bestgate.png"
                                alt="sponsor"
                                className="sponsors-logo"
                                data-aos="fade-up"
                            />
                        </a>
                        
                        {/* Partners */}
                        <a href="https://standoutstickers.com/" target="_blank" rel="noopener noreferrer" className="sponsor-link partner">
                            <img
                                src="/stand-out-stickers.png"
                                alt="sponsor"
                                className="sponsors-logo"
                                data-aos="fade-up"
                            />
                        </a>
                        <a href="https://mlh.io/" target="_blank" rel="noopener noreferrer" className="sponsor-link partner">
                            <img
                                src="https://static.mlh.io/brand-assets/logo/official/mlh-logo-white.png"
                                alt="sponsor"
                                className="sponsors-logo"
                                data-aos="fade-up"
                            />
                        </a>
                        <a href="https://northropgrumman.com/" target="_blank" rel="noopener noreferrer" className="sponsor-link partner">
                            <img
                                src="/northrop.png"
                                alt="sponsors"
                                className="sponsors-logo"
                                data-aos="fade-up"
                            />
                        </a>
                    </SponsorTier>
                </div>
            </div>
        </div>
    );
}
