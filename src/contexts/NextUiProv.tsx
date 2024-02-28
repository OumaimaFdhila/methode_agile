"use client";
import {NextUIProvider} from '@nextui-org/react'
import AppSession from "@/contexts/AppSession";

export default function NextUiProviders({children}: { children: React.ReactNode }) {

  return (
    <NextUIProvider>
      <AppSession>
        {children}
      </AppSession>
    </NextUIProvider>
  )
}