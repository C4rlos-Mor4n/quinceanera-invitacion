"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, MapPin, PartyPopper, Users } from "lucide-react"
import { getInvitadoById, confirmarAsistencia, addInvitado } from "@/services/api"

interface ConfirmacionContentProps {
  id: string
}

export function ConfirmacionContent({ id }: ConfirmacionContentProps) {
  const router = useRouter()
  const [invitado, setInvitado] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [confirmado, setConfirmado] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [esInvitadoTemporal, setEsInvitadoTemporal] = useState(false)

  useEffect(() => {
    const fetchInvitado = async () => {
      try {
        // Intentar obtener el invitado del servidor
        const foundInvitado = await getInvitadoById(id)

        if (foundInvitado) {
          setInvitado(foundInvitado)
          setConfirmado(foundInvitado.confirmado || false)
          setLoading(false)
          return
        }

        // Verificar si es un ID temporal (para invitados creados en la página de invitación)
        if (id.startsWith("temp-")) {
          const urlUnica = id.replace("temp-", "")

          // Crear un invitado temporal (esto se maneja en el frontend)
          const invitadoTemporal = {
            id: `temp-${urlUnica}`,
            nombre: "Invitado",
            confirmado: false,
            numeroInvitados: 1,
            urlUnica: urlUnica,
          }

          setInvitado(invitadoTemporal)
          setEsInvitadoTemporal(true)
          setLoading(false)
          return
        }

        // Si no se encuentra el invitado y no es temporal, mostrar error
        setError("No se encontró la información del invitado")
        setLoading(false)
      } catch (error) {
        console.error("Error al buscar invitado:", error)
        setError("Ocurrió un error al cargar la información")
        setLoading(false)
      }
    }

    fetchInvitado()
  }, [id, router])

  const handleConfirmar = async () => {
    try {
      if (esInvitadoTemporal) {
        // Para invitados temporales, creamos un nuevo invitado en el servidor
        if (invitado) {
          const nuevoInvitado = await addInvitado({
            nombre: invitado.nombre,
            numeroInvitados: invitado.numeroInvitados,
            email: "",
            telefono: "",
          })

          if (nuevoInvitado) {
            // Confirmar el nuevo invitado
            await confirmarAsistencia(nuevoInvitado.id)
            setInvitado(nuevoInvitado)
          }
        }
      } else {
        // Para invitados normales, usamos la API
        const invitadoActualizado = await confirmarAsistencia(id)
        if (invitadoActualizado) {
          setInvitado(invitadoActualizado)
        }
      }

      setConfirmado(true)
    } catch (error) {
      console.error("Error al confirmar asistencia:", error)
      alert("Ocurrió un error al confirmar la asistencia")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg">Cargando información...</p>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="text-center p-6">
          <p className="mb-4">{error}</p>
          <Button variant="outline" onClick={() => router.push("/")}>
            Volver al inicio
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <Card className="border-gold/20">
        <div className="bg-gold/10 p-4 sm:p-6 text-center border-b border-gold/20">
          <h1 className="font-script text-2xl sm:text-3xl gold-text">Maily Pamela</h1>
        </div>

        {/* Imagen circular centrada */}
        <div className="relative p-4 sm:p-6 flex justify-center">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 sm:border-4 border-gold/20">
            <Image
              src="https://i.imgur.com/i6Uu6GH.jpeg"
              alt="Quinceañera Maily Pamela"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="text-center">
            <p className="text-base sm:text-lg mb-2">
              Hola <span className="font-medium">{invitado?.nombre}</span>
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">Por favor confirma tu asistencia a mis XV años</p>
          </div>

          <div className="space-y-3 sm:space-y-4 border rounded-md p-3 sm:p-4 bg-muted/20">
            <div className="flex items-center gap-2 sm:gap-3">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-gold" />
              <div>
                <p className="font-medium text-sm sm:text-base">5 de abril</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Sábado</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-gold" />
              <div>
                <p className="font-medium text-sm sm:text-base">4:00 PM</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Presentación: 5:30 PM</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-gold" />
              <div>
                <p className="font-medium text-sm sm:text-base">Salón de eventos Buganvilla</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-gold" />
              <div>
                <p className="font-medium text-sm sm:text-base">
                  {invitado?.numeroInvitados || 1} {invitado?.numeroInvitados === 1 ? "Invitado" : "Invitados"}
                </p>
              </div>
            </div>
          </div>

          {confirmado ? (
            <div className="text-center space-y-3 sm:space-y-4 bg-green-50 p-4 sm:p-6 rounded-lg border border-green-200">
              <div className="flex items-center justify-center gap-2 text-green-600">
                <PartyPopper className="h-5 w-5 sm:h-6 sm:w-6" />
                <p className="font-medium text-base sm:text-lg">¡Asistencia confirmada!</p>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Gracias por confirmar tu asistencia. ¡Nos vemos pronto!
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  if (invitado?.urlUnica) {
                    router.push(`/invitacion/${invitado.urlUnica}`)
                  } else {
                    router.push("/")
                  }
                }}
              >
                Volver a la invitación
              </Button>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              <Button
                variant="gold"
                className="w-full py-3 sm:py-6 text-sm sm:text-lg animate-pulse hover:animate-none"
                onClick={handleConfirmar}
              >
                Confirmar Asistencia
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
