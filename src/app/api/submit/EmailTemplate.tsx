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
    <p>
      Hi {firstName} {lastName},
    </p>

    <p>
      You’re officially signed up for the <b>hackUMBC Mini Hackathon</b>! We're
      excited to see what you build during this high-energy, 12-hour sprint!
    </p>

    {/* event details */}
    <h2>📅 Event Details</h2>
    <ul
      style={{
        listStyleType: "disc",
        paddingLeft: "20px",
        margin: "10px 0",
        lineHeight: "1.6",
      }}
    >
      <li style={{ marginBottom: "10px" }}>
        <b>💡 Theme:</b> Open-Ended
      </li>
      <li style={{ marginBottom: "10px" }}>
        <b>👥 Team Size:</b> Maximum of 3 people
      </li>
      <li style={{ marginBottom: "10px" }}>
        <b>🗓 Date:</b> April 18th, 2026
      </li>
      <li style={{ marginBottom: "10px" }}>
        <b>⏰ Check-In:</b> Saturday, April 18th at 7:30 AM - ITE 2nd Floor
      </li>
      <li style={{ marginBottom: "10px" }}>
        <b>📍 Location:</b> UMBC Information Technology Engineering (ITE)
        Building, 1000 Hilltop Circle, Baltimore, MD 21250
      </li>
    </ul>

    {/* MLH registration */}
    <h2>Official MLH Registration</h2>
    <p>
      To make things official and ensure you're eligible for prizes, please 
      complete your registration on the <b>Major League Hacking (MLH)</b> platform:
    </p>
    <p>
      <a
        href="https://events.mlh.io/events/13940-hackumbc-mini-hackathon"
        style={{
          display: "inline-block",
          backgroundColor: "#be1e2d",
          color: "#ffffff",
          padding: "10px 20px",
          textDecoration: "none",
          borderRadius: "5px",
          fontWeight: "bold",
        }}
      >
        Complete MLH Registration
      </a>
    </p>

    {/* discord */}
    <h2>🎧 Join the Discord</h2>
    <p>
      Connect with fellow participants, share ideas, and get updates by joining
      the hackUMBC Community Discord server. Make sure to follow the
      instructions in the <i>#rules</i> channel after joining!
    </p>
    <p>
      <a
        href="https://discord.gg/cBVF7vHdUK"
        style={{
          display: "inline-block",
          backgroundColor: "#5865F2",
          color: "#ffffff !important",
          padding: "10px 20px",
          textDecoration: "none",
          borderRadius: "5px",
          fontWeight: "bold",
          border: "none",
          cursor: "pointer",
        }}
      >
        Join here!
      </a>
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
    <h2>🎉 We Can't Wait to See You!</h2>
    <p>
      As the event gets closer, we'll send another email with details on parking
      information, the full schedule, and the free meals you'll get throughout
      the day.
    </p>

    <p>
      If you have any questions, please reach out to us at{" "}
      <a href="mailto:hackumbc@gmail.com">hackumbc@gmail.com</a>.
    </p>

    <p>
      <b>- The hackUMBC Team</b>
    </p>
  </>
);
