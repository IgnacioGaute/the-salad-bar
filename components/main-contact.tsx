"use client"

import type React from "react"

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSuccess("Tu mensaje fue enviado con éxito")
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
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#1A3A52] to-transparent"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-[#1A3A52] to-transparent"></div>
      </div>

      <div className="text-center mb-32 animate-in fade-in duration-1500">
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#1A3A52] to-transparent mx-auto mb-12"></div>
        <h2
          style={{ fontFamily: "var(--font-muli)" }}
          className="text-6xl md:text-8xl font-serif font-light mb-8 tracking-wider"
          color="#1A3A52"
        >
          Contactemos
        </h2>
      </div>
      <div className="max-w-4xl mx-auto px-6 relative">
        <Card
          className="border-0 shadow-3xl backdrop-blur-xl hover:shadow-4xl transition-all duration-1000 animate-in slide-in-from-bottom-12 duration-1500 hover:scale-[1.02] hover:-translate-y-2 rounded-3xl relative overflow-hidden"
          style={{ backgroundColor: "#DDD5CA" }}
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1A3A52] to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1A3A52] to-transparent"></div>

          <CardContent className="p-20">
            <form className="space-y-24" onSubmit={handleSubmit}>
              {/* Sección 1 */}
              <div>
                <h3
                  style={{ fontFamily: "var(--font-muli)", color: "#1A3A52" }}
                  className="text-3xl font-serif font-light mb-14"
                >
                  Información Personal
                </h3>
                <div className="grid md:grid-cols-2 gap-16">
                  <div className="field">
                    <label>Nombre completo</label>
                    <Input name="name" value={formData.name || ""} onChange={handleChange} 
                      className="w-full h-10 bg-transparent placeholder:text-gray-400 text-xl font-sans text-[#1A3A52] border border-black focus:border-[#1A3A52] transition-all duration-500"
                      />
                  </div>
                  <div className="field">
                    <label>Correo electrónico</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email || ""}
                      onChange={handleChange}
                      className="w-full h-10 bg-transparent placeholder:text-gray-400 text-xl font-sans text-[#1A3A52] border border-black focus:border-[#1A3A52] transition-all duration-500"

                    />
                  </div>
                  <div className="field md:col-span-2">
                    <label>Número de teléfono</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone || ""}
                      onChange={handleChange}
                      className="w-full h-10 bg-transparent placeholder:text-gray-400 text-xl font-sans text-[#1A3A52] border border-black focus:border-[#1A3A52] transition-all duration-500"
                    />
                  </div>
                  <div className="field md:col-span-2">
                    <label>Comentario</label>
                    <Textarea
                      name="message"
                      value={formData.message || ""}
                      onChange={handleChange}
                      className="w-full h-10 bg-transparent placeholder:text-gray-400 text-xl font-sans text-[#1A3A52] border border-black focus:border-[#1A3A52] transition-all duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Botón */}
              <div className="text-center pt-5">
                <Button
                  style={{ fontFamily: "var(--font-muli)", borderColor: "#1A3A52", color: "#1A3A52" }}
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="bg-transparent border-2 hover:bg-[#1A3A52] 
                             hover:border-[#1A3A52] px-16 py-6 text-xl font-light rounded-none transition-all duration-700 
                             hover:scale-110 hover:shadow-2xl hover:-translate-y-2 shadow-xl 
                             tracking-widest uppercase font-sans"
                  onMouseEnter={(e) => {
                    ;(e.target as HTMLElement).style.color = "#F5F3EF"
                  }}
                  onMouseLeave={(e) => {
                    ;(e.target as HTMLElement).style.color = "#1A3A52"
                  }}
                >
                  {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
                </Button>
              </div>

              {success && (
                <p className="text-center" style={{ color: "#1A3A52", fontFamily: "var(--font-glacial)" }}>
                  {success}
                </p>
              )}
              {error && (
                <p className="text-center" style={{ color: "#1A3A52", fontFamily: "var(--font-glacial)" }}>
                  {error}
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        .field label {
          display: block;
          margin-bottom: 0.75rem;
          color: #1A3A52;
          font-size: 1.1rem;
          font-family: var(--font-muli);
          letter-spacing: 0.02em;
        }
        .customInput {
          @apply w-full h-16
                    bg-transparent placeholder:text-gray-400
                    transition-all duration-500 
                    text-xl font-sans;
          color: #1A3A52;
          border-color:rgb(0, 0, 0);
        }
        .customInput:focus {
          border-color: #1A3A52;
        }
      `}</style>
    </section>
  )
}
