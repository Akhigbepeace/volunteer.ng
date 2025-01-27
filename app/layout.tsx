import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "animate.css";
import { UserProvider } from "@/context/user-context";
import { GoogleOAuthProvider } from "@react-oauth/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Volunteer.ng",
  description: "Facilitating social impact",
};

type RootLayoutProp = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProp) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
        >
          <UserProvider>{children}</UserProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
