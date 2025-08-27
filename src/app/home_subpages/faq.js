"use client";
import "../css/faq.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import SectionTitle from "../components/title";
import useIsMobile from '../../lib/use_is_mobile';
import MobileSvgTiler from '../components/mobile-svg-tiler';

export default function FAQ() {
    const isMobile = useIsMobile();
    const showContent = true;

    useEffect(() => {
        AOS.init({
            duration: 1200,
            easing: 'ease-in-out',
            once: true,
        });
        AOS.refresh();
    }, []);

    function FAQItem({ question, answer }) {
        return (
        <div className="faq-item" data-aos="fade-up">
            <input type="checkbox" opacity="0" id={`faq-${question}`} className="faq-toggle" 
            style={{opacity: 0}}/>
            <label htmlFor={`faq-${question}`} className="faq-question">
            {question}
            </label>
            <div className="faq-answer">
            {answer}
            </div>
        </div>
        );
    }

    // define FAQs - splitting into two columns
    const faqsColumnOne = [
        {
            question: "What is hackUMBC?",
            answer: "hackUMBC is a 24-hour hackathon, from September 27th to September 28th, held at the University of Maryland, Baltimore County. The event brings students together from different backgrounds and skill levels, all with the goal of using hardware and software to design and create projects of all types. is a 24-hour hackathon, usually in September, held at the University of Maryland, Baltimore County, in the TBD building. The event brings students together from different backgrounds and skill levels, all with the goal of using hardware and software to design and create projects of all types."
        },
        {
            question: "Who can attend the hackathon?",
            answer: "Any high school or university student is welcome! You don’t need to be a UMBC student to participate, though the event will be held on campus."
        },
        {
            question: "How do I register?",
            answer: "Click the registration button on our home page and fill out the form. You’ll also have the option to submit your resume!"
        },
        {
            question: "How do teams work for the hackathon?",
            answer: "You can either work solo or in teams of up to 4 members, and we will offer time at the beginning of the hackathon to network with potential team members."
        },
        {
            question: "What can I make? May I build on an existing project?",
            answer: "You can make anything you want! Web, mobile, hardware, and desktop projects are all encouraged and welcome! However, we strongly discourage building upon existing projects, as they will not be eligible for prizes."
        },
        {
            question: "Will there be FREE FOOD provided?",
            answer: "Yes, and we accommodate all dietary restrictions, including vegan, vegetarian, halal, gluten free, and common allergies. Just let us know on the registration form!"
        }
    ];

    const faqsColumnTwo = [
        {
            question: "Do I have to be an expert programmer, or know how to code?",
            answer: "Not at all! hackUMBC is a great way to learn something new! Workshops for beginners will be readily available to all participants!"
        },
        {
            question: "What if I have other obligations during the hackathon?",
            answer: "We understand that it may be challenging to clear up the whole weekend, so you are allowed to come and go as needed!"
        },
        {
            question: "Is travel reimbursement provided?",
            answer: "Unfortunately, we aren’t able to offer travel reimbursements this year due to budget limitations. We’d still love to have you join us at hackUMBC, and we’ll make sure the weekend is worth the trip!"
        },
        {
            question: "What if I would like to help out with the hackathon?",
            answer: "You can fill out a volunteer interest form that will be released a few weeks before hackUMBC begins. We will also begin looking for new organizers in the spring!"
        },
        {
            question: "Is there anywhere I can see some examples of old contestants’ projects?",
            answer: <>
                Yes! You can see examples at:{" "}
                <a
                    href="https://hackumbc-fall-2024.devpost.com/project-gallery"
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    https://hackumbc-fall-2024.devpost.com/project-gallery
                </a>
            </>
        },
        {
            question: "Where can I view the MLH Code of Conduct?",
            answer: <>
                You can view it here:{" "}
                <a
                    href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    MLH Code of Conduct
                </a>
            </>
        }
    ];

    return (
        <div className="faq-page relative" style={{
            backgroundImage: "url('/hackumbc_bg_faq.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "relative",
        }}>
            <MobileSvgTiler 
                show={isMobile} 
                topSrc="/hackumbc_bg_mobile_faq.svg" 
                tileSrc="/hackumbc_bg_mobile_faq2.svg" 
                aspectRatio={1440/1019.2}
            />
            {showContent && (
                <>
            <div className="faq-section-title relative z-10 text-black" data-aos="fade-up">
                <SectionTitle title="FAQ"/>
            </div>
            <div className="faq-title-subheading relative z-10 text-black" data-aos="fade-up">Frequently Asked Questions</div>
            <div className="faq-content relative z-10">
                <div className="faq-columns">
                    <div className="faq-column">
                        {faqsColumnOne.map((faq, index) => (
                            <FAQItem
                                key={`faq-col1-${index}`}
                                question={faq.question}
                                answer={faq.answer}
                            />
                        ))}
                    </div>
                    <div className="faq-column">
                        {faqsColumnTwo.map((faq, index) => (
                            <FAQItem
                                key={`faq-col2-${index}`}
                                question={faq.question}
                                answer={faq.answer}
                            />
                        ))}
                    </div>
                </div>
                </div>
            </>
            )}
        </div>
    );
}
