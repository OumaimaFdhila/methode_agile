import type { Metadata } from "next";
import "./globals.css";
import {Providers} from './providers'
import Nav from '@/components/navBar/navbar'
import Footer from '@/components/footer'
import AppSession from "@/contexts/AppSession";

export const metadata: Metadata = {
  icons:"/dark_logo.png",
  title: "Mega Tel",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" >
      <body className="w-full h-full">
      <Providers>
      <AppSession>
          <main>
            <Nav/>
            {children}
            <Footer/>
          </main>
      </AppSession>
      </Providers>
      </body>
    </html>
  );
}
