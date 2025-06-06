import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "animate.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Express Postals",
  description: "Your trusted logistics partner",
  icons: {
    icon: "/images/logo3.png",  // path to your favicon in the public directory
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800&display=swap"
          rel="stylesheet"
        />

        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-..."
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        {/* Animate.css */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />

        {/* Custom Styles */}
        <link rel="stylesheet" href="/css/flaticon.css" />
        <link rel="stylesheet" href="/css/icomoon.css" />
        <link rel="stylesheet" href="/css/style.css" />

        <link
          rel="preload"
          href="/images/img2-min.jpg"
          as="image"
        />
        <link
          rel="preload"
          href="/images/img3-min.jpg"
          as="image"
        />
        <link
          rel="preload"
          href="/images/img4-min.jpg"
          as="image"
        />
        <link
          rel="preload"
          href="/images/img5-min.jpg"
          as="image"
        />
        <link
          rel="preload"
          href="/images/img6-min.jpg"
          as="image"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
