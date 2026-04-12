import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "UniFlow - Real-time Campus Timetable & Pulse",
  description: "Official timetable and live campus updates for Adekunle Ajasin University",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} light`}>
      <body className="antialiased bg-(--color-bg-page) text-(--color-text-primary)">
        {children}
      </body>
    </html>
  );
}