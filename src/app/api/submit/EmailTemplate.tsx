import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  lastName: string;
  email: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  lastName,
  email
}) => (
  <>
    <p>Hi {firstName} {lastName},</p>

    <p>We're excited to invite you to our upcoming <b>hackUMBC Mini Hackathon</b>—an 8-hour innovation sprint where you can showcase your creativity, tackle real-world challenges, and compete for amazing prizes!</p>

    <h2>📅 Event Details</h2>
    <ul>
      <li><b>📍 Location:</b> ITE Building (Room TBA)</li>
      <li><b>🗓 Date:</b> April 19, 2025</li>
      <li><b>⏰ Time:</b> 9:00 AM - 5:00 PM</li>
      <li><b>🍽 Food:</b> Breakfast snacks, lunch at noon, and afternoon snacks provided</li>
    </ul>

    <h2>🏆 Competition Format & Prizes</h2>
    <ul>
      <li><b>👥 Teams:</b> Up to 4 participants</li>
      <li><b>🎁 Prizes:</b></li>
      <ul>
        <li>Participation Gift: Pens</li>
        <li><b>🥇 1st Place:</b> $75 prize per person (Possible prizes: Beats, Mouse, Keyboard, Raspberry Pi)</li>
      </ul>
    </ul>

    <h2>🚀 Challenge Themes (Open-Ended)</h2>
    <ul>
      <li>🌍 <b>Campus Solutions</b> - Solve a UMBC-related problem</li>
      <li>♻ <b>Sustainability</b> - Tech-driven solutions for environmental impact</li>
      <li>🤖 <b>AI & Innovation</b> - Build AI-powered tools or chatbots</li>
    </ul>

    <h2>🛠 Pre-Event Workshops</h2>
    <p>Get prepped with our hands-on workshops leading up to the event!</p>
    <ul>
      <li><b>📍 Location:</b> ITE (Room TBA)</li>
      <li><b>🗓 Dates:</b> Fridays - March 14, March 25, April 4th, April 11th</li>
      <li><b>⏰ Time:</b> 12:00 - 1:00 PM</li>
    </ul>

    <h3>💡 Topics & Speakers:</h3>
    <ul>
      <li><b>Gemini & Google Cloud</b> - Tirth Patel (Google Developer Group)</li>
      <li><b>Web Development</b> - Romain Dzeinse & Momin Intihar (Tech Team)</li>
      <li><b>Scripting in Python</b> - Software Architecture & Design (SAD)</li>
      <li><b>Project Building</b> - Bella Goltser (hackUMBC Team)</li>
    </ul>

    <h2>🚀 Sign Up Now!</h2>
    <p>Don't miss out on this exciting hands-on event! Secure your spot and start preparing for an amazing hackathon experience.</p>

    <p>See you there!<br/><b>The hackUMBC Team</b></p>

    <h2>🔗 Check-In QR Code</h2>
    <p>To check in on the day of the event, please have your <b>QR Code</b> ready:</p>
    <img src={`https://quickchart.io/qr?text=${email}`} alt="Check-In QR Code" />

  </>
);
