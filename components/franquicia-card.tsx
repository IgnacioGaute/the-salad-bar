"use client"

import { useState, useEffect, useRef } from "react"
import ContactForm from "./contact-form"

export default function FranquiciaCard() {
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const visibleTop = Math.max(0, rect.top)
      const visibleBottom = Math.min(windowHeight, rect.bottom)
      const visibleHeight = Math.max(0, visibleBottom - visibleTop)
      const newProgress = Math.min(Math.max(visibleHeight / rect.height, 0), 1)
      setProgress(newProgress)
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const opacity = Math.min(progress * 1.5, 1)
  const translateY = (1 - progress) * 50

  return (
    <>
      {/* Card */}
      <div
        ref={cardRef}
        className="relative w-full overflow-hidden cursor-pointer group"
        style={{
          height: "420px",
          opacity,
          transform: `translateY(${translateY}px)`,
          transition: "transform 1.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.4s ease-out",
        }}
        onClick={() => setOpen(true)}
      >
        {/* Foto de fondo */}
        <img
          src="/pg-04.jpeg"
          alt="Franquicias The Salad Bar"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[8000ms] group-hover:scale-105"
        />

        {/* Overlay gradiente navy */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(26,58,82,0.97) 0%, rgba(26,58,82,0.80) 45%, rgba(26,58,82,0.25) 100%)",
          }}
        />

        {/* Contenido */}
        <div className="absolute inset-0 flex items-center px-10 md:px-20">
          <div className="max-w-lg">
            <div className="w-14 h-px mb-6" style={{ backgroundColor: "#7fcdcd" }} />

            <h2
              style={{ fontFamily: "var(--font-times)", color: "white" }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-wide mb-2"
            >
              FRANQUICIAS
            </h2>
            <h2
              style={{ fontFamily: "var(--font-times)", color: "#7fcdcd" }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-wide mb-6"
            >
              DISPONIBLES
            </h2>

            <p
              style={{ fontFamily: "var(--font-muli)", color: "rgba(255,255,255,0.80)" }}
              className="text-lg italic mb-10 tracking-wide"
            >
              Llevá The Salad Bar a tu ciudad
            </p>

            <button
              className="flex items-center gap-3 px-8 py-3 border-2 font-medium tracking-widest uppercase transition-all duration-500"
              style={{
                fontFamily: "var(--font-muli)",
                borderColor: "#7fcdcd",
                color: "white",
                fontSize: "0.8rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#7fcdcd"
                e.currentTarget.style.color = "#1a3a52"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
                e.currentTarget.style.color = "white"
              }}
            >
              SOLICITAR INFORMACIÓN
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Elemento decorativo derecha */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 hidden md:block pointer-events-none">
          <div className="w-48 h-48 border border-white/20 rounded-full group-hover:border-white/30 transition-all duration-700" />
          <div className="w-32 h-32 border border-[#7fcdcd]/30 rounded-full absolute top-8 left-8 group-hover:border-[#7fcdcd]/50 transition-all duration-700" />
          <div className="w-4 h-4 rounded-full absolute top-22 left-22 group-hover:scale-150 transition-all duration-700" style={{ backgroundColor: "#7fcdcd", opacity: 0.5, top: "88px", left: "88px" }} />
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setOpen(false)}
        >
          <div
            className="rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-400"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del dialog */}
            <div className="relative flex-shrink-0 px-8 md:px-12 py-8" style={{ backgroundColor: "#1a3a52" }}>
              <div className="w-10 h-px mb-4" style={{ backgroundColor: "#7fcdcd" }} />
              <h3
                style={{ fontFamily: "var(--font-times)", color: "white" }}
                className="text-3xl md:text-4xl font-bold mb-1 leading-tight"
              >
                FRANQUICIAS DISPONIBLES
              </h3>
              <p
                style={{ fontFamily: "var(--font-muli)", color: "#7fcdcd" }}
                className="text-base italic mb-3"
              >
                Llevá The Salad Bar a tu ciudad
              </p>
              <p
                style={{ fontFamily: "var(--font-glacial)", color: "rgba(255,255,255,0.70)" }}
                className="text-sm leading-relaxed max-w-2xl"
              >
                Agradecemos tu interés. Este formulario nos permite conocerte mejor y asegurar
                una asociación exitosa y duradera. Toda la información es tratada con estricta confidencialidad.
              </p>
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/25 rounded-full p-2 transition-all duration-200 hover:scale-110 cursor-pointer"
              >
                <svg className="w-5 h-5" style={{ color: "white" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Formulario */}
            <div className="flex-1 overflow-y-auto" style={{ backgroundColor: "#f5f3ef" }}>
              <ContactForm />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
