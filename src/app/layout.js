  import { Inter } from "next/font/google";
  import "./globals.css";

  const inter = Inter({ subsets: ["latin"] });

  export const metadata = {
    title: "hackUMBC 2025",
    description:
      "Register now for hackUMBC 2025, the premier hackathon event at UMBC. Collaborate, innovate, and showcase your skills with fellow tech enthusiasts. Don't miss out on this incredible opportunity!",
    keywords:
      "hackUMBC 2025, hackathon, UMBC, tech event, coding competition, innovation, collaboration, registration",
    author: "hackUMBC Organizers",
    robots: "index, follow",
    charset: "UTF-8",
    openGraph: {
      type: "website",
      url: "https://hackumbc.tech",
      title: "hackUMBC 2025 - Join the Ultimate Hackathon Experience!",
      description:
        "Register now for hackUMBC 2025, the premier hackathon event at UMBC. Collaborate, innovate, and showcase your skills with fellow tech enthusiasts. Don't miss out on this incredible opportunity!",
      image: "/hackumbcdog2025.png",
    },
    twitter: {
      card: "summary_large_image",
      site: "@hackUMBC",
      title: "hackUMBC 2025 - Join the Ultimate Hackathon Experience!",
      description:
        "Register now for hackUMBC 2025, the premier hackathon event at UMBC. Collaborate, innovate, and showcase your skills with fellow tech enthusiasts. Don't miss out on this incredible opportunity!",
      image: "",
    },
  };

  export default function RootLayout({ children }) {
    return (
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/hackumbcdog2025.png" type="image/png" sizes="64x64"/>
          <meta name="color-scheme" content="light dark" />
        </head>
        <body className={`${inter.className} antialiased`}>
            <div className="flex flex-col min-h-screen">
              <div className="flex-grow">
                {children}
              </div>
            </div>
        </body>
      </html>
    );
  }
