"use client";
import "../css/faq.css";
import SectionTitle from "../components/title";

export default function FAQ() {
  function FAQItem({ question, answer }) {
    return (
      <div className="faq-item">
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
      <div className="title">
        <SectionTitle title="FAQ" /> {/*sections inside this badly need to be changed to be more in depth and addressing important questions*/}
      </div>
      <div className="faq-content">
        <FAQItem
          question="What is hackUMBC?"
          answer="hackUMBC is a 24-hour hackathon event where students collaborate to build innovative projects! its a month away lol"
        />
        <FAQItem
          question="How do I register?"
          answer="You can register by filling out a type form, by clicking the registration button on the home page."
        />
        <FAQItem
          question="Do I really need to stay the whole 24 hours?"
          answer="Yes we are going to hold you hostage, on me."
        />
      </div>
    </div>
  );
}
