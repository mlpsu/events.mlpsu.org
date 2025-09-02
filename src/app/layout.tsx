import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MLPSU Events",
  description: "Machine Learning at Penn State University events and workshops",
  openGraph: {
    title: "MLPSU Events",
    description: "Machine Learning at Penn State University events and workshops",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "MLPSU Events",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MLPSU Events",
    description: "Machine Learning at Penn State University events and workshops",
    images: ["/og.png"],
  },
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
