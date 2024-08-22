"use client";
import "../css/Sponsors.css";
import SectionTitle from "../components/title";

export default function Sponsors() {
    function SponsorTier({ title, iconSrc, children }) {
        return (
            <div className="sponsor-tier-container">
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
            <div className="sponsors-content">
                <div className="sponsor-section-title">
                    <SectionTitle title="2024 SPONSORS" />
                    <p>HACKUMBC 2024 Sponsors & Partners</p>
                </div>

                <div className="sponsor-tiers">
                    <SponsorTier title="DIAMOND" iconSrc="/diamond.png"> {/* added icons next to each tiers text */}
                        <img
                            src="/UMBC-COEIT.png"
                            alt="sponsor"
                            className="sponsor-logo"
                        />
                    </SponsorTier>
                    <SponsorTier title="PLATINUM" iconSrc="/platinum.png">
                        <img
                            src="/Logo_TRP_TwoComponentTwoColor_Digital_R.png"
                            alt="sponsor"
                            className="sponsor-logo"
                        />
                        <img
                            src="/northrop.png"
                            alt="sponsor"
                            className="sponsor-logo"
                        />
                    </SponsorTier>
                    <SponsorTier title="GOLD" iconSrc="/gold.png">
                        <img
                            src="/BAH.png"
                            alt="sponsor"
                            className="sponsor-logo"
                        />
                    </SponsorTier>
                    <SponsorTier title="SILVER" iconSrc="/silver.png">
                        <img
                            src="/cipher-tech.png"
                            alt="sponsor"
                            className="sponsor-logo"
                        />
                        <img
                            src="/intelligenisis.png"
                            alt="sponsor"
                            className="sponsor-logo"
                        />
                    </SponsorTier>
                    <SponsorTier title="BRONZE" iconSrc="/bronze.png">
                        <img
                            src="/CWIT.png"
                            alt="sponsor"
                            className="sponsor-logo"
                        />
                        <img
                            src="/makpar.png"
                            alt="sponsor"
                            className="sponsor-logo"
                        />
                    </SponsorTier>
                    <SponsorTier title="PARTNERS" iconSrc="/partners.png">
                        <img
                            src="/cah.png"
                            alt="sponsor"
                            className="sponsor-logo"
                        />
                        <img
                            src="https://static.mlh.io/brand-assets/logo/official/mlh-logo-white.png"
                            alt="sponsor"
                            className="sponsor-logo"
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
