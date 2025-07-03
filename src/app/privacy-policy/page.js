"use client";
import "../css/privacy_policy.css";
import Navbar from "../components/navbar";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from 'react';
import SectionTitle from "../components/title";

export default function PrivacyPolicy() {

    useEffect(() => {
        AOS.init({
            duration: 1400,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    return (
        <>
        <Navbar />
        <div className="privacy-policy-page">
            <div className="privacy-policy-title" data-aos="fade-in">
                <SectionTitle title="Privacy Policy" />
                <div className="privacy-policy-content">
                <p>Welcome to hackUMBC. Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or participate in our event.</p>

                <h3>Information We Collect</h3>
                <ul>
                    <li><strong>Personal Information:</strong> We may collect your name, email address, university affiliation, and other information you provide when registering for hackUMBC or contacting us.</li>
                    <li><strong>Usage Data:</strong> We may collect information about how you interact with our website, such as browser type, and pages visited.</li>
                </ul>

                <h3>How We Use Your Information</h3>
                <ul>
                    <li>To organize and manage hackUMBC events and activities</li>
                    <li>To communicate important updates and information</li>
                    <li>To improve our website and services</li>
                    <li>To comply with legal obligations</li>
                </ul>

                <h3>How We Share Your Information</h3>
                <ul>
                    <li>With event partners and sponsors, only as necessary for event logistics</li>
                    <li>With service providers who assist in operating our website and event</li>
                    <li>As required by law or to protect our rights</li>
                </ul>

                <h3>Data Security</h3>
                <p>We implement reasonable measures to protect your information from unauthorized access, disclosure, or loss. However, no method of transmission over the Internet is 100% secure.</p>

                <h3>Your Rights</h3>
                <p>You may request access to, correction of, or deletion of your personal information by contacting us. We will respond to your request in accordance with applicable laws.</p>

                <h3>Changes to This Policy</h3>
                <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.</p>

                <h3>Contact Information</h3>
                <p>If you have any questions or concerns about this Privacy Policy, please email us at <a className="special-text" href="mailto:hackumbc@gmail.com">hackumbc@gmail.com</a>.</p>
                </div>
            </div>
        </div>
    </>
    );
}