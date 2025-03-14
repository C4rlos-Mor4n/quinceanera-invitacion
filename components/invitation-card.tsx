import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Gift, Phone } from "lucide-react"

interface InvitationCardProps {
  invitadoId?: string
  nombreInvitado?: string
}

export function InvitationCard({ invitadoId, nombreInvitado }: InvitationCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden border-gold/20">
      <div className="bg-gold/10 p-4 sm:p-6 text-center border-b border-gold/20">
        <h1 className="font-script text-2xl sm:text-3xl gold-text">Maily Pamela</h1>
      </div>

      {/* Imagen circular centrada */}
      <div className="relative p-4 sm:p-6 flex justify-center bg-white">
        <div className="relative w-28 h-28 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 sm:border-4 border-gold/20">
          <Image
            src="https://sjc.microlink.io/-JD3JzwRuzU0xfmrJ5UzC50U2rk-_RPOxnm0XrVyiVPKKaOv6bIuTjfCQNB0xdmox6c35NllrjX6t6-mfSWbdQ.jpeg"
            alt="Quinceañera Maily Pamela"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-white">
        <div className="text-center">
          <p className="text-base sm:text-lg mb-1">Querido/a</p>
          <p className="font-script text-xl sm:text-2xl gold-text mb-2 sm:mb-4">{nombreInvitado || "Invitado/a"}</p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Con la bendición de Dios y la de mis padres tengo el honor de invitarte a celebrar mis XV años
          </p>
        </div>

        {/* Grid responsivo para los detalles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
              <Link
                href="https://maps.google.com"
                target="_blank"
                className="text-xs sm:text-sm text-primary hover:underline"
              >
                Ver ubicación
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Gift className="h-4 w-4 sm:h-5 sm:w-5 text-gold" />
            <div>
              <p className="font-medium text-sm sm:text-base">Código de vestimenta</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Formal</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 justify-center">
          <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-gold" />
          <div>
            <p className="font-medium text-sm sm:text-base">Confirmar antes del 28 de marzo</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Maily: 0939474919 | Mamá: 0960530147</p>
          </div>
        </div>

        {invitadoId && (
          <div className="pt-2 sm:pt-4">
            <Button variant="gold" className="w-full py-3 sm:py-4 text-sm sm:text-base" asChild>
              <Link href={`/confirmar/${invitadoId}`}>
                {nombreInvitado ? `Confirmar asistencia de ${nombreInvitado}` : "Confirmar asistencia"}
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

