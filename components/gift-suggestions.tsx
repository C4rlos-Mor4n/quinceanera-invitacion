import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Gift, Mail } from "lucide-react"

export function GiftSuggestions() {
  return (
    <Card className="border-gold/20 gold-border overflow-hidden">
      <CardHeader className="p-4 sm:p-6 bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5 border-b border-gold/10">
        <CardTitle className="text-center font-script gold-text text-xl sm:text-2xl">Sugerencia de Regalo</CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
        <p className="text-center text-sm sm:text-base">Si deseas hacerme un regalo, te dejo estas opciones:</p>

        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border border-gold/20 rounded-md hover:bg-gold/5 transition-colors">
            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
              <Gift className="h-4 w-4 sm:h-5 sm:w-5 text-gold" />
            </div>
            <div>
              <p className="font-medium text-sm sm:text-base">Transferencia</p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Banco de Pichincha
                <br />
                Cuenta: 2208953040
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border border-gold/20 rounded-md hover:bg-gold/5 transition-colors">
            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gold" />
            </div>
            <div>
              <p className="font-medium text-sm sm:text-base">Lluvia de sobres</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Habrá un buzón especial en la recepción</p>
            </div>
          </div>
        </div>

        <p className="text-center text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-4 italic">
          ¡Gracias por formar parte de este día tan especial!
        </p>
      </CardContent>
    </Card>
  )
}

