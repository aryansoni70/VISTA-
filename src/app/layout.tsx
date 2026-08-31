import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VISTA | Verification and Integrity Screening Technology",
  description:
    "Verify digital content authenticity using AI forensic analysis and blockchain technology. Upload content, get a Reality Score, and generate tamper-resistant verification certificates.",
  keywords: [
    "deepfake detection",
    "content authenticity",
    "blockchain verification",
    "AI forensics",
    "digital trust",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900 font-[family-name:var(--font-inter)] selection:bg-[#0F7642]/20">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
