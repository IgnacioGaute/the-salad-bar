"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function MainContactForm() {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSuccess(null)
    setError(null)

    try {
      const res = await fetch("/api/contact-main", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSuccess("Tu mensaje fue enviado con éxito 🎉")
        setFormData({})
      } else {
        setError("Hubo un error al enviar el mensaje. Intenta de nuevo.")
      }
    } catch (err) {
      setError("No se pudo conectar con el servidor.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative overflow-hidden">
      {/* Líneas decorativas */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#4A90E2] to-transparent"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-[#4A90E2] to-transparent"></div>
      </div>

      <div className="text-center mb-32 animate-in fade-in duration-1500">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#4A90E2] to-transparent mx-auto mb-12"></div>
          <h2 style={{ fontFamily: "var(--font-muli)" }}className="text-6xl md:text-8xl font-serif font-light text-white mb-8 tracking-wider">
            Contactemos
          </h2>
        </div>
      <div className="max-w-4xl mx-auto px-6 relative">


        {/* Formulario */}
        <Card className="border-0 shadow-3xl backdrop-blur-xl hover:shadow-4xl transition-all duration-1000 animate-in slide-in-from-bottom-12 duration-1500 hover:scale-[1.02] hover:-translate-y-2 rounded-3xl relative overflow-hidden" style={{ backgroundColor: '#183a5d' }}>

          {/* Líneas de borde */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#4A90E2] to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#4A90E2] to-transparent"></div>

          <CardContent className="p-20">
            <form className="space-y-24" onSubmit={handleSubmit}>
              {/* Sección 1 */}
              <div>
                <h3 style={{ fontFamily: "var(--font-muli)", color: '#4A90E2' }} className="text-3xl font-serif font-light mb-14">
                  Información Personal
                </h3>
                <div className="grid md:grid-cols-2 gap-16">
                  <div className="field">
                    <label>Nombre completo</label>
                    <Input
                      name="nombre"
                      value={formData.nombre || ""}
                      onChange={handleChange}
                      className="customInput !text-white"
                    />
                  </div>
                  <div className="field">
                    <label>Correo electrónico</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email || ""}
                      onChange={handleChange}
                      className="customInput !text-white"
                    />
                  </div>
                  <div className="field md:col-span-2">
                    <label>Número de teléfono</label>
                    <Input
                      type="tel"
                      name="telefono"
                      value={formData.telefono || ""}
                      onChange={handleChange}
                      className="customInput !text-white"
                    />
                  </div>
                  <div className="field md:col-span-2">
                    <label>Comentario</label>
                    <Textarea
                      name="comentario"
                      value={formData.comentario || ""}
                      onChange={handleChange}
                      className="customInput !text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Botón */}
              <div className="text-center pt-5">
                <Button
                style={{ fontFamily: "var(--font-muli)", borderColor: '#4A90E2', color: '#4A90E2' }}
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="bg-transparent border-2 hover:bg-[#4A90E2] 
                             hover:border-[#4A90E2] px-16 py-6 text-xl font-light rounded-none transition-all duration-700 
                             hover:scale-110 hover:shadow-2xl hover:-translate-y-2 shadow-xl 
                             tracking-widest uppercase font-sans" onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#a5b0ac'; }} onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#4A90E2'; }}
                >
                  {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
                </Button>
              </div>

              {success && (
                <p className="text-green-400 text-center">{success}</p>
              )}
              {error && <p className="text-red-400 text-center">{error}</p>}
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Estilos utilitarios */}
      <style jsx>{`
        .field label {
          display: block;
          margin-bottom: 0.75rem;
          color: #d6d3d1; /* stone-300 */
          font-size: 1.1rem;
          font-family: sans-serif;
          letter-spacing: 0.02em;
        }
        .customInput {
        @apply w-full h-16 border-0 border-b-2 
                bg-transparent text-white placeholder:text-gray-400
                transition-all duration-500 
                text-xl rounded-none font-sans;
        }
        .customInput:focus {
          border-color: #4A90E2;
        }

      `}</style>
    </section>
  )
}
