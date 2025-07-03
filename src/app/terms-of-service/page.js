"use client";
import "../css/privacy_policy.css";
import Navbar from "../components/navbar";
import SectionTitle from "../components/title";

export default function TermsOfService() {
  return (
    <>
      <Navbar />
      <div className="privacy-policy-page">
        <div className="privacy-policy-title" data-aos="fade-in">
          <SectionTitle title="Terms of Service" />
          <div className="privacy-policy-content">
            <p>Welcome to hackUMBC. By accessing or using our website and services, you agree to comply with and be bound by the following Terms of Service. Please read them carefully.</p>

            <h3>1. Acceptance of Terms</h3>
            <p>By using our website or participating in our event, you agree to these Terms of Service and our Privacy Policy. If you do not agree, please do not use our services.</p>

            <h3>2. User Conduct</h3>
            <ul>
              <li>Respect all participants, organizers, and sponsors.</li>
              <li>Do not engage in harassment, discrimination, or inappropriate behavior.</li>
              <li>Comply with all applicable laws and event rules.</li>
            </ul>

            <h3>3. Intellectual Property</h3>
            <p>All content on this website, unless otherwise stated, is the property of hackUMBC or its licensors. You may not use, reproduce, or distribute any content without permission.</p>

            <h3>4. Disclaimers</h3>
            <p>Our services are provided "as is" without warranties of any kind. We do not guarantee the accuracy, completeness, or reliability of any information on our website.</p>

            <h3>5. Limitation of Liability</h3>
            <p>hackUMBC and its organizers are not liable for any damages arising from your use of our website or participation in our event.</p>

            <h3>6. Changes to Terms</h3>
            <p>We may update these Terms of Service at any time. Changes will be posted on this page with an updated effective date.</p>

            <h3>7. Contact</h3>
            <p>If you have any questions about these Terms of Service, please contact us at <a className="special-text" href="mailto:hackumbc@gmail.com">hackumbc@gmail.com</a>.</p>
          </div>
        </div>
      </div>
    </>
  );
} 