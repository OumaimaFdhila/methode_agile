import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from '@/app/contexts/NextUiProv'
import Nav from './tools/navBar/navbar'
import Footer from './tools/footer'

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
    <html suppressHydrationWarning lang="en">
      <body  >
      <Providers>
          <Nav />
          {children}
          <Footer/>
      </Providers>
      </body>
    </html>
  );
}
