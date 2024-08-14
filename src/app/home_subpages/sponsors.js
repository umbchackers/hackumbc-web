"use client";
import "../css/Sponsors.css";
import SectionTitle from "../components/title";

export default function Sponsors() {
    function SponsorTier({ title, children }) {
        return (
            <div className="sponsor-tier-container">
                <h1 className="sponsor-tier-title">{title}</h1>
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
                    <SponsorTier title="DIAMOND">
                        <img
                            src="/UMBC-COEIT.png"
                            alt="sponsor"
                            className="sponsor-logo"
                        />
                    </SponsorTier>
                    <SponsorTier title="PLATINUM">
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
                    <SponsorTier title="GOLD">
                        <img
                            src="/BAH.png"
                            alt="sponsor"
                            className="sponsor-logo"
                        />
                    </SponsorTier>
                    <SponsorTier title="SILVER">
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
                    <SponsorTier title="BRONZE">
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
                    <SponsorTier title="PARTNERS">
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
