// src/app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "Express Postals",
    default: "Express Postals",
  },
  description: "Your trusted logistics partner",
  icons: {
    icon: "/images/logo3.png",
    apple: "/images/logo3.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>{children}</body>
    </html>
  );
}
