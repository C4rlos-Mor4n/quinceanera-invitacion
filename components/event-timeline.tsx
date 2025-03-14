import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function EventTimeline() {
  const events = [
    { time: "16:00", name: "Recepción", icon: "🎊" },
    { time: "17:30", name: "Presentación", icon: "👑" },
    { time: "19:30", name: "Cena", icon: "🍽️" },
    { time: "20:00", name: "Fiesta", icon: "🎵" },
    { time: "23:00", name: "Despedida", icon: "👋" },
  ]

  return (
    <Card className="border-gold/20 gold-border overflow-hidden">
      <CardHeader className="p-4 sm:p-6 bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5 border-b border-gold/10">
        <CardTitle className="text-center font-script gold-text text-xl sm:text-2xl">
          Itinerario de Actividades
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="relative">
          <div className="absolute left-7 sm:left-9 top-0 bottom-0 w-px bg-gradient-to-b from-gold/10 via-gold/20 to-gold/10"></div>
          <ul className="space-y-4 sm:space-y-6 relative">
            {events.map((event, index) => (
              <li key={index} className="flex items-center gap-3 sm:gap-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center z-10 hover-glow">
                  <span className="text-xs sm:text-base">{event.icon}</span>
                </div>
                <div className="flex-1 flex items-center justify-between p-2 rounded-md hover:bg-gold/5 transition-colors">
                  <span className="font-medium text-sm sm:text-base">{event.name}</span>
                  <span className="text-xs sm:text-sm text-muted-foreground">{event.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

