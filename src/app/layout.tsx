import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Red_Hat_Display } from "next/font/google";
import { Open_Sans } from "next/font/google";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Flash",
  description: "A flashcard app for you ease.",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#000000",
  manifest: "/manifest.json",
};

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-redhat",
});
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300"],
  variable: "--font-opensans",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-poppins",
});
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
    <html
      lang="en"
      className={`${redHatDisplay.variable}  ${poppins.variable}  ${openSans.variable}`}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster position="bottom-center" richColors />
      </body>
    </html>
  );
}
