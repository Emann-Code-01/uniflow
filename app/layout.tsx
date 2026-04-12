import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UniFlow - Campus Timetable & Pulse",
  description: "Real-time timetable and campus updates for universities",
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}