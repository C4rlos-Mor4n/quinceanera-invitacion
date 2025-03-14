"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { MailOpenIcon as Envelope, ChevronDown } from "lucide-react"
import { InvitationLetter } from "./invitation-letter"
import { EventTimeline } from "./event-timeline"
import { GiftSuggestions } from "./gift-suggestions"
import { MusicPlayer } from "./music-player"

interface AnimatedEnvelopeProps {
  invitadoId?: string
  nombreInvitado?: string
}

export function AnimatedEnvelope({ invitadoId, nombreInvitado }: AnimatedEnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleEnvelope = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="mx-auto max-w-4xl px-4">
      <AnimatePresence>
        {!isOpen ? (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100 }}
            className="flex flex-col items-center cursor-pointer"
            onClick={toggleEnvelope}
          >
            <div className="bg-white rounded-lg shadow-xl border-4 sm:border-8 border-gold/30 p-0 max-w-2xl w-full relative overflow-hidden">
              {/* Fondo decorativo con patrón floral elegante */}
              <div className="absolute inset-0 bg-[url('/images/floral-pattern.png')] bg-cover opacity-5"></div>

              {/* Efecto de brillo superior */}
              <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-gold/10 via-gold/40 to-gold/10"></div>

              {/* Decoración de esquinas */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-gold/20 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-gold/20 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-gold/20 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-gold/20 rounded-br-lg"></div>

              {/* Contenido principal */}
              <div className="relative p-6 sm:p-8 flex flex-col items-center">
                {/* Título grande con efecto decorativo */}
                <div className="relative mb-6 sm:mb-8">
                  <div className="absolute -inset-4 bg-gold/5 rounded-full blur-md"></div>
                  <h1 className="font-script text-4xl sm:text-5xl md:text-6xl gold-text text-center relative">
                    Mis XV Años
                  </h1>
                </div>

                {/* Foto de la quinceañera con marco decorativo elegante */}
                <div className="relative mb-6 sm:mb-8">
                  {/* Efecto de brillo detrás de la foto */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-gold/10 via-gold/30 to-gold/10 rounded-full blur-md"></div>

                  {/* Marco decorativo */}
                  <div className="absolute -inset-4 border border-gold/30 rounded-full"></div>
                  <div className="absolute -inset-6 border border-gold/20 rounded-full"></div>

                  {/* Foto con borde dorado */}
                  <div className="relative w-40 h-40 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-gold/40 shadow-lg">
                    <Image
                      src="https://i.imgur.com/i6Uu6GH.jpeg"
                      alt="Quinceañera Maily Pamela"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  {/* Detalles decorativos alrededor de la foto */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-4 h-4 bg-gold/20 rounded-full"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 w-4 h-4 bg-gold/20 rounded-full"></div>
                  <div className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 w-4 h-4 bg-gold/20 rounded-full"></div>
                  <div className="absolute right-0 top-1/2 translate-x-4 -translate-y-1/2 w-4 h-4 bg-gold/20 rounded-full"></div>
                </div>

                {/* Nombre de la quinceañera con efecto decorativo */}
                <h2 className="font-script text-2xl sm:text-3xl gold-text text-center mb-4 relative">
                  <span className="relative">
                    Maily Pamela
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"></span>
                  </span>
                </h2>

                {/* Mensaje para el invitado con estilo mejorado */}
                <div className="bg-gold/5 rounded-lg p-4 border border-gold/10 mb-6 sm:mb-8 max-w-md">
                  <p className="text-base sm:text-lg text-center mb-2">
                    {nombreInvitado ? `¡Hola ${nombreInvitado}!` : "¡Hola!"}
                  </p>
                  <p className="text-sm sm:text-base text-center text-muted-foreground">
                    Has recibido una invitación especial para celebrar conmigo este día tan importante.
                  </p>
                </div>

                {/* Botón para abrir con estilo mejorado */}
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold/10 via-gold/20 to-gold/10 border border-gold/30 text-sm sm:text-base text-primary animate-pulse shadow-md hover:shadow-lg transition-all duration-300">
                  <span>Pulsa para abrir la invitación</span>
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>

    
                {/* Fecha con estilo mejorado */}
                <div className="absolute top-4 right-4 text-right bg-white/80 px-3 py-1 rounded-lg border border-gold/10">
                  <p className="text-xs sm:text-sm text-gold font-medium">5 de abril</p>
                  <p className="text-xs sm:text-sm font-bold">2025</p>
                </div>
              </div>

              {/* Decoración inferior */}
              <div className="h-6 bg-gradient-to-r from-gold/10 via-gold/30 to-gold/10 flex items-center justify-center">
                <div className="w-24 h-1 bg-white rounded-full"></div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full"
          >
            {/* Reproductor de música con autoPlay */}
            <div className="mb-6">
              <MusicPlayer autoPlay={true} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
              <div>
                <InvitationLetter
                  invitadoId={invitadoId}
                  nombreInvitado={nombreInvitado}
                  onClose={() => setIsOpen(false)}
                  showConfirmButton={true}
                />
              </div>
              <div className="space-y-6 sm:space-y-8">
                <EventTimeline />
                <GiftSuggestions />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

