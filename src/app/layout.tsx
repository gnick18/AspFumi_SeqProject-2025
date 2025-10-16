import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import Navigation from "@/components/Navigation";
import GoogleAnalytics from "@/components/Analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Global Aspergillus fumigatus Af293/Cea10 Community Sequencing Initiative",
  description: "A global community science initiative for Aspergillus fumigatus sequencing collaboration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        {/* ADDING THE ANALYTICS COMPONENT HERE */}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
