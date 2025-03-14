"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Gift, Phone, Undo2 } from "lucide-react"

interface InvitationLetterProps {
  invitadoId?: string
  nombreInvitado?: string
  onClose?: () => void
  showConfirmButton?: boolean
}

export function InvitationLetter({
  invitadoId,
  nombreInvitado,
  onClose,
  showConfirmButton = false,
}: InvitationLetterProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white border-4 sm:border-8 border-gold/30 rounded-lg overflow-hidden shadow-lg gold-border">
        {/* Encabezado con decoración */}
        <div className="relative h-16 sm:h-24 bg-gradient-to-r from-gold/10 via-gold/20 to-gold/10 flex items-center justify-center border-b border-gold/30">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-gold hover-glow"
            >
              <Undo2 className="w-4 h-4" />
            </button>
          )}
          <h2 className="font-script text-2xl sm:text-3xl gold-text">Invitación</h2>
        </div>

        {/* Contenido de la carta */}
        <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 bg-[url('/images/paper-texture.png')] bg-cover relative">
          {/* Elementos decorativos de fondo */}
          <div className="absolute top-4 left-4 w-16 h-16 rounded-full border border-gold/10 opacity-20"></div>
          <div className="absolute bottom-4 right-4 w-24 h-24 rounded-full border border-gold/10 opacity-20"></div>

          {/* Nombre de la quinceañera */}
          <div className="text-center">
            <h1 className="font-script text-2xl sm:text-3xl gold-text mb-2 sm:mb-4">Maily Pamela</h1>
          </div>

          {/* Imagen circular centrada */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-gold/20 via-gold/30 to-gold/20 blur-sm"></div>
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 sm:border-4 border-gold/30">
                <Image
                  src="https://i.imgur.com/i6Uu6GH.jpeg"
                  alt="Quinceañera Maily Pamela"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Saludo */}
          <div className="text-center space-y-2 sm:space-y-4">
            <div>
              <p className="text-base sm:text-lg mb-1">Querido/a</p>
              <p className="font-script text-xl sm:text-2xl gold-text mb-2 sm:mb-4">{nombreInvitado || "Invitado/a"}</p>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed">
              Con la bendición de Dios y la de mis padres
              <br />
              <span className="font-medium">Galo Cedeño & Cecilia Villegas</span>
              <br />
              tengo el honor de invitarte a celebrar mis XV años
            </p>
          </div>

          {/* Separador decorativo */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 my-2 sm:my-4">
            <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent flex-1"></div>
            <div className="text-gold">✦</div>
            <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent flex-1"></div>
          </div>

          {/* Detalles del evento en grid responsivo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 p-2 rounded-md hover:bg-gold/5 transition-colors">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-gold flex-shrink-0" />
              <div>
                <p className="font-medium text-sm sm:text-base">5 de abril</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Sábado</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 p-2 rounded-md hover:bg-gold/5 transition-colors">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-gold flex-shrink-0" />
              <div>
                <p className="font-medium text-sm sm:text-base">4:00 PM</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Presentación: 5:30 PM</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 p-2 rounded-md hover:bg-gold/5 transition-colors">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-gold flex-shrink-0" />
              <div>
                <p className="font-medium text-sm sm:text-base">Salón de eventos Buganvilla</p>
                <Link
                  href="https://maps.app.goo.gl/cCxKRHXiDWMxvWHE7"
                  target="_blank"
                  className="text-xs sm:text-sm text-primary hover:underline"
                >
                  Ver ubicación
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 p-2 rounded-md hover:bg-gold/5 transition-colors">
              <Gift className="h-4 w-4 sm:h-5 sm:w-5 text-gold flex-shrink-0" />
              <div>
                <p className="font-medium text-sm sm:text-base">Código de vestimenta</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Formal</p>
              </div>
            </div>
          </div>

          {/* Mensaje final */}
          <div className="text-center">
            <p className="text-sm italic">
              "Hay historias y personas que no voy a olvidar y recuerdos como este que siempre voy a guardar.
              <br />
              Porque son parte de mi vida es mi deseo que compartan conmigo en este día tan especial."
            </p>
          </div>

          {/* Confirmación */}
          <div className="flex items-center gap-2 sm:gap-3 justify-center p-2 rounded-md bg-gold/5">
            <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-gold" />
            <div>
              <p className="font-medium text-sm sm:text-base">Confirmar antes del 28 de marzo</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Maily: 0939474919 | Mamá: 0960530147</p>
            </div>
          </div>

          {/* Botón de confirmación - solo se muestra si showConfirmButton es true */}
          {invitadoId && showConfirmButton && (
            <div className="pt-2 sm:pt-4">
              <Button
                variant="gold"
                className="w-full py-4 sm:py-6 text-sm sm:text-lg animate-pulse hover:animate-none shadow-lg hover-glow"
                asChild
              >
                <Link href={`/confirmar/${invitadoId}`}>
                  {nombreInvitado ? `Confirmar asistencia` : "Confirmar asistencia"}
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Pie de la carta */}
        <div className="p-3 sm:p-4 text-center border-t border-gold/20 bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5">
          <p className="text-xs text-muted-foreground">¡Gracias por formar parte de este día tan especial!</p>
        </div>
      </div>
    </div>
  )
}

