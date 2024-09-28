import * as React from 'react';

interface EmailTemplateProps {
  firstName: string,
  lastName: string
  email: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  lastName,
  email
}) => (
  <>
  <p>Hi {firstName} {lastName}</p>
    <p>The countdown has begun, and we’re thrilled to have you join us for <b>hackUMBC Fall 2024!</b> Get ready for an action-packed 24 hours of building projects, attending workshops, and having fun—all happening in person this weekend at <b>UMBC ITE/ENGR</b>.</p>
    <h2>Join the hackUMBC Discord</h2>
    <p>Connect with fellow participants, share ideas, and get updates by joining the <a href="https://discord.gg/EWMvcMEJAB">hackUMBC Fall 2024 Discord server</a>. Make sure to follow the instructions in the rules and roles section upon joining!</p>
    <h2>Event Details: Check-In + Opening Ceremony</h2>
    <ul>
      <li><b>Date:</b> September 28, 2024</li>
      <li><b>Check-In Time:</b> 9:00 AM, at <b>ITE First Floor Atrium</b></li>
      <li><b>Opening Ceremony:</b> 10:00 AM, at <b>ITE 104</b></li>
    </ul>
    <p>For the full event schedule and details, visit our website: <a href="https://hackumbc.tech">hackUMBC.tech</a>.</p>
    <h2>Check-In QR Code</h2>
    <p>Don’t forget! Your <b>QR Code</b> for check-in is attached below. Please have it ready to show the hackUMBC team when you arrive.</p>
    <img src={`https://quickchart.io/qr?text=${email}`}/>
    <h2>Location + Parking Info</h2>
    <p>We’re excited to host hackUMBC Fall 2024 at:</p>
    <p><b><u>UMBC Information Technology and Engineering (ITE) Building</u></b><br/>1000 Hilltop Rd<br/>Baltimore, MD 21250</p>
    <p>Parking is <b>free</b> and available on site! Please find the <b>parking map</b> attached below for your convenience.</p>
    <h2>Food and Snacks</h2>
    <p>We’ve got you covered! There will be <b>free meals and snacks</b> provided throughout the event, with options available for <b>all dietary restrictions</b>, so you can stay fueled and focused on your projects!</p>
    <h2>What to Bring</h2>
    <p>To make the most of your hackathon experience, remember to bring:</p>
    <ul>
      <li>A valid student or government-issued ID</li>
      <li>Your laptop and charger</li>
      <li>If staying overnight, don’t forget:
      <ul>
        <li>Blankets, sleeping bags, pillows</li>
        <li>Hygiene products (toothbrush, deodorant, etc.)</li>
      </ul>      
      </li>
    </ul>
    <h2>We Can't Wait to See You!</h2>
    <p>We’re excited to have you as part of hackUMBC Fall 2024! If you have any questions, don’t hesitate to reach out to us at <b>hackumbc@umbc.edu</b>.</p>
    <p>Let’s make this an unforgettable weekend of creativity and innovation!</p>
    <p>Best regards,<br/>
    The hackUMBC Team</p>;
    </>
);