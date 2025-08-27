import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import RecaptchaProvider from '@/components/RecaptchaProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'IDC Academy - Formation Reconversion Professionnelle',
  description: 'Programme de reconversion professionnelle avec 94% de taux d\'insertion. Formations développeur web, marketing IA et plus.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <RecaptchaProvider>
          {children}
        </RecaptchaProvider>
      </body>
    </html>
  )
}
