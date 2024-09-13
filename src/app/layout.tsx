import "./global.css";
import { DM_Serif_Display, Inter } from "next/font/google";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  display: "swap",
  style: "normal",
  variable: "--font-dm-serif-display",
  weight: ["400"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg"></link>
      </head>
      <body className="bg-dark-primary text-white font-inter">
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
