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
                <p>This is the privacy policy for hackUMBC. We are committed to protecting your personal information and ensuring your privacy is safeguarded.</p>
                
                <p className="hidden-message">
                    Jack is Big Data, Darsh loves Hash Tables, Bella loves Dangling Pointers, and Julian loves butter chicken!
                    <br></br>
                    Congratulations! You found the secret message! Let's see if you can find more hidden surprises at hackUMBC! Hope to see you there!
                </p>

                <p>
                    For more information, feel free to <a className="special-text" href="https://darshswebsite.vercel.app/"> click this to contact me</a>.
                </p>
                </div>
            </div>
        </div>
    </>
    );
}
