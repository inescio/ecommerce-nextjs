import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Insumos Salud LR - Equipamiento Médico en La Rioja',
  description: 'Venta de insumos médicos, equipamiento hospitalario y productos de salud en La Rioja. Calidad certificada y envío rápido.',
  keywords: 'insumos médicos, equipamiento hospitalario, productos salud, La Rioja, estetoscopios, termómetros, barbijos',
  authors: [{ name: 'Insumos Salud LR' }],
  openGraph: {
    title: 'Insumos Salud LR - Tu proveedor de confianza',
    description: 'Equipamiento médico de calidad con certificación ANMAT',
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