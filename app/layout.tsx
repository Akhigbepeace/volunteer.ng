import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "animate.css";
import AppLayout from "./app-layout";
import { ReactNode } from "react";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Volunteer.ng",
  description: "Building Nigeria Through Service",
};

type RootLayoutProp = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProp) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
