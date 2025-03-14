'use client'

import { Suspense } from "react"
import { use } from 'react'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { InvitacionContent } from "@/components/invitacion-content"

interface InvitacionPageProps {
  params: Promise<{
    url: string
  }>
}

export default function InvitacionPage({ params }: InvitacionPageProps) {
  const resolvedParams = use(params)
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-8">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-64">
              <p className="text-lg">Cargando invitación...</p>
            </div>
          }
        >
          <InvitacionContent url={resolvedParams.url} />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

