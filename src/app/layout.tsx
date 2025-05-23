import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "easymde/dist/easymde.min.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NavigationBar } from "@/components/common/navigation-bar";
import Footer from "@/components/common/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "True Islam Server",
  description: "The library of the True Islam Server",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavigationBar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
