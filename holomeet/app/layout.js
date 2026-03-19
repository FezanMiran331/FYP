import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@livekit/components-styles';
import '@livekit/components-styles/prefabs';
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Script from "next/script";
import SessionWrapper from "@/Components/SessionWrapper";
import { Toaster } from 'react-hot-toast';


// ✅ Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Metadata (Holomeet)
export const metadata = {
  title: "Holomeet",
  description: "Holomeet - Your video conferencing platform",
  twitter: {
    creator: '@holomeet',
    site: '@holomeet',
    card: 'summary_large_image',
  },
  openGraph: {
    url: 'https://holomeet.io',
    images: [
      {
        url: '/images/holomeet-og.png',
        width: 1200,
        height: 630,
        type: 'image/png',
      },
    ],
    siteName: 'Holomeet',
  },
  icons: {
    icon: { rel: 'icon', url: '/favicon.ico' },
    apple: [
      { rel: 'apple-touch-icon', url: '/images/holomeet-apple-touch.png', sizes: '180x180' },
      { rel: 'mask-icon', url: '/images/holomeet-safari-pinned-tab.svg', color: '#070707' },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Flowbite CSS */}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        data-lk-theme="default"
      >
      {/* ✅ Toaster for notifications */}
        <Toaster />
        <SessionWrapper>
          <Navbar />
          {children}
          <Footer />
        </SessionWrapper>


        {/* ✅ Flowbite JS */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
