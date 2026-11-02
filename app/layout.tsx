import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Asya Dream Studio",
  description: "Hayal et, tasarla, oyna. Kendi karakterini ve hayalindeki odayı yarat.",
  icons: {
    icon: "/assets/icon.svg",
    shortcut: "/assets/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
