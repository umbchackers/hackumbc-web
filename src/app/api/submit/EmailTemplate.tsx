import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  lastName: string;
  email: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  lastName,
  email,
}) => (
  <>
    {/* greeting */}
    <p>Hi {firstName} {lastName},</p>

    <p>
      You’re officially signed up for the <b>hackUMBC Mini Hackathon</b>! We're excited to see what you 
      build during this high-energy, 12-hour sprint!
    </p>

    {/* theme & rules */}
    <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px', backgroundColor: '#fcfcfc' }}>
      <p style={{ margin: 0 }}><b>💡 Theme:</b> Open-Ended</p>
      <p style={{ margin: '5px 0 0 0' }}><b>👥 Team Size:</b> Maximum of 3 people</p>
    </div>

    {/* event details */}
    <h2>📅 Event Details</h2>
    <ul>
      <li>
        <b>🗓 Date:</b> April&nbsp;18th, 2026
      </li>
      <li>
        <b>⏰ Check-In:</b> Saturday, April 18th at 7:30 AM - ITE
        2nd Floor
      </li>
      <li>
        <b>📍 Location:</b> UMBC Information Technology Engineering (ITE) Building, 1000 Hilltop Circle,
        Baltimore, MD 21250
      </li>
    </ul>

    {/* workshops & prizes */}
    <h2>🏆 Why Attend?</h2>
    <p>We have an incredible lineup for this mini hackathon, including:</p>
    <ul>
       <li><b>Workshops:</b> Technical sessions hosted by <b>GDG</b> and <b>CWIT Cyber Leads</b>.</li>
       <li><b>Big Prizes:</b> Win a <b>Nintendo Switch 2</b> (1st), <b>Holy Stone Drones</b> (2nd), or <b>Amazon Fire Sticks 4K</b> (3rd)!</li>
    </ul>

    {/* discord */}
    <h2>🎧 Join the Discord</h2>
    <p>
      Connect with fellow participants, share ideas, and get updates by joining
      the hackUMBC Community Discord server. Make sure to follow the
      instructions in the <i>#rules-and-roles</i> channel after joining!
    </p>
    <p>
      <a href="https://discord.gg/cBVF7vHdUK" style={{
        display: 'inline-block',
        backgroundColor: '#5865F2',
        color: '#ffffff !important',
        padding: '10px 20px',
        textDecoration: 'none',
        borderRadius: '5px',
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer'
      }}>Join here!</a>
    </p>

    {/* qr code */}
    {/* <h2>🔗 Check-In QR Code</h2>
    <p>
      Don't forget! Your QR Code for check-in is attached below. Please have it
      ready to show the hackUMBC team when you arrive.
    </p>
    <img
      src={`https://quickchart.io/qr?text=${email}`}
      alt="Check-In QR Code"
    /> */}

    {/* closing */}
    <h2>🎉 We can't wait to see you!</h2>
    <p>
      As the event gets closer, we'll send another email with details on parking information, the full schedule, 
      and the free meals you'll get throughout the day.
    </p>

    <p>
      If you have any questions, please reach out to us at{" "}
      <a href="mailto:hackumbc@gmail.com">hackumbc@gmail.com</a>.
    </p>

    <p><b>- The hackUMBC Team</b></p>
  </>
);
