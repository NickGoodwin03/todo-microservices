import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from '@/app/components/Header'
import {AuthProvider} from "@/app/context/AuthContext";


const inter = Inter({ subsets: ['latin'] });


export const metadata: Metadata = {
  title: "TODO App",
  description: "Microservices with Auth and Tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main className="border p-2 mb-2 rounded bg-black shadow text-white">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
