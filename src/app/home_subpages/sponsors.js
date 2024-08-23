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
            <div className="sponsor-tier-container" data-aos= "fade-up">
                <h1 className="sponsor-tier-title">
                    <img src={iconSrc} alt="icon" className="sponsor-icon" /> {/* modified the  titles to include the image icons */}
                    {title}
                    <img src={iconSrc} alt="icon" className="sponsor-icon" />
                </h1>
                <div className="sponsor-logos">
                    {children}
                </div>
            </div>
        );
    }

    return (
        <div className="sponsors-page">
            <div className="sponsors-content" >
                <div className="sponsor-section-title" data-aos= "fade-up">
                    <SectionTitle title="2024 SPONSORS" />
                    <p>HACKUMBC 2024 Sponsors & Partners</p>
                </div>

                <div className="sponsor-tiers">
                    <SponsorTier title="DIAMOND" iconSrc="/diamond.png" data-aos= "fade-up"> {/* added icons next to each tiers text */}
                        <img
                            src="/UMBC-COEIT.png"
                            alt="sponsor"
                            className="sponsor-logo"
                        />
                    </SponsorTier>
                    <SponsorTier title="PLATINUM" iconSrc="/platinum.png" data-aos= "fade-up">
                        <img
                            src="/Logo_TRP_TwoComponentTwoColor_Digital_R.png"
                            alt="sponsor"
                            className="sponsor-logo"
                            data-aos= "fade-up"
                        />
                        <img
                            src="/northrop.png"
                            alt="sponsor"
                            className="sponsor-logo"
                            data-aos= "fade-up"
                        />
                    </SponsorTier>
                    <SponsorTier title="GOLD" iconSrc="/gold.png" data-aos= "fade-up">
                        <img
                            src="/BAH.png"
                            alt="sponsor"
                            className="sponsor-logo"
                            data-aos= "fade-up"
                        />
                    </SponsorTier>
                    <SponsorTier title="SILVER" iconSrc="/silver.png" data-aos= "fade-up">
                        <img
                            src="/cipher-tech.png"
                            alt="sponsor"
                            className="sponsor-logo"
                            data-aos= "fade-up"
                        />
                        <img
                            src="/intelligenisis.png"
                            alt="sponsor"
                            className="sponsor-logo"
                            data-aos= "fade-up"
                        />
                    </SponsorTier>
                    <SponsorTier title="BRONZE" iconSrc="/bronze.png" data-aos= "fade-up">
                        <img
                            src="/CWIT.png"
                            alt="sponsor"
                            className="sponsor-logo"
                            data-aos= "fade-up"
                        />
                        <img
                            src="/makpar.png"
                            alt="sponsor"
                            className="sponsor-logo"
                            data-aos= "fade-up"
                        />
                    </SponsorTier>
                    <SponsorTier title="PARTNERS" iconSrc="/partners.png" data-aos= "fade-up">
                        <img
                            src="/cah.png"
                            alt="sponsor"
                            className="sponsor-logo"
                            data-aos= "fade-up"
                        />
                        <img
                            src="https://static.mlh.io/brand-assets/logo/official/mlh-logo-white.png"
                            alt="sponsor"
                            className="sponsor-logo"
                            data-aos= "fade-up"
                        />
                        <a
                            href="https://hackp.ac/mlh-standoutstickers-hackathons"
                            target="_blank"
                        >
                            <div className="sticker-logo" />
                        </a>
                    </SponsorTier>
                </div>
            </div>
        </div>
    );
}
