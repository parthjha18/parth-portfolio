import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Parth Jha — Full-Stack Developer & ML Engineer",
  description:
    "Full-stack developer and ML engineer building systems where engineering meets intelligence. Based in Bangalore, India.",
  openGraph: {
    title: "Parth Jha — Full-Stack Developer & ML Engineer",
    description:
      "Building systems where engineering meets intelligence. Recommendation engines, geospatial platforms, and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full custom-cursor antialiased">
        {children}
      </body>
    </html>
  );
}
