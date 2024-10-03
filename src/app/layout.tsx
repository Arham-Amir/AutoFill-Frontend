import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from '@/components/theme-provider';
import "./globals.css";
import { Sriracha } from "next/font/google";
import { Toaster } from 'sonner'
import Navbar from "@/components/Navbar";


const kaushan = Sriracha({
  subsets: ["latin"],
  variable: "--font-kaushan",
  weight: "400",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AutoformsCA",
  description: "Website to process vehicle forms automatically.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${kaushan.variable} antialiased font-sans flex flex-col min-h-screen bg-backgrou`}
      >
        <Toaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-background text-foreground py-4 text-center">
            <p>&copy; 2024 AutoformsCA. All rights reserved.</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
