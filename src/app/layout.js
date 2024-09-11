  import { Inter } from "next/font/google";
  import "./globals.css";

  const inter = Inter({ subsets: ["latin"] });

  export const metadata = {
    title: "hackUMBC 2024 - Join the Ultimate Hackathon Experience!",
    description:
      "Register now for hackUMBC 2024, the premier hackathon event at UMBC. Collaborate, innovate, and showcase your skills with fellow tech enthusiasts. Don't miss out on this incredible opportunity!",
    keywords:
      "hackUMBC 2024, hackathon, UMBC, tech event, coding competition, innovation, collaboration, registration",
    author: "hackUMBC Organizers",
    robots: "index, follow",
    charset: "UTF-8",
    openGraph: {
      type: "website",
      url: "https://hackumbc.tech",
      title: "hackUMBC 2024 - Join the Ultimate Hackathon Experience!",
      description:
        "Register now for hackUMBC 2024, the premier hackathon event at UMBC. Collaborate, innovate, and showcase your skills with fellow tech enthusiasts. Don't miss out on this incredible opportunity!",
      image: "/hackLogo24.png",
    },
    twitter: {
      card: "summary_large_image",
      site: "@hackUMBC",
      title: "hackUMBC 2024 - Join the Ultimate Hackathon Experience!",
      description:
        "Register now for hackUMBC 2024, the premier hackathon event at UMBC. Collaborate, innovate, and showcase your skills with fellow tech enthusiasts. Don't miss out on this incredible opportunity!",
      image: "https://hackumbc.tech/next/image?url=%2FhackText24.png&w=1080&q=75",
    },
  };

  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <head>
          <link rel="icon" href="/hackLogo24.png" type="image/png" sizes="64x64"/>
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    );
  }
