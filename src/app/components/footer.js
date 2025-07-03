"use client";
import "../css/footer.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from 'react';
import Link from 'next/link'; 

export default function Footer() {
    useEffect(() => {
        AOS.init({
            duration: 1400,
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
                    <Track title="GITHUB" link="https://github.com/umbchackers/hackumbc-web">
                        <img src="/github.PNG" alt="github-png" className="track-image"/>
                    </Track>
                </div>
                <div className="footer-info">
                    <p>&copy; 2025 hackUMBC. All rights reserved.</p>
                    <p className="mt-2">
                      <Link href="/privacy-policy" className="footer-link"> Privacy Policy</Link> |
                      <Link href="/terms-of-service" className="footer-link">Terms of Service</Link> |
                      <a href="mailto:hackumbc@umbc.edu" className="footer-link">Contact Us</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
