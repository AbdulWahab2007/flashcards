import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Red_Hat_Display } from "next/font/google";
import { Open_Sans } from "next/font/google";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import BottomMenu from "@/components/ui/bottomMenu";
import { WordsProvider } from "./context/globalContext";
export const metadata: Metadata = {
  title: "Flash",
  description: "A flashcard app for your ease.",
  manifest: "/manifest.json",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
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
    <WordsProvider>
      <html
        lang="en"
        className={`${redHatDisplay.variable}  ${poppins.variable}  ${openSans.variable}`}
      >
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          <BottomMenu />
          <Toaster position="bottom-center" richColors />
        </body>
      </html>
    </WordsProvider>
  );
}
