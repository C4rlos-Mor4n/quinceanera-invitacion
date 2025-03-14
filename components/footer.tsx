export function Footer() {
  return (
    <footer className="py-6 border-t">
      <div className="container flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-sm text-muted-foreground">Quinceañera de Maily Pamela - 5 de abril</p>
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Todos los derechos reservados</p>
        <p className="text-xs text-muted-foreground mt-1">
          Desarrollado por <span className="font-medium">Carlos Andrés Morán Vásquez</span>
        </p>
      </div>
    </footer>
  )
}

