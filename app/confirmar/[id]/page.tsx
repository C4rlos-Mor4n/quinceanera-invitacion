"use client"

import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ConfirmacionContent } from "@/components/confirmacion-content"

interface ConfirmarPageProps {
  params: {
    id: string
  }
}

export default function ConfirmarPage({ params }: ConfirmarPageProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-8">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-64">
              <p className="text-lg">Cargando información...</p>
            </div>
          }
        >
          <ConfirmacionContent id={params.id} />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

