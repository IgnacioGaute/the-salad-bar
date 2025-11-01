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
    <section className="relative overflow-hidden mt-5 px-5 sm:px-10 md:px-20 pb-10 sm:pb-20">

      {/* Líneas decorativas */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#4A90E2] to-transparent"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-[#4A90E2] to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Formulario */}
        <Card
          className="border-2 shadow-3xl backdrop-blur-xl hover:shadow-4xl 
                     transition-all duration-1000 animate-in slide-in-from-bottom-12 
                     hover:scale-[1.01] rounded-3xl relative overflow-hidden"
          style={{ backgroundColor: "#E3E5E8", borderColor: "#1A3A52" }}
        >
          {/* Líneas de borde */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#4A90E2] to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#4A90E2] to-transparent z-10"></div>

          <CardContent className="p-6 sm:p-10 md:p-20">
            <form className="space-y-16 sm:space-y-20 md:space-y-24" onSubmit={handleSubmit}>
              {/* === Secciones del Formulario === */}
              <FormSection title="Información Personal">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                  <InputField label="Nombre completo" name="nombre" value={formData.nombre} onChange={handleChange} />
                  <InputField label="Correo electrónico" name="email" type="email" value={formData.email} onChange={handleChange} />
                  <InputField label="Número de teléfono" name="telefono" type="tel" value={formData.telefono} onChange={handleChange} colSpan />
                  <InputField label="Ciudad y país de residencia" name="ciudad" value={formData.ciudad} onChange={handleChange} colSpan />
                  <InputField label="Ocupación actual" name="ocupacion" value={formData.ocupacion} onChange={handleChange} colSpan />
                </div>
              </FormSection>

              <FormSection title="Interés y Expectativas">
                <TextAreaField label="¿Por qué le interesa adquirir una franquicia de nuestro negocio?" name="interes" value={formData.interes} onChange={handleChange} />
                <InputField label="Ubicación geográfica de interés" name="ubicacion" value={formData.ubicacion} onChange={handleChange} />
                <TextAreaField label="Experiencia en hostelería o negocios" name="experiencia" value={formData.experiencia} onChange={handleChange} />
                <TextAreaField label="¿Tiene experiencia previa como empresario?" name="empresario" value={formData.empresario} onChange={handleChange} />
                <InputField label="Motivación principal" name="motivacion" value={formData.motivacion} onChange={handleChange} />
                <InputField label="¿Cómo se imagina su participación diaria?" name="participacion" value={formData.participacion} onChange={handleChange} />
                <InputField label="Expectativas de retorno de inversión y rentabilidad" name="expectativas" value={formData.expectativas} onChange={handleChange} />
              </FormSection>

              <FormSection title="Capacidad Financiera">
                <InputField label="Capacidad de inversión aproximada" name="inversion" value={formData.inversion} onChange={handleChange} />
                <TextAreaField label="¿Cómo planea financiar la inversión inicial?" name="financiamiento" value={formData.financiamiento} onChange={handleChange} />
                <InputField label="Horizonte de tiempo para comenzar el negocio" name="horizonte" value={formData.horizonte} onChange={handleChange} />
              </FormSection>

              <FormSection title="Conectando con la Marca">
                <InputField label="¿Qué cree que es lo más importante en un restaurante exitoso?" name="exito" value={formData.exito} onChange={handleChange} />
                <InputField label="En una palabra, describa la experiencia que quiere ofrecer" name="experiencia_ofrecer" value={formData.experiencia_ofrecer} onChange={handleChange} />
                <TextAreaField label="Describa su estilo de liderazgo" name="liderazgo" value={formData.liderazgo} onChange={handleChange} />
                <InputField label="¿Qué tan importante es el bienestar de sus empleados?" name="bienestar" value={formData.bienestar} onChange={handleChange} />
              </FormSection>

              {/* === Botón === */}
              <div className="text-center">
                <Button
                  style={{ fontFamily: "var(--font-muli)", borderColor: "#1A3A52", color: "#1A3A52" }}
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="bg-transparent border-2 hover:bg-[#1A3A52] hover:border-[#1A3A52] 
                             px-10 sm:px-16 py-4 sm:py-6 text-lg sm:text-xl font-light rounded-none 
                             transition-all duration-700 hover:scale-110 hover:shadow-2xl hover:-translate-y-2 shadow-xl 
                             tracking-widest uppercase font-sans"
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#E3E5E8" }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "#1A3A52" }}
                >
                  {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
                </Button>
              </div>

              {success && <p className="text-green-600 text-center">{success}</p>}
              {error && <p className="text-red-500 text-center">{error}</p>}
            </form>
          </CardContent>
        </Card>

        {/* === Nota Final === */}
        <Card
          className="mt-10 sm:mt-16 border-2 shadow-2xl backdrop-blur-xl rounded-3xl p-6 sm:p-12 text-center
                     transition-all duration-1000 hover:shadow-4xl hover:scale-[1.01] animate-in slide-in-from-bottom-12"
          style={{ backgroundColor: "#E3E5E8", borderColor: "#1A3A52" }}
        >
          <h4 style={{ fontFamily: "var(--font-muli)", color: "#1A3A52" }} className="text-xl sm:text-2xl font-serif mb-4">
            Una Nota para el Candidato
          </h4>
          <p style={{ fontFamily: "var(--font-glacial)", color: "#183a5d" }} className="text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Queremos ser totalmente transparentes: este formulario no tiene respuestas “correctas” o “incorrectas”.
            El objetivo es conocerte genuinamente y entender si tus valores se alinean con la cultura de nuestra marca.
            Si hay una desconexión, es mejor descubrirla ahora que más adelante. La sinceridad es clave para construir una asociación exitosa.
            Una vez recibido el formulario, nuestro equipo de desarrollo lo revisará. Si tu perfil se alinea con nuestros criterios, te contactaremos para una reunión inicial.
            Agradecemos tu tiempo y compromiso con este proceso.
          </p>
        </Card>
      </div>

      {/* Estilos utilitarios */}
      <style jsx>{`
        .field label {
          display: block;
          margin-bottom: 0.75rem;
          color: #1A3A52 !important;
          font-size: 1rem;
          font-family: sans-serif;
          letter-spacing: 0.02em;
        }
        .customInput {
          @apply w-full h-12 sm:h-14 md:h-16 border-0 border-b-2 
                 bg-transparent text-[#1A3A52] placeholder:text-gray-400
                 transition-all duration-500 text-base sm:text-lg md:text-xl rounded-none font-sans;
        }
        .customInput:focus {
          border-color: #1A3A52 !important;
        }
      `}</style>
    </section>
  )
}

/* === Subcomponentes reutilizables === */
function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3
        style={{ fontFamily: "var(--font-muli)", color: "#1A3A52" }}
        className="text-2xl sm:text-3xl font-serif font-light mb-8 sm:mb-14 text-center md:text-left"
      >
        {title}
      </h3>
      {children}
    </div>
  )
}

function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  colSpan,
}: any) {
  return (
    <div className={`field ${colSpan ? "md:col-span-2" : ""}`}>
      <label>{label}</label>
      <Input name={name} type={type} value={value || ""} onChange={onChange} className="customInput" />
    </div>
  )
}

function TextAreaField({
  label,
  name,
  value,
  onChange,
}: any) {
  return (
    <div className="field">
      <label>{label}</label>
      <Textarea rows={3} name={name} value={value || ""} onChange={onChange} className="customInput" />
    </div>
  )
}
