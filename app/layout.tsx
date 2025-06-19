import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ShopPro - Tu Ecommerce de Confianza',
  description: 'Encuentra los mejores productos al mejor precio',
  keywords: 'ecommerce, tienda online, compras, productos',
  authors: [{ name: 'ShopPro Team' }],
  openGraph: {
    title: 'ShopPro - Tu Ecommerce de Confianza',
    description: 'Encuentra los mejores productos al mejor precio',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}