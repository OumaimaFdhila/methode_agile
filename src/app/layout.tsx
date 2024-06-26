import type { Metadata } from "next";
import "./globals.css";
import {Providers} from './providers'
import Nav from '@/components/navBar/navbar'
import Footer from '@/components/footer'
import AppSession from "@/contexts/AppSession";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { TimerProvider } from "@/components/timer/timerProvider";
import { ChakraProvider } from "@chakra-ui/react";

export const metadata: Metadata = {
  icons:"/dark_logo.png",
  title: "Mega Tel",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" >
      <TimerProvider>
      <body className="w-full h-full">
      <Providers>
      <AppSession>
          <main>
            <Nav session={await getServerSession(authOptions)}/>
            <ChakraProvider cssVarsRoot="body">
            {children}
            </ChakraProvider>
            <Footer/>
          </main>
      </AppSession>
      </Providers>
      </body>
      </TimerProvider>
    </html>
  );
}
