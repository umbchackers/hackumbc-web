"use client";
import "../css/faq.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import SectionTitle from "../components/title";

export default function FAQ() {

    useEffect(() => {
        AOS.init({
            duration: 1200,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    function FAQItem({ question, answer }) {
        return (
        <div className="faq-item" data-aos= "fade-up">
            <input type="checkbox" id={`faq-${question}`} className="faq-toggle" />
            <label htmlFor={`faq-${question}`} className="faq-question">
            {question}
            </label>
            <div className="faq-answer">
            {answer}
            </div>
        </div>
        );
    }

    return (
        <div className="faq-page [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
        <div className="faq-section-title" data-aos="fade-up">
            <SectionTitle title="FAQ"/> {/*sections inside this now changed, some things might need to be fixed*/}
        </div>
        <div className= "faq-title-subheading" data-aos="fade-up">Frequently Asked Questions</div> {/* added section titles and subheadings */}
        <div className="faq-content" data-aos= "fade-up">
            <FAQItem
            question="What is hackUMBC?"
            answer="hackUMBC is a 24-hour hackathon event where students collaborate to build innovative projects!"
            />
            <FAQItem
            question="How do I register?"
            answer="You can register by filling out a type form, by clicking the registration button on the home page of this site! 
            You will need your government issued, or student ID and resume!"
            />
            <FAQItem
            question="Do I really need to stay the whole 24 hours?"
            answer="No! While you can stay the full 24 hours, you can drop in and exit whenever you need!"
            />
            <FAQItem
            question="Who can attend?"
            answer="Firstly, you do not need to be enrolled at UMBC to attend! Any high school or undergrad student can participate!"
            />
            <FAQItem
            question="What can I make? May I build on an existing project?"
            answer="You can make anything! Web, mobile, hardware, and desktop projects are all encouraged and welcome! 
            However, we strongly discourage building upon exisiting projects, as they will not be eligible for prizes."
            />
            <FAQItem
            question="Do I have to be an expert programmer, or know how to code?"
            answer="Not at all! hackUMBC is a great way to learn something new! Workshops for beginners will be readily availble to all attendees!"
            />
            <FAQItem
            question="Will I need a team? Can I join a team? What's the team sizes?"
            answer="While we do reccommend a team, you can definitely work solo if you would like. Any Teams are limited to a size of 4."
            />
            <FAQItem
            question="Is there anywhere I can see some examples of old contestants projects?"
            answer="Yes! You can see examples at: https://hackumbc-fall-2022.devpost.com/project-gallery"
            />
        </div>
    </div>
    );
 }
