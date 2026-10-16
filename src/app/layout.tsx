import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Parth Jha — Full-Stack Developer & AI Engineer",
  description:
    "Java and full-stack developer building backend-heavy systems and agentic AI — Spring Boot, Redis, FastAPI, LangGraph. Based in Bangalore, India.",
  openGraph: {
    title: "Parth Jha — Full-Stack Developer & AI Engineer",
    description:
      "Spring Boot services, payment reconciliation agents, RAG and recommendation engines. Based in Bangalore, India.",
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
