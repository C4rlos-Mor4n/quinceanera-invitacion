"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX, Music, Play, Pause } from "lucide-react"

interface MusicPlayerProps {
  autoPlay?: boolean
  className?: string
}

export function MusicPlayer({ autoPlay = false, className = "" }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const songUrl = "https://s33.aconvert.com/convert/p3r68-cdx67/41mof-qp644.mp3"

  useEffect(() => {
    // Inicializar el audio
    if (audioRef.current) {
      audioRef.current.volume = 0.5

      if (autoPlay) {
        // Intentar reproducir automáticamente
        const playPromise = audioRef.current.play()

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
            })
            .catch((error) => {
              // Auto-play fue prevenido por el navegador
              console.log("Reproducción automática bloqueada por el navegador:", error)
              setIsPlaying(false)
            })
        }
      }
    }

    // Limpiar al desmontar
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [autoPlay])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <Card className={`${className} overflow-hidden border-gold/20 gold-border`}>
      <CardContent className="p-4 bg-gradient-to-r from-gold/5 via-transparent to-gold/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
              <Music className="h-4 w-4 text-gold" />
            </div>
            <span className="text-sm font-medium">Música para celebrar</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gold hover:text-gold/80 hover:bg-gold/10"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={togglePlay}
              className="text-xs border-gold/20 hover:bg-gold/10 hover:text-gold"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-3 w-3 mr-1" /> Pausar
                </>
              ) : (
                <>
                  <Play className="h-3 w-3 mr-1" /> Reproducir
                </>
              )}
            </Button>
          </div>
        </div>
        <audio ref={audioRef} src={songUrl} loop />
      </CardContent>
    </Card>
  )
}

