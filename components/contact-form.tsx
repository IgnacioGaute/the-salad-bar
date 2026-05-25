"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactForm() {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
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
    } catch {
      setError("No se pudo conectar con el servidor.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="space-y-10" onSubmit={handleSubmit}>
      <FormSection title="Información Personal">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
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

      <div className="text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            fontFamily: "var(--font-muli)",
            fontSize: 15,
            fontWeight: 500,
            letterSpacing: ".08em",
            padding: "12px 40px",
            backgroundColor: "#7FCDCD",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            transition: "background-color .25s, transform .2s",
            boxShadow: "0 4px 14px -4px rgba(127,205,205,.6)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#5bb5b5"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#7FCDCD"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
        </button>
      </div>

      {success && (
        <div style={{
          padding: "14px 20px",
          borderRadius: 10,
          background: "rgba(127,205,205,0.12)",
          border: "1px solid rgba(127,205,205,0.45)",
          display: "flex", alignItems: "center", gap: 12,
          fontFamily: "var(--font-muli)", fontSize: 15, color: "#1a5c4a",
        }}>
          <span style={{ fontSize: 20 }}>✓</span>
          {success}
        </div>
      )}
      {error && (
        <div style={{
          padding: "14px 20px",
          borderRadius: 10,
          background: "rgba(192,57,43,0.07)",
          border: "1px solid rgba(192,57,43,0.25)",
          display: "flex", alignItems: "center", gap: 12,
          fontFamily: "var(--font-muli)", fontSize: 15, color: "#922b21",
        }}>
          <span style={{ fontSize: 20 }}>✕</span>
          {error}
        </div>
      )}

      <style jsx>{`
        .field label {
          display: block;
          margin-bottom: 0.75rem;
          color: #1a3a52 !important;
          font-size: 1rem;
          font-family: var(--font-muli);
          letter-spacing: 0.02em;
        }
        .customInput {
          width: 100%;
          height: 3rem;
          border: 0;
          border-bottom: 2px solid #ddd5ca;
          background: transparent;
          color: #1a3a52;
          transition: all 0.5s;
          font-size: 1rem;
          font-family: var(--font-muli);
          border-radius: 0;
          outline: none;
        }
        .customInput:focus {
          border-color: #1a3a52 !important;
        }
      `}</style>
    </form>
  )
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3
        style={{ fontFamily: "var(--font-muli)", color: "#1A3A52" }}
        className="text-xl sm:text-2xl font-light mb-5 sm:mb-8 text-center md:text-left"
      >
        {title}
      </h3>
      {children}
    </div>
  )
}

function InputField({ label, name, value, onChange, type = "text", colSpan }: {
  label: string
  name: string
  value?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  colSpan?: boolean
}) {
  return (
    <div className={`field ${colSpan ? "md:col-span-2" : ""}`}>
      <label>{label}</label>
      <Input name={name} type={type} value={value || ""} onChange={onChange} className="customInput" />
    </div>
  )
}

function TextAreaField({ label, name, value, onChange }: {
  label: string
  name: string
  value?: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}) {
  return (
    <div className="field">
      <label>{label}</label>
      <Textarea rows={3} name={name} value={value || ""} onChange={onChange} className="customInput" />
    </div>
  )
}
