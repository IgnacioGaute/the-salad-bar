"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactForm() {
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
      const res = await fetch("/api/contact", {
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
    <section className="relative overflow-hidden mt-5">
      {/* Líneas decorativas */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#4A90E2] to-transparent"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-[#4A90E2] to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">

        {/* Formulario */}
        <Card className="border-2 shadow-3xl 
                 backdrop-blur-xl 
                 hover:shadow-4xl transition-all duration-1000 
                 animate-in slide-in-from-bottom-12 duration-1500 
                 hover:scale-[1.01] rounded-3xl relative overflow-hidden" style={{ backgroundColor: '#E3E5E8', borderColor: '#1A3A52' }}>



          {/* Líneas de borde - fijas para evitar que se oculten */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#4A90E2] to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#4A90E2] to-transparent z-10"></div>

          <CardContent className="p-20">
            <form className="space-y-24" onSubmit={handleSubmit}>
              {/* Sección 1 */}
              <div>
                <h3 style={{ fontFamily: "var(--font-muli)", color: '#1A3A52' }} className="text-3xl font-serif font-light mb-14">
                  Información Personal
                </h3>
                <div className="grid md:grid-cols-2 gap-16">
                  <div className="field">
                    <label>Nombre completo</label>
                    <Input
                      name="nombre"
                      value={formData.nombre || ""}
                      onChange={handleChange}
                      className="customInput"
                    />
                  </div>
                  <div className="field">
                    <label>Correo electrónico</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email || ""}
                      onChange={handleChange}
                      className="customInput"
                    />
                  </div>
                  <div className="field md:col-span-2">
                    <label>Número de teléfono</label>
                    <Input
                      type="tel"
                      name="telefono"
                      value={formData.telefono || ""}
                      onChange={handleChange}
                      className="customInput"
                    />
                  </div>
                  <div className="field md:col-span-2">
                    <label>Ciudad y país de residencia</label>
                    <Input
                      name="ciudad"
                      value={formData.ciudad || ""}
                      onChange={handleChange}
                      className="customInput"
                    />
                  </div>
                  <div className="field md:col-span-2">
                    <label>Ocupación actual</label>
                    <Input
                      name="ocupacion"
                      value={formData.ocupacion || ""}
                      onChange={handleChange}
                      className="customInput"
                    />
                  </div>
                </div>
              </div>

              {/* Sección 2 */}
              <div>
                <h3 style={{ fontFamily: "var(--font-muli)", color: '#1A3A52' }} className="text-3xl font-serif font-light mb-14">
                  Interés y Expectativas
                </h3>
                <div className="space-y-12">
                  <div className="field">
                    <label>
                      ¿Por qué le interesa adquirir una franquicia de nuestro
                      negocio?
                    </label>
                    <Textarea
                      rows={4}
                      name="interes"
                      value={formData.interes || ""}
                      onChange={handleChange}
                      className="customInput"
                    />
                  </div>
                  <div className="field">
                    <label>Ubicación geográfica de interés</label>
                    <Input
                      name="ubicacion"
                      value={formData.ubicacion || ""}
                      onChange={handleChange}
                      className="customInput"
                    />
                  </div>
                  <div className="field">
                    <label>Experiencia en hostelería o negocios</label>
                    <Textarea
                      rows={4}
                      name="experiencia"
                      value={formData.experiencia || ""}
                      onChange={handleChange}
                      className="customInput"
                    />
                  </div>
                  <div className="field">
                    <label>¿Tiene experiencia previa como empresario?</label>
                    <Textarea
                      rows={3}
                      name="empresario"
                      value={formData.empresario || ""}
                      onChange={handleChange}
                      className="customInput"
                    />
                  </div>
                  <div className="field">
                    <label>Motivación principal</label>
                    <Input
                      name="motivacion"
                      value={formData.motivacion || ""}
                      onChange={handleChange}
                      className="customInput"
                    />
                  </div>
                  <div className="field">
                    <label>¿Cómo se imagina su participación diaria?</label>
                    <Input
                      name="participacion"
                      value={formData.participacion || ""}
                      onChange={handleChange}
                      className="customInput"
                    />
                  </div>
                  <div className="field">
                    <label>
                      Expectativas de retorno de inversión y rentabilidad
                    </label>
                    <Input
                      name="expectativas"
                      value={formData.expectativas || ""}
                      onChange={handleChange}
                      className="customInput"
                    />
                  </div>
                </div>
              </div>

              {/* Sección 3 */}
              <div>
                <h3 style={{ fontFamily: "var(--font-muli)", color: '#1A3A52' }} className="text-3xl font-serif font-light mb-14">
                  Capacidad Financiera
                </h3>
                <div className="space-y-12">
                  <div className="field">
                    <label>Capacidad de inversión aproximada</label>
                    <Input
                      name="inversion"
                      value={formData.inversion || ""}
                      onChange={handleChange}
                      className="customInput"
                    />
                  </div>
                  <div className="field">
                    <label>¿Cómo planea financiar la inversión inicial?</label>
                    <Textarea
                      rows={3}
                      name="financiamiento"
                      value={formData.financiamiento || ""}
                      onChange={handleChange}
                      className="customInput"
                    />
                  </div>
                  <div className="field">
                    <label>Horizonte de tiempo para comenzar el negocio</label>
                    <Input
                      name="horizonte"
                      value={formData.horizonte || ""}
                      onChange={handleChange}
                      className="customInput"
                    />
                  </div>
                </div>
              </div>

              {/* Sección 4 */}
              <div>
                <h3 style={{ fontFamily: "var(--font-muli)", color: '#1A3A52' }} className="text-3xl font-serif font-light mb-14">
                  Conectando con la Marca
                </h3>
                <div className="space-y-12">
                  <div className="field">
                    <label>
                      ¿Qué cree que es lo más importante en un restaurante
                      exitoso?
                    </label>
                    <Input
                      name="exito"
                      value={formData.exito || ""}
                      onChange={handleChange}
                      className="customInput"
                    />
                  </div>
                  <div className="field">
                    <label>
                      En una palabra, describa la experiencia que quiere
                      ofrecer
                    </label>
                    <Input
                      name="experiencia_ofrecer"
                      value={formData.experiencia_ofrecer || ""}
                      onChange={handleChange}
                      className="customInput"
                    />
                  </div>
                  <div className="field">
                    <label>Describa su estilo de liderazgo</label>
                    <Textarea
                      rows={3}
                      name="liderazgo"
                      value={formData.liderazgo || ""}
                      onChange={handleChange}
                      className="customInput"
                    />
                  </div>
                  <div className="field">
                    <label>¿Qué tan importante es el bienestar de sus empleados?</label>
                    <Input
                      name="bienestar"
                      value={formData.bienestar || ""}
                      onChange={handleChange}
                      className="customInput"
                    />
                  </div>
                </div>
              </div>

              {/* Botón */}
              <div className="text-center pt-20">
                <Button
                style={{ fontFamily: "var(--font-muli)", borderColor: '#1A3A52', color: '#1A3A52' }}
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="bg-transparent border-2 hover:bg-[#1A3A52] 
                             hover:border-[#1A3A52] px-16 py-6 text-xl font-light rounded-none transition-all duration-700 
                             hover:scale-110 hover:shadow-2xl hover:-translate-y-2 shadow-xl 
                             tracking-widest uppercase font-sans" onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#E3E5E8'; }} onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#1A3A52'; }}
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

        {/* Nota final */}
{/* Nota final */}
        <Card className="mt-20 border-2 shadow-2xl
                        backdrop-blur-xl rounded-3xl p-12 text-center
                        transition-all duration-1000 hover:shadow-4xl hover:scale-[1.01] animate-in slide-in-from-bottom-12" style={{ backgroundColor: '#E3E5E8', borderColor: '#1A3A52' }}>
          <h4 style={{ fontFamily: "var(--font-muli)", color: '#1A3A52' }} className="text-2xl font-serif mb-4">
            Una Nota para el Candidato
          </h4>
          <p style={{ fontFamily: "var(--font-glacial)", color: '#183a5d' }} className="text-lg leading-relaxed max-w-3xl mx-auto">
            Queremos ser totalmente transparentes: este formulario no tiene respuestas "correctas" o "incorrectas". 
            El único objetivo es conocerte genuinamente y entender si tus valores y tu estilo de gestión se alinean con la cultura de nuestra marca. 
            Si hay una desconexión, es mejor para ambas partes descubrirla ahora que más adelante, en medio del proceso. 
            La sinceridad es la clave para construir una asociación exitosa y duradera.
            Una vez completado y recibido su formulario, nuestro equipo de desarrollo de franquicias lo revisará minuciosamente. 
            Si su perfil se alinea con nuestros criterios, nos pondremos en contacto para agendar una reunión inicial y profundizar en los detalles de la oportunidad.
            Agradecemos su tiempo y la seriedad con la que aborda este proceso.
          </p>
        </Card>

      </div>

      {/* Estilos utilitarios */}
      <style jsx>{`
        .field label {
          display: block;
          margin-bottom: 0.75rem;
          color:#1A3A52 !important;
          font-size: 1.1rem;
          font-family: sans-serif;
          letter-spacing: 0.02em;
        }
        .customInput {
          @apply w-full h-16 border-0 border-b-2 
                 bg-transparent text-[#1A3A52] placeholder:text-gray-400
                 transition-all duration-500 
                 text-xl rounded-none font-sans;
        }
        .customInput:focus {
          border-color: #1A3A52 !important;
        }
      `}</style>
    </section>
  )
}
