"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Copy, Check, X, Trash } from "lucide-react"
import { DataManager } from "@/components/data-manager"
import { auth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { getInvitados, addInvitado, deleteInvitado, type Invitado } from "@/services/api"

export default function AdminPage() {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [telefono, setTelefono] = useState("")
  const [numeroInvitados, setNumeroInvitados] = useState(1)
  const [invitados, setInvitados] = useState<Invitado[]>([])
  const [copiado, setCopiado] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      router.push("/")
      return
    }

    // Cargar invitados del servidor
    const loadInvitados = async () => {
      try {
        const data = await getInvitados()
        setInvitados(data)
      } catch (error) {
        console.error("Error al cargar invitados:", error)
      } finally {
        setLoading(false)
      }
    }

    loadInvitados()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validar que numeroInvitados sea un número válido
    const numInvitados = Number(numeroInvitados)
    if (isNaN(numInvitados) || numInvitados < 1) {
      alert("Por favor ingrese un número válido de invitados")
      return
    }

    try {
      const nuevoInvitado = await addInvitado({
        nombre,
        email,
        telefono,
        numeroInvitados: numInvitados,
      })

      if (nuevoInvitado) {
        setNombre("")
        setEmail("")
        setTelefono("")
        setNumeroInvitados(1)

        // Actualizar la lista de invitados
        setInvitados((prev) => [...prev, nuevoInvitado])
      }
    } catch (error) {
      console.error("Error al añadir invitado:", error)
      alert("Ocurrió un error al añadir el invitado")
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este invitado?")) {
      try {
        const success = await deleteInvitado(id)
        if (success) {
          // Actualizar la lista de invitados
          setInvitados((prev) => prev.filter((inv) => inv.id !== id))
        }
      } catch (error) {
        console.error("Error al eliminar invitado:", error)
        alert("Ocurrió un error al eliminar el invitado")
      }
    }
  }

  const copyToClipboard = async (url: string, id: string) => {
    try {
      const fullUrl = `${window.location.origin}/invitacion/${url}`
      
      // Check if running in browser environment and clipboard API is available
      if (typeof window !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(fullUrl)
        setCopiado(id)
        setTimeout(() => setCopiado(null), 2000)
      } else {
        // Fallback for environments where clipboard API is not available
        const textArea = document.createElement('textarea')
        textArea.value = fullUrl
        document.body.appendChild(textArea)
        textArea.select()
        try {
          document.execCommand('copy')
          setCopiado(id)
          setTimeout(() => setCopiado(null), 2000)
        } catch (err) {
          console.error('Fallback: Oops, unable to copy', err)
          alert("No se pudo copiar al portapapeles")
        }
        document.body.removeChild(textArea)
      }
    } catch (error) {
      console.error("Error copying to clipboard:", error)
      alert("No se pudo copiar al portapapeles")
    }
  }

  // Función para manejar cambios en el número de invitados
  const handleNumeroInvitadosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const numValue = Number.parseInt(value, 10)

    // Si es un número válido, usarlo; de lo contrario, usar 1
    setNumeroInvitados(isNaN(numValue) ? 1 : numValue)
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container py-8 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg">Cargando datos...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Panel de Administración</h1>
            <Button
              variant="outline"
              onClick={() => {
                auth.logout()
                router.push("/")
              }}
            >
              Cerrar Sesión
            </Button>
          </div>

          {/* Componente de gestión de datos */}
          <div className="mb-8">
            <DataManager invitados={invitados} setInvitados={setInvitados} />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Registrar Nuevo Invitado</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email (opcional)</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono (opcional)</Label>
                    <Input id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="numeroInvitados">Número de Invitados</Label>
                    <Input
                      id="numeroInvitados"
                      type="number"
                      min="1"
                      value={numeroInvitados.toString()} // Convertir a string para evitar NaN
                      onChange={handleNumeroInvitadosChange}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Registrar Invitado
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lista de Invitados</CardTitle>
              </CardHeader>
              <CardContent>
                {invitados.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">No hay invitados registrados</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Invitación</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invitados.map((invitado) => (
                        <TableRow key={invitado.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{invitado.nombre}</p>
                              <p className="text-xs text-muted-foreground">
                                {invitado.numeroInvitados} {invitado.numeroInvitados === 1 ? "persona" : "personas"}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {invitado.confirmado ? (
                              <span className="inline-flex items-center gap-1 text-green-600">
                                <Check className="h-4 w-4" /> Confirmado
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-amber-600">
                                <X className="h-4 w-4" /> Pendiente
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(invitado.urlUnica, invitado.id)}
                            >
                              {copiado === invitado.id ? (
                                <Check className="h-4 w-4 mr-1" />
                              ) : (
                                <Copy className="h-4 w-4 mr-1" />
                              )}
                              {copiado === invitado.id ? "Copiado" : "Copiar URL"}
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete(invitado.id)}>
                              <Trash className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}