import BottomNavBar from "../components/bottomNavbar";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import { Viewport } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import TopNavbar from '@/components/topNavbar';
import GoogleAnalytics from "@/components/GoogleAnalytics";
import DisclaimerModal from "@/components/disclaimer/DisclaimerModal";
export const metadata: Metadata = {
  title: "Gecian Hub",
  description: "An app for GEC Palakkad students",
  manifest: "/manifest.webmanifest",
  themeColor: "#000000",
  applicationName: "Gecian Hub",
  category: "Education",
  keywords: [
    "GEC",
    "GEC Palakkad",
    "student portal",
    "complaints",
    "expenses",
    "projects",
    "hackathons",
    "attendance",
  ],
  metadataBase: new URL("https://gecian-hub.pages.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://gecian-hub.pages.dev/",
    siteName: "Gecian Hub",
    title: "Gecian Hub — Student portal for GEC Palakkad",
    description:
      "A modern student portal for GECians to manage complaints, expenses, attendance, clubs, and events.",
    images: [
      {
        url: "/api/og?title=Gecian%20Hub",
        width: 1200,
        height: 630,
        alt: "Gecian Hub",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@gecian_hub",
    creator: "@gecian_hub",
    title: "Gecian Hub — Student portal for GEC Palakkad",
    description:
      "A modern student portal for GECians to manage complaints, expenses, attendance, clubs, and events.",
    images: ["/api/og?title=Gecian%20Hub"],
  },
  verification: {
    google: "", // add your Google site verification if available
    other: {
      "msvalidate.01": [""], // Bing verification placeholder
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Gecian Hub",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Organization JSON-LD */}
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Gecian Hub",
            url: "https://gecian-hub.pages.dev/",
            logo: "https://gecian-hub.pages.dev/icon-192.png",
            sameAs: [
              "https://www.linkedin.com",
              "https://twitter.com/gecian_hub",
            ],
          }}
        />
        <TopNavbar />
        <GoogleAnalytics />
        <DisclaimerModal />
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: "bg-gray-800 text-white",
            style: {
              fontFamily: "var(--font-geist-sans)",
              fontSize: "14px",
            },
          }}></Toaster>
        <BottomNavBar />
      </body>
    </html>
  );
}

