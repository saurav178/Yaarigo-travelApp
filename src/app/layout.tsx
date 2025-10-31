<<<<<<< HEAD
import "./globals.css";
=======
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import GlobalLayout from "../components/layout/GlobalLayout";
>>>>>>> 9ab3cab9e46d8de47f22e48df06327b965df6a5b

export const metadata = {
  title: "Trips Demo",
  description: "Trips ",
};

<<<<<<< HEAD
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
=======
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ margin: 0, fontFamily: "sans-serif", background: "#000" }}
      >
        <div className="app-shell min-h-screen flex flex-col">
          <main className="page-body flex-1">{children}</main>
        </div>
      </body>
>>>>>>> 9ab3cab9e46d8de47f22e48df06327b965df6a5b
    </html>
  );
}
