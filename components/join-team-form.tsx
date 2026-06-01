"use client"

import { useState } from "react"

const inp: React.CSSProperties = {
  width: "100%", height: "2.8rem",
  border: 0, borderBottom: "2px solid #ddd5ca",
  background: "transparent", color: "#1a3a52",
  fontSize: "0.95rem", fontFamily: "var(--font-muli)",
  borderRadius: 0, outline: "none",
  transition: "border-color .3s", boxSizing: "border-box",
}

const lbl: React.CSSProperties = {
  display: "block", marginBottom: 6,
  color: "#1a3a52", fontSize: "0.88rem",
  fontFamily: "var(--font-muli)", letterSpacing: ".02em",
}

export default function JoinTeamForm() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" })
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(p => ({ ...p, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true); setSuccess(null); setError(null)
    try {
      const body = new FormData()
      body.append("name", formData.name)
      body.append("email", formData.email)
      body.append("phone", formData.phone)
      if (cvFile) body.append("cvFile", cvFile)
      const res = await fetch("/api/join-team", { method: "POST", body })
      if (res.ok) {
        setSuccess("Tu postulación fue enviada con éxito")
        setFormData({ name: "", email: "", phone: "" }); setCvFile(null)
      } else { setError("Hubo un error al enviar la postulación. Intentá de nuevo.") }
    } catch { setError("No se pudo conectar con el servidor.") }
    finally { setIsSubmitting(false) }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20, borderTop: "1px solid #ddd5ca", paddingTop: 28, marginTop: 8 }}>
      <h4 style={{ fontFamily: "var(--font-muli)", fontWeight: 600, fontSize: 15, color: "#1a3a52", margin: 0, letterSpacing: ".04em", textTransform: "uppercase" }}>
        Postulate para sumarte al equipo
      </h4>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 32px" }}>
        <div>
          <label style={lbl}>Nombre y apellido</label>
          <input name="name" required value={formData.name} onChange={handleChange} style={inp}
            onFocus={e => e.currentTarget.style.borderColor = "#1a3a52"}
            onBlur={e => e.currentTarget.style.borderColor = "#ddd5ca"} />
        </div>
        <div>
          <label style={lbl}>Email</label>
          <input type="email" name="email" required value={formData.email} onChange={handleChange} style={inp}
            onFocus={e => e.currentTarget.style.borderColor = "#1a3a52"}
            onBlur={e => e.currentTarget.style.borderColor = "#ddd5ca"} />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={lbl}>Teléfono</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={inp}
            onFocus={e => e.currentTarget.style.borderColor = "#1a3a52"}
            onBlur={e => e.currentTarget.style.borderColor = "#ddd5ca"} />
        </div>
      </div>

      <div>
        <label style={lbl}>Adjuntá tu CV (PDF)</label>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <label htmlFor="cvFile" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", border: "1px solid #7fcdcd", borderRadius: 6, background: "white", color: "#1a3a52", fontSize: 13, fontFamily: "var(--font-muli)", cursor: "pointer", transition: "background .2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#e6f7f7"}
            onMouseLeave={e => e.currentTarget.style.background = "white"}>
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m0-14L7 10m5-5l5 5" />
            </svg>
            Seleccionar archivo
          </label>
          <span style={{ fontSize: 12, color: "#6b7280", fontFamily: "var(--font-muli)" }}>
            {cvFile ? cvFile.name : "Ningún archivo seleccionado"}
          </span>
        </div>
        <input id="cvFile" type="file" accept="application/pdf" name="cvFile"
          onChange={e => setCvFile(e.target.files?.[0] || null)}
          style={{ display: "none" }} />
        <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 6, fontFamily: "var(--font-muli)" }}>Solo se admite formato PDF.</p>
      </div>

      {success && (
        <div style={{ padding: "12px 16px", borderRadius: 8, background: "rgba(127,205,205,0.12)", border: "1px solid rgba(127,205,205,0.45)", display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-muli)", fontSize: 14, color: "#1a5c4a" }}>
          <span style={{ fontSize: 18 }}>✓</span>{success}
        </div>
      )}
      {error && (
        <div style={{ padding: "12px 16px", borderRadius: 8, background: "rgba(192,57,43,0.07)", border: "1px solid rgba(192,57,43,0.25)", display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-muli)", fontSize: 14, color: "#922b21" }}>
          <span style={{ fontSize: 18 }}>✕</span>{error}
        </div>
      )}

      <div>
        <button type="submit" disabled={isSubmitting}
          style={{ padding: "10px 28px", borderRadius: 6, background: "#7fcdcd", color: "white", border: "none", fontSize: 13, fontFamily: "var(--font-muli)", fontWeight: 500, letterSpacing: ".06em", cursor: "pointer", transition: "background .2s" }}
          onMouseEnter={e => e.currentTarget.style.background = "#5bb5b5"}
          onMouseLeave={e => e.currentTarget.style.background = "#7fcdcd"}>
          {isSubmitting ? "Enviando..." : "Enviar postulación"}
        </button>
        <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 8, fontFamily: "var(--font-muli)" }}>
          También podés enviar tu CV directamente al mail de la sucursal donde quieras incorporarte.
        </p>
      </div>
    </form>
  )
}
