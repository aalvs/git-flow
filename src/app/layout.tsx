import React from 'react'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Git Flow Cheatsheet — Guia Interativo',
  description: 'Guia interativo completo do git-flow com comandos, workflows e diagramas visuais de branches. Aprenda o modelo de branching do Vincent Driessen.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt" className="dark translated-ltr" suppressHydrationWarning>
      <body className={`${_geist.className} ${_geistMono.className} font-sans antialiased `}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
