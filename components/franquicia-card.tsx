"use client"

import { useState, useEffect, useRef } from "react"
import ContactForm from "./contact-form"

export default function FranquiciaCard() {
  const [selectedCarouselItem, setSelectedCarouselItem] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [startBreathing, setStartBreathing] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return

      const rect = cardRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculamos qué tanto del card está visible
      const visibleTop = Math.max(0, rect.top)
      const visibleBottom = Math.min(windowHeight, rect.bottom)
      const visibleHeight = Math.max(0, visibleBottom - visibleTop)
      const totalHeight = rect.height

      const newProgress = Math.min(Math.max(visibleHeight / totalHeight, 0), 1)
      setProgress(newProgress)

      // Delay antes de la respiración
      if (newProgress > 0.95) {
        setTimeout(() => setStartBreathing(true), 2000)
      } else {
        setStartBreathing(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll reveal lento
  const translateX = (1 - progress) * -300
  const opacity = Math.min(progress * 1.2, 1)
  const scale = 0.98 + progress * 0.02

  return (
    <div className="mt-10 px-0 flex">
      <div
        ref={cardRef}
        className={`group relative overflow-hidden shadow-2xl transition-shadow duration-700 cursor-pointer rounded-r-2xl 
          w-full max-w-[650px] h-[20vh] md:h-[36vh] lg:h-[30vh]
          ${startBreathing ? "animate-breathSmooth" : ""}`}
        onClick={() => setSelectedCarouselItem("extra")}
        style={{
          transform: `translateX(${translateX}px) scale(${scale})`,
          opacity,
          transition: "transform 1.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.8s ease-out",
        }}
      >
        {/* Fondo con colores */}
        <div
          className="w-full h-full rounded-r-2xl"
          style={{
            background: "linear-gradient(135deg, #d1cec9 0%, #bdc7c8 50%, #dbdce0 100%)",
          }}
        ></div>

        {/* Gradiente decorativo */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#183a5d]/20 via-transparent to-transparent rounded-r-2xl"></div>

        {/* Título */}
        <div className="absolute bottom-16 left-6 transition-all duration-700">
          <h3
            style={{ fontFamily: "var(--font-times)", color: "#183a5d" }}
            className="font-bold leading-tight tracking-wide text-2xl md:text-3xl lg:text-4xl drop-shadow-md font-sans"
          >
            FRANQUICIAS DISPONIBLES
          </h3>
        </div>

        {/* Subtítulo */}
        <div className="absolute bottom-4 left-6 transition-all duration-700">
          <p
            style={{ fontFamily: "var(--font-muli)", color: "#183a5d" }}
            className="font-light leading-snug tracking-wide text-sm md:text-base lg:text-lg italic drop-shadow-sm"
          >
            Llevá The Salad Bar a tu ciudad
          </p>
        </div>

        {/* 🔘 Botón "Ver más" */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg shadow-md text-sm font-medium border transition-all duration-300"
            style={{
              backgroundColor: "white",
              color: "#7FCDCD",
              borderColor: "#7FCDCD",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#7FCDCD"
              e.currentTarget.style.color = "white"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white"
              e.currentTarget.style.color = "#7FCDCD"
            }}
          >
            <span>Ver más</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedCarouselItem === "extra" && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className="rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col"
            style={{ backgroundColor: "#E3E5E8" }}
          >
            <button
              onClick={() => setSelectedCarouselItem(null)}
              className="fixed top-6 right-6 bg-white/90 hover:bg-white rounded-full p-2 transition-all duration-200 hover:scale-110 cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                style={{ color: "#183a5d" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex-1 overflow-y-auto space-y-6">
              <div className="md:p-8">
                <h3
                  style={{ fontFamily: "var(--font-times)", color: "#183a5d" }}
                  className="text-3xl font-bold mb-4 font-sans"
                >
                  FRANQUICIAS DISPONIBLES
                </h3>
                <p
                  style={{ fontFamily: "var(--font-muli)", color: "#183a5d" }}
                  className="text-lg italic mb-6 font-sans"
                >
                  Llevá The Salad Bar a tu ciudad
                </p>
                <p
                  style={{ fontFamily: "var(--font-glacial)", color: "#000000" }}
                  className="leading-relaxed text-base font-sans"
                >
                  Agradecemos tu interés en unirte a la red de franquicias de The Salad Bar. Como parte de nuestro
                  proceso de selección, hemos diseñado este formulario con el objetivo de comprender mejor tu perfil,
                  experiencia y expectativas, asegurando así una sinergia exitosa y duradera entre ambas partes.
                  Toda la información proporcionada será tratada con estricta confidencialidad.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* 🌬️ Respiración fluida y visible */
        @keyframes breathSmooth {
          0%, 100% {
            transform: scale(1);
            filter: brightness(1);
            box-shadow: 0 0 25px rgba(31, 62, 83, 0.1);
          }
          40% {
            transform: scale(1.1);
            filter: brightness(1.15);
            box-shadow: 0 0 50px rgba(127, 205, 205, 0.3);
          }
          70% {
            transform: scale(1.04);
            filter: brightness(1.08);
            box-shadow: 0 0 35px rgba(127, 205, 205, 0.25);
          }
        }

        .animate-breathSmooth {
          animation: breathSmooth 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
