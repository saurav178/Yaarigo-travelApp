import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Travio",
  description: "Your ultimate travel companion for planning and managing trips",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ margin: 0, fontFamily: "sans-serif", background: "#000" }}
      >
<<<<<<< HEAD
        <GlobalLayout>{children}</GlobalLayout>
=======
        <div className="app-shell min-h-screen flex flex-col">
          <main className="page-body flex-1">{children}</main>
        </div>
>>>>>>> b73f53819699750158bc57acc668b8e0f0b87188
      </body>
    </html>
  );
}
