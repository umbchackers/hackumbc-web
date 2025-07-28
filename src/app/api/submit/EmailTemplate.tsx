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
      You’re officially signed up for <b>hackUMBC 2025</b>, and we can't wait to
      see you for 24&nbsp;hours of building, learning, and fun this fall at UMBC!
    </p>

    {/* event details */}
    <h2>📅 Event Details</h2>
    <ul>
      <li>
        <b>🗓 Date:</b> September&nbsp;27-28, 2025
      </li>
      <li>
        <b>⏰ Check-In:</b> Saturday, September 27 at 9:00 AM - Engineering
        Atrium
      </li>
      <li>
        <b>📍 Location:</b> UMBC Engineering Building, 1000 Hilltop Circle,
        Baltimore, MD 21250
      </li>
    </ul>

    {/* discord */}
    <h2>🎧 Join the Discord</h2>
    <p>
      Connect with fellow participants, share ideas, and get updates by joining
      the <b>hackUMBC Fall 2025</b> Discord server. Make sure to follow the
      instructions in the <i>#rules-and-roles</i> channel after joining!
    </p>
    <p>
      <a href="https://discord.gg/Q79QPvEG" style={{
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
    <h2>🔗 Check-In QR Code</h2>
    <p>
      Don't forget! Your QR Code for check-in is attached below. Please have it
      ready to show the hackUMBC team when you arrive.
    </p>
    <img
      src={`https://quickchart.io/qr?text=${email}`}
      alt="Check-In QR Code"
    />

    {/* closing */}
    <h2>🎉 We Can't Wait to See You!</h2>
    <p>
      As the event gets closer, we'll send another email with details on what to
      bring, parking information, the full schedule, and the free meals you'll
      get throughout the weekend.
    </p>

    <p>
      If you have any questions, please reach out to us at{" "}
      <a href="mailto:hackumbc@gmail.com">hackumbc@gmail.com</a>.
    </p>

    <p><b>- The hackUMBC Team</b></p>
  </>
);