"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AnimatedEnvelope } from "@/components/animated-envelope"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getInvitadoByUrl } from "@/services/api"
import { Sparkles } from "lucide-react"

interface InvitacionContentProps {
  url: string
}

export function InvitacionContent({ url }: InvitacionContentProps) {
  const router = useRouter()
  const [invitado, setInvitado] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInvitado = async () => {
      try {
        console.log("Buscando invitado con URL:", url)

        // Intentar obtener del servidor
        const foundInvitado = await getInvitadoByUrl(url)
        console.log("Invitado encontrado:", foundInvitado)

        if (foundInvitado) {
          setInvitado(foundInvitado)
          setLoading(false)
        } else {
          setError("No se pudo encontrar la invitación")
          setLoading(false)
        }
      } catch (error) {
        console.error("Error al buscar invitado:", error)
        setError("No se pudo cargar la invitación")
        setLoading(false)
      }
    }

    fetchInvitado()
  }, [url, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg">Cargando invitación...</p>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Error</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">{error}</p>
          <Button variant="outline" onClick={() => router.push("/")}>
            Volver al inicio
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Encabezado decorativo */}
      <div className="relative py-12 mb-8 overflow-hidden">
        {/* Fondo decorativo */}
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent"></div>

        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/4 right-0 w-32 h-32 bg-gold/5 rounded-full translate-x-1/2"></div>
        <div className="absolute bottom-0 left-1/3 w-16 h-16 bg-gold/5 rounded-full"></div>

        <div className="container relative">
          <div className="flex flex-col items-center text-center">
            {/* Ícono decorativo */}
            <div className="mb-4">
              <Sparkles className="h-8 w-8 text-gold" />
            </div>

            {/* Título principal */}
            <h1 className="font-script text-5xl md:text-6xl lg:text-7xl gold-text mb-6 relative">
              Mis XV Años
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent"></span>
            </h1>

            {/* Mensaje personalizado */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {invitado?.nombre
                ? `Hola ${invitado.nombre}, te invito a celebrar conmigo este día tan especial.`
                : "Te invito a celebrar conmigo este día tan especial."}
            </p>
          </div>
        </div>
      </div>

      <AnimatedEnvelope invitadoId={invitado?.id} nombreInvitado={invitado?.nombre} />
    </div>
  )
}

