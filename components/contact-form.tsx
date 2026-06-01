"use client"

import { useState } from "react"

const fieldStyle: React.CSSProperties = {
  width: "100%",
  height: "3rem",
  border: 0,
  borderBottom: "2px solid #ddd5ca",
  background: "transparent",
  color: "#1a3a52",
  fontSize: "1rem",
  fontFamily: "var(--font-muli)",
  borderRadius: 0,
  outline: "none",
  transition: "border-color .3s",
  boxSizing: "border-box",
}

const textareaStyle: React.CSSProperties = {
  ...fieldStyle,
  height: "auto",
  minHeight: "5rem",
  resize: "vertical",
  paddingTop: "0.5rem",
}

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "0.75rem",
  color: "#1a3a52",
  fontSize: "0.95rem",
  fontFamily: "var(--font-muli)",
  letterSpacing: "0.02em",
}

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
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      <FormSection title="Información Personal">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px 48px" }}>
          <Field label="Nombre completo" name="nombre" value={formData.nombre} onChange={handleChange} />
          <Field label="Correo electrónico" name="email" type="email" value={formData.email} onChange={handleChange} />
          <Field label="Número de teléfono" name="telefono" type="tel" value={formData.telefono} onChange={handleChange} span />
          <Field label="Ciudad y país de residencia" name="ciudad" value={formData.ciudad} onChange={handleChange} span />
          <Field label="Ocupación actual" name="ocupacion" value={formData.ocupacion} onChange={handleChange} span />
        </div>
      </FormSection>

      <FormSection title="Interés y Expectativas">
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <TextArea label="¿Por qué le interesa adquirir una franquicia de nuestro negocio?" name="interes" value={formData.interes} onChange={handleChange} />
          <Field label="Ubicación geográfica de interés" name="ubicacion" value={formData.ubicacion} onChange={handleChange} />
          <TextArea label="Experiencia en hostelería o negocios" name="experiencia" value={formData.experiencia} onChange={handleChange} />
          <TextArea label="¿Tiene experiencia previa como empresario?" name="empresario" value={formData.empresario} onChange={handleChange} />
          <Field label="Motivación principal" name="motivacion" value={formData.motivacion} onChange={handleChange} />
          <Field label="¿Cómo se imagina su participación diaria?" name="participacion" value={formData.participacion} onChange={handleChange} />
          <Field label="Expectativas de retorno de inversión y rentabilidad" name="expectativas" value={formData.expectativas} onChange={handleChange} />
        </div>
      </FormSection>

      <FormSection title="Capacidad Financiera">
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <Field label="Capacidad de inversión aproximada" name="inversion" value={formData.inversion} onChange={handleChange} />
          <TextArea label="¿Cómo planea financiar la inversión inicial?" name="financiamiento" value={formData.financiamiento} onChange={handleChange} />
          <Field label="Horizonte de tiempo para comenzar el negocio" name="horizonte" value={formData.horizonte} onChange={handleChange} />
        </div>
      </FormSection>

      <FormSection title="Conectando con la Marca">
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <Field label="¿Qué cree que es lo más importante en un restaurante exitoso?" name="exito" value={formData.exito} onChange={handleChange} />
          <Field label="En una palabra, describa la experiencia que quiere ofrecer" name="experiencia_ofrecer" value={formData.experiencia_ofrecer} onChange={handleChange} />
          <TextArea label="Describa su estilo de liderazgo" name="liderazgo" value={formData.liderazgo} onChange={handleChange} />
          <Field label="¿Qué tan importante es el bienestar de sus empleados?" name="bienestar" value={formData.bienestar} onChange={handleChange} />
        </div>
      </FormSection>

      <div style={{ textAlign: "center" }}>
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
        <div style={{ padding: "14px 20px", borderRadius: 10, background: "rgba(127,205,205,0.12)", border: "1px solid rgba(127,205,205,0.45)", display: "flex", alignItems: "center", gap: 12, fontFamily: "var(--font-muli)", fontSize: 15, color: "#1a5c4a" }}>
          <span style={{ fontSize: 20 }}>✓</span>{success}
        </div>
      )}
      {error && (
        <div style={{ padding: "14px 20px", borderRadius: 10, background: "rgba(192,57,43,0.07)", border: "1px solid rgba(192,57,43,0.25)", display: "flex", alignItems: "center", gap: 12, fontFamily: "var(--font-muli)", fontSize: 15, color: "#922b21" }}>
          <span style={{ fontSize: 20 }}>✕</span>{error}
        </div>
      )}
    </form>
  )
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 style={{ fontFamily: "var(--font-muli)", fontWeight: 300, fontSize: "clamp(18px,1.8vw,22px)", color: "#1a3a52", margin: "0 0 24px" }}>
        {title}
      </h3>
      {children}
    </div>
  )
}

function Field({ label, name, value, onChange, type = "text", span }: {
  label: string; name: string; value?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string; span?: boolean
}) {
  return (
    <div style={span ? { gridColumn: "1 / -1" } : {}}>
      <label style={labelStyle}>{label}</label>
      <input
        name={name} type={type} value={value || ""} onChange={onChange}
        style={fieldStyle}
        onFocus={(e) => { e.currentTarget.style.borderColor = "#1a3a52"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "#ddd5ca"; }}
      />
    </div>
  )
}

function TextArea({ label, name, value, onChange }: {
  label: string; name: string; value?: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <textarea
        rows={3} name={name} value={value || ""} onChange={onChange}
        style={textareaStyle}
        onFocus={(e) => { e.currentTarget.style.borderColor = "#1a3a52"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "#ddd5ca"; }}
      />
    </div>
  )
}
