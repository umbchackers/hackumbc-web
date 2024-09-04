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
            <div className="sponsors-tier-container" data-aos= "fade-up">
                <h1 className="sponsors-tier-title">
                    <img src={iconSrc} alt="icon" className="sponsors-icon" /> {/* modified the  titles to include the image icons */}
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
        <div className="sponsors-page">
            <div className="sponsors-content" >
                <div className="sponsors-section-title" data-aos= "fade-up">
                    <SectionTitle title="SPONSORS" />
                </div>
                <div className="sponsors-title-subheading" data-aos="fade-up">hackUMBC 2024 Sponsors</div> {/* added section titles and subheadings */}
                <div className="sponsors-tiers">
                    <SponsorTier title="DIAMOND" iconSrc="/diamond.png" data-aos= "fade-up"> {/* added icons next to each tiers text */}
                    <a href= "https://coeit.umbc.edu/" target="_blank" rel="noopener noreference">
                        <img
                            src="/UMBC-COEIT.png"
                            alt="sponsor"
                            className="sponsors-logo"
                            data-aos="fade-up"
                            href=""
                        />
                    </a>
                    </SponsorTier>
                    <SponsorTier title="PLATINUM" iconSrc="/platinum.png" data-aos= "fade-up">
                    <a href= "https://www.troweprice.com/" target="_blank" rel="noopener noreference">
                        <img
                            src="/trowepricelogo.jpg"
                            alt="sponsor"
                            className="sponsors-logo"
                            data-aos= "fade-up"
                        />
                    </a>
                    </SponsorTier>
                    <SponsorTier title="GOLD" iconSrc="/gold.png" data-aos= "fade-up">
                    <a href="https://www.boozallen.com/" target="_blank" rel="noopener noreferrer">
                        <img
                            src="/boozallen.png"
                            alt="sponsor"
                            className="sponsors-logo"
                            data-aos= "fade-up"
                        />
                    </a>
                    </SponsorTier>
                    <SponsorTier title="SILVER" iconSrc="/silver.png" data-aos= "fade-up">
                    <a href="https://www.jhuapl.edu/" target="_blank" rel="noopener noreferrer">
                        <img
                            src="/apl.png"
                            alt="sponsor"
                            className="sponsors-logo"
                            data-aos= "fade-up"
                        />
                    </a>
                    <a href="https://cwit.umbc.edu/alex-brown-center/" target="_blank" rel="noopener noreferrer">
                        <img
                            src="/alexbrowncenter.jpg"
                            alt="sponsor"
                            className="sponsors-logo"
                            data-aos= "fade-up"
                        />
                    </a>
                    </SponsorTier>
                    <SponsorTier title="BRONZE" iconSrc="/bronze.png" data-aos= "fade-up">
                    <a href="https://cwit.umbc.edu/" target="_blank" rel="noopener noreferrer">
                        <img
                            src="/CWIT.jpg"
                            alt="sponsor"
                            className="sponsors-logo"
                            data-aos= "fade-up"
                        />
                    </a>
                    <a href="https://reddrum.com/" target="_blank" rel="noopener noreferrer">
                        <img
                            src="/RedDrum.png"
                            alt="sponsor"
                            className="sponsors-logo"
                            data-aos= "fade-up"
                        />
                    </a>
                    <a href="https://bestgate.com/" target="_blank" rel="noopener noreferrer">
                        <img
                            src="/bestgate.png"
                            alt="sponsor"
                            className="sponsors-logo"
                            data-aos= "fade-up"
                        />
                    </a>
                    </SponsorTier>
                    <SponsorTier title="PARTNERS" iconSrc="/partners.png" data-aos= "fade-up">
                    <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                        <img
                            src="/github-sticker.svg"
                            alt="sponsor"
                            className="sponsors-logo"
                            data-aos= "fade-up"
                        />
                    </a>
                    <a href="https://standoutstickers.com/" target="_blank" rel="noopener noreferrer">
                        <img
                            src="/stand-out-stickers.png"
                            alt="sponsor"
                            className="sponsors-logo"
                            data-aos= "fade-up"
                        />
                    </a>
                    <a href="https://mlh.io/" target="_blank" rel="noopener noreferrer">
                        <img
                            src="https://static.mlh.io/brand-assets/logo/official/mlh-logo-white.png"
                            alt="sponsor"
                            className="sponsors-logo"
                            data-aos= "fade-up"
                        />
                    </a>
                    </SponsorTier>
                </div>
            </div>
        </div>
    );
}
