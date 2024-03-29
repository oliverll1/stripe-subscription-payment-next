import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthRouter from "./authrouter"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <AuthRouter>
            <div className="w-full h-screen bg-slate-900 text-white flex flex-col justify-center items-center gap-4">
                {children}
            </div>
          </AuthRouter>
        </body>   
    </html>
  );
}
