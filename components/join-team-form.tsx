"use client"

import { useState } from "react"

export default function JoinTeamForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [cvFile, setCvFile] = useState<File | null>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setCvFile(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSuccess(null)
    setError(null)

    try {
      const body = new FormData()
      body.append("name", formData.name)
      body.append("email", formData.email)
      body.append("phone", formData.phone)
      if (cvFile) {
        body.append("cvFile", cvFile)
      }

      const res = await fetch("/api/join-team", {
        method: "POST",
        body,
      })

      if (res.ok) {
        setSuccess("Tu postulación fue enviada con éxito 🎉")
        setFormData({
          name: "",
          email: "",
          phone: "",
        })
        setCvFile(null)
      } else {
        setError("Hubo un error al enviar la postulación. Intentá de nuevo.")
      }
    } catch (err) {
      setError("No se pudo conectar con el servidor.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h4
        className="text-xl font-semibold"
        style={{ fontFamily: "var(--font-muli)", color: "#1A3A52" }}
      >
        Postulate para sumarte al equipo
      </h4>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1" style={{ color: "#1A3A52" }}>
            Nombre y apellido
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border text-sm outline-none focus:ring-2 focus:ring-[#7FCDCD]"
          />
        </div>

        <div>
          <label className="block text-sm mb-1" style={{ color: "#1A3A52" }}>
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border text-sm outline-none focus:ring-2 focus:ring-[#7FCDCD]"
          />
        </div>

        <div>
          <label className="block text-sm mb-1" style={{ color: "#1A3A52" }}>
            Teléfono
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border text-sm outline-none focus:ring-2 focus:ring-[#7FCDCD]"
          />
        </div>
      </div>

      {/* 👇 Botón lindo para adjuntar PDF */}
      <div>
        <label className="block text-sm mb-1" style={{ color: "#1A3A52" }}>
          Adjuntá tu CV (PDF)
        </label>

        <div className="flex items-center gap-3">
          {/* Botón estilizado que dispara el input real */}
          <label
            htmlFor="cvFile"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium shadow-md border cursor-pointer transition-all duration-300"
            style={{
              backgroundColor: "white",
              color: "#1A3A52",
              borderColor: "#7FCDCD",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#E6F7F7"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white"
            }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v14m0-14L7 10m5-5l5 5"
              />
            </svg>
            <span>Seleccionar archivo</span>
          </label>

          {/* Nombre del archivo seleccionado */}
          <span className="text-xs text-gray-600 truncate max-w-[220px]">
            {cvFile ? cvFile.name : "Ningún archivo seleccionado"}
          </span>
        </div>

        {/* Input real, oculto */}
        <input
          id="cvFile"
          type="file"
          accept="application/pdf"
          name="cvFile"
          onChange={handleFileChange}
          className="hidden"
        />

        <p className="text-xs text-gray-400 mt-1">
          Solo se admite formato PDF.
        </p>
      </div>

      {success && <p className="text-sm text-green-600">{success}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 px-5 py-2 rounded-md text-sm font-medium shadow-md border transition-all duration-300 disabled:opacity-60"
        style={{
          backgroundColor: "#7FCDCD",
          color: "white",
          borderColor: "#7FCDCD",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#5bb5b5"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#7FCDCD"
        }}
      >
        {isSubmitting ? "Enviando..." : "Enviar postulación"}
      </button>

      <p className="text-xs mt-2" style={{ color: "#6B7280" }}>
        También podés enviar tu CV directamente al mail de la sucursal donde quieras incorporarte.
      </p>
    </form>
  )
}
