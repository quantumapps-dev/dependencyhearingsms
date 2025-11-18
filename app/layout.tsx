import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Dependency Hearing SMS - Court Case Management System",
  description: "Secure case management and automated SMS communication system for dependency court proceedings. HIPAA and FERPA compliant.",
  keywords: ["dependency court", "case management", "SMS communication", "legal system", "HIPAA compliant"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
