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

    // Define FAQs - splitting into two columns
    const faqsColumnOne = [
        {
            question: "What is hackUMBC?",
            answer: "hackUMBC is a 24-hour hackathon, from September 28th to September 29th, held at the University of Maryland, Baltimore County, in the ITE and ENGR buildings. The event brings students together from different backgrounds and skill levels, all with the goal of using hardware and software to design and create projects of all types."
        },
        {
            question: "Who can attend the hackathon?",
            answer: "We invite any highschool, undergraduate, or graduate students to participate in hackUMBC! You do not need to be enrolled at UMBC to attend, but the event will be taking place at the University, in the ITE and ENGR buildings."
        },
        {
            question: "How do I register?",
            answer: "You can register by filling out the registration form, by clicking the registration button on the home page of this site! You will need your government issued, or student ID, and you will also have the option of submitting your resume!"
        },
        {
            question: "How do teams work for the hackathon?",
            answer: "You can either work solo or in teams of up to 4 members, and we will offer time at the beginning of the hackathon to network with potential team members."
        },
        {
            question: "What can I make? May I build on an existing project?",
            answer: "You can make anything you want! Web, mobile, hardware, and desktop projects are all encouraged and welcome! However, we strongly discourage building upon existing projects, as they will not be eligible for prizes."
        }
    ];

    const faqsColumnTwo = [
        {
            question: "Do I have to be an expert programmer, or know how to code?",
            answer: "Not at all! hackUMBC is a great way to learn something new! Workshops for beginners will be readily available to all attendees!"
        },
        {
            question: "What if I have other obligations during the hackathon?",
            answer: "We understand that it may be challenging to clear up the whole weekend, so you are allowed to come and go as needed!"
        },
        {
            question: "What if I would like to help out with the hackathon?",
            answer: "You can fill out a volunteer interest form that will be released a few weeks before hackUMBC begins. We will also begin looking for new organizers in the spring!"
        },
        {
            question: "Is there anywhere I can see some examples of old contestants projects?",
            answer: <>
                Yes! You can see examples at:{" "}
                <a
                    href="https://hackumbc-fall-2022.devpost.com/project-gallery"
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    https://hackumbc-fall-2022.devpost.com/project-gallery
                </a>
            </>
        },
        {
            question: "Will there be FREE FOOD provided?",
            answer: "Yes, and we accommodate all dietary restrictions, including vegans, vegetarians, halal, Gluten Free, and all allergies! Simply inform us of any such restrictions on the registration form!"
        }
    ];

    return (
        <div className="faq-page relative" style={{
            backgroundImage: "url('/hackumbc_bg.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
        }}>
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
        </div>
    );
}
