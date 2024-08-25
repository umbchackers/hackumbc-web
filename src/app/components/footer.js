"use client";
import "../css/footer.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from 'react';
import SectionTitle from "../components/title";

export default function Footer() {

    useEffect(() => {
        AOS.init({
            duration: 1200,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    function Track({ title, link, children }) {
        return (
          <a href={link} target="_blank" rel="noopener noreferrer">
            <div className="track-item" data-aos="fade-in">
                {children}
                <h1 className="track-title">{title}</h1>
            </div>
          </a>
        );
    }

    return (
        <div className="footer-page">
            <div className="footer-content" data-aos="fade-in">
                <div className="tracks flex"> {/* adjusted the className styling for centering on mobile for tracks */}
                    <Track title="TWITTER" link="https://x.com/hackumbc2024">
                        <img src="/twitter.png" alt="twitter-png" className="track-image"/>
                    </Track>
                    <Track title="INSTAGRAM" link="https://www.instagram.com/hackumbc/?hl=en">
                        <img src="/instagram.png" alt="insta-png" className="track-image"/>
                    </Track>
                </div>
                <div className="footer-info">
                    <p>&copy; 2024 hackUMBC. All rights reserved.</p>
                    <p className="mt-2">
                      <a href="#" className="footer-link">Privacy Policy</a> |
                      <a href="#" className="footer-link">Terms of Service</a> |
                      <a href="#" className="footer-link">Contact Us</a>
                    </p>
                </div>
            </div>
        </div>
    )
};
