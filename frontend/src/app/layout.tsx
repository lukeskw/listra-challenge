import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  preload: true,
})

export const metadata: Metadata = {
  title: 'Listra Challenge',
  description: 'App created for applying to the listra challenge',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <body
        className={`${roboto.className} bg-mainBg text-neutral-700 antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
