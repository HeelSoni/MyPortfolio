import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";
import DataBackground from "./components/DataBackground";
import ScrollProgress from "./components/ScrollProgress";
import TacticalOverlay from "./components/TacticalOverlay";
import Preloader from "./components/Preloader";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });

export const metadata: Metadata = {
  title: "Heel Soni | Data Analyst",
  description: "Portfolio of Heel Soni, Data Analyst bridging analytics and strategy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} antialiased bg-black text-[#ededed]`}>
      <body className="min-h-screen flex flex-col font-sans relative bg-transparent overflow-x-hidden">
        <Preloader />
        <DataBackground />
        <TacticalOverlay />
        <CustomCursor />
        <ScrollProgress />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
