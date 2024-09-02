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
                        <img
                            src="/UMBC-COEIT.png"
                            alt="sponsor"
                            className="sponsors-logo"
                            data-aos="fade-up"
                            href=""
                        />
                    </SponsorTier>
                    <SponsorTier title="PLATINUM" iconSrc="/platinum.png" data-aos= "fade-up">
                        <img
                            src="/trowepricelogo.jpg"
                            alt="sponsor"
                            className="sponsors-logo"
                            data-aos= "fade-up"
                            href=""
                        />
                        <img
                            src="/northrop.png"
                            alt="sponsor"
                            className="sponsors-logo"
                            data-aos= "fade-up"
                            href=""
                        />
                    </SponsorTier>
                    <SponsorTier title="GOLD" iconSrc="/gold.png" data-aos= "fade-up">
                        <img
                            src="/BAH.png"
                            alt="sponsor"
                            className="sponsors-logo"
                            data-aos= "fade-up"
                            href=""
                        />
                    </SponsorTier>
                    <SponsorTier title="SILVER" iconSrc="/silver.png" data-aos= "fade-up">
                        <img
                            src="/cipher-tech.png"
                            alt="sponsor"
                            className="sponsors-logo"
                            data-aos= "fade-up"
                            href=""
                        />
                        <img
                            src="/intelligenisis.png"
                            alt="sponsor"
                            className="sponsors-logo"
                            data-aos= "fade-up"
                            href=""
                        />
                    </SponsorTier>
                    <SponsorTier title="BRONZE" iconSrc="/bronze.png" data-aos= "fade-up">
                        <img
                            src="/CWIT.png"
                            alt="sponsor"
                            className="sponsors-logo"
                            data-aos= "fade-up"
                            href=""
                        />
                        <img
                            src="/makpar.png"
                            alt="sponsor"
                            className="sponsors-logo"
                            data-aos= "fade-up"
                            href=""
                        />
                    </SponsorTier>
                    <SponsorTier title="PARTNERS" iconSrc="/partners.png" data-aos= "fade-up">
                        <img
                            src="/cah.png"
                            alt="sponsor"
                            className="sponsors-logo"
                            data-aos= "fade-up"
                            href=""
                        />
                        <img
                            src="https://static.mlh.io/brand-assets/logo/official/mlh-logo-white.png"
                            alt="sponsor"
                            className="sponsors-logo"
                            data-aos= "fade-up"
                            href=""
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
