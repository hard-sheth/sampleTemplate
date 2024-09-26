import ProgressBar from "@/components/ProgressBar/ProgressBar";
import { getDictionary } from "@/locales/dictionary";
import DictionaryProvider from "@/locales/DictionaryProvider";
import getTheme from "@/themes/theme";
import React from "react";
import "./globals.css";
import '@/styles/globals.scss'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dictionary = await getDictionary()

  return (
    <html lang="en" data-bs-theme={getTheme()}>
      <body>
        <ProgressBar />
        <DictionaryProvider dictionary={dictionary}>
          {children}
        </DictionaryProvider>
      </body>
    </html>
  )
}
