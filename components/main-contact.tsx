"use client"

import { useState } from "react"

export default function MainContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    comentario: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const upd =
    (k: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormData({ ...formData, [k]: e.target.value })

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
        setSuccess("Tu mensaje fue enviado con éxito")
        setFormData({ nombre: "", email: "", telefono: "", comentario: "" })
      } else {
        setError("Hubo un error al enviar el mensaje. Intenta de nuevo.")
      }
    } catch {
      setError("No se pudo conectar con el servidor.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const fieldStyle: React.CSSProperties = {
    fontFamily: "var(--font-muli)",
    fontSize: 17,
    color: "#1a3a52",
    background: "transparent",
    border: "1px solid #1a3a52",
    borderRadius: 0,
    padding: "14px 16px",
    outline: "none",
    width: "100%",
    transition: "box-shadow .25s",
    boxSizing: "border-box",
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-muli)",
    fontSize: 15,
    color: "#1a3a52",
    letterSpacing: ".02em",
    display: "block",
    marginBottom: 10,
  }

  return (
    <section
      id="contacto"
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#e8e4dd",
        padding: "140px 20px 100px",
      }}
    >
      {/* Decorative vertical lines */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.08, pointerEvents: "none" }}>
        <span
          style={{
            position: "absolute",
            top: 0,
            left: "25%",
            width: 1,
            height: "100%",
            background: "linear-gradient(180deg, transparent, #1a3a52, transparent)",
            display: "block",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: 0,
            right: "33%",
            width: 1,
            height: "100%",
            background: "linear-gradient(180deg, transparent, #1a3a52, transparent)",
            display: "block",
          }}
        />
      </div>

      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: 96, position: "relative", zIndex: 1 }}>
        <div
          style={{
            width: 96,
            height: 1,
            background: "linear-gradient(90deg, transparent, #1a3a52, transparent)",
            margin: "0 auto 36px",
          }}
        />
        <h2
          style={{
            fontFamily: "var(--font-muli)",
            fontWeight: 200,
            fontSize: "clamp(40px, 7vw, 128px)",
            lineHeight: 1,
            letterSpacing: ".04em",
            color: "#1a3a52",
            margin: 0,
          }}
        >
          Contactemos
        </h2>
      </div>

      {/* Card */}
      <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div
          style={{
            position: "relative",
            background: "#F0E9DE",
            borderRadius: 28,
            padding: "clamp(28px, 4vw, 80px)",
            boxShadow: "0 40px 90px -50px rgba(26,58,82,.35)",
            transition: "transform .9s ease, box-shadow .9s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)"
            e.currentTarget.style.boxShadow = "0 60px 120px -50px rgba(26,58,82,.5)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)"
            e.currentTarget.style.boxShadow = "0 40px 90px -50px rgba(26,58,82,.35)"
          }}
        >
          <span
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: 1,
              background: "linear-gradient(90deg, transparent, #1a3a52, transparent)",
              opacity: 0.5,
              display: "block",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 1,
              background: "linear-gradient(90deg, transparent, #1a3a52, transparent)",
              opacity: 0.5,
              display: "block",
            }}
          />

          <form onSubmit={handleSubmit}>
            <h3
              style={{
                fontFamily: "var(--font-muli)",
                fontWeight: 300,
                fontSize: "clamp(22px, 2.4vw, 30px)",
                color: "#1a3a52",
                margin: "0 0 48px",
                letterSpacing: ".01em",
              }}
            >
              Información Personal
            </h3>

            <div className="cform-grid">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={labelStyle}>Nombre completo</label>
                <input name="nombre" value={formData.nombre} onChange={upd("nombre")} style={fieldStyle} />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={labelStyle}>Correo electrónico</label>
                <input type="email" name="email" value={formData.email} onChange={upd("email")} style={fieldStyle} />
              </div>
              <div className="cform-full" style={{ display: "flex", flexDirection: "column" }}>
                <label style={labelStyle}>Número de teléfono</label>
                <input type="tel" name="telefono" value={formData.telefono} onChange={upd("telefono")} style={fieldStyle} />
              </div>
              <div className="cform-full" style={{ display: "flex", flexDirection: "column" }}>
                <label style={labelStyle}>Comentario</label>
                <textarea
                  name="comentario"
                  value={formData.comentario}
                  onChange={upd("comentario")}
                  style={{ ...fieldStyle, minHeight: 108, resize: "vertical" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: 52 }}>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  fontFamily: "var(--font-muli)",
                  fontSize: 16,
                  fontWeight: 300,
                  letterSpacing: ".25em",
                  textTransform: "uppercase",
                  padding: "18px 56px",
                  background: "transparent",
                  color: "#1a3a52",
                  border: "2px solid #1a3a52",
                  borderRadius: 0,
                  cursor: "pointer",
                  transition: "all .55s cubic-bezier(.2,.7,.2,1)",
                  boxShadow: "0 18px 40px -22px rgba(26,58,82,.35)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#1a3a52"
                  e.currentTarget.style.color = "#f5f3ef"
                  e.currentTarget.style.transform = "translateY(-3px) scale(1.03)"
                  e.currentTarget.style.boxShadow = "0 28px 60px -22px rgba(26,58,82,.5)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent"
                  e.currentTarget.style.color = "#1a3a52"
                  e.currentTarget.style.transform = "translateY(0) scale(1)"
                  e.currentTarget.style.boxShadow = "0 18px 40px -22px rgba(26,58,82,.35)"
                }}
              >
                {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
              </button>
            </div>

            {success && (
              <div style={{
                marginTop: 24,
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
                marginTop: 24,
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
          </form>
        </div>
      </div>

      <style jsx>{`
        .cform-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 36px 56px;
        }
        .cform-full {
          grid-column: 1 / -1;
        }
        @media (max-width: 640px) {
          .cform-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }
      `}</style>
    </section>
  )
}
