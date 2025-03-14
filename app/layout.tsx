import type React from "react"
import type { Metadata } from "next"
import { Inter, Great_Vibes } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
})

export const metadata: Metadata = {
  title: "Quinceañera de Maily Pamela",
  description: "Invitación a la celebración de los XV años de Maily Pamela",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${greatVibes.variable} font-sans`}>
        {/* Script para inicializar datos de ejemplo */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Verificar si ya hay invitados en localStorage
              if (typeof window !== 'undefined') {
                const invitados = localStorage.getItem('invitados');
                if (!invitados || invitados === '[]') {
                  // Crear un invitado de ejemplo
                  const exampleInvitado = {
                    id: "example-id-123456",
                    nombre: "Denisse",
                    email: "denisse@example.com",
                    telefono: "0987654321",
                    confirmado: false,
                    numeroInvitados: 2,
                    urlUnica: "denisse-example"
                  };
                  
                  // Guardar en localStorage
                  localStorage.setItem('invitados', JSON.stringify([exampleInvitado]));
                }
              }
            `,
          }}
        />
        {children}
      </body>
    </html>
  )
}

import "./globals.css"



import './globals.css'