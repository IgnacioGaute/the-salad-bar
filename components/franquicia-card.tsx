import { useState } from "react"

export default function FranquiciaCard() {
  const [selectedCarouselItem, setSelectedCarouselItem] = useState<string | null>(null)

  return (
    <div className="mt-10 px-4 md:px-8">
      <div
        className="group relative overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 cursor-pointer rounded-2xl"
        onClick={() => setSelectedCarouselItem("extra")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            setSelectedCarouselItem("extra")
          }
        }}
      >
        {/* Imagen con blur en hover */}
        <img
          src="/natural-wood-terrace.png"
          alt="FRANQUICIAS DISPONIBLES"
          className="w-full h-[32vh] md:h-[44vh] lg:h-[56vh] object-cover transition-all duration-500 group-hover:blur-sm group-hover:scale-110 rounded-2xl"
        />

        {/* Gradiente para contraste */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/60 via-stone-900/40 to-transparent rounded-2xl"></div>

        {/* Título */}
        <div className="absolute bottom-20 left-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-500">
          <h3 className="font-bold leading-tight tracking-wide text-2xl md:text-3xl lg:text-4xl drop-shadow-md font-sans">
            FRANQUICIAS DISPONIBLES
          </h3>
        </div>

        {/* Subtítulo */}
        <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-500">
          <p className="font-light leading-snug tracking-wide text-sm md:text-base lg:text-lg drop-shadow-sm font-sans italic">
            Llevá The Salad Bar a tu ciudad
          </p>
        </div>

        {/* "Ver más" arriba a la derecha */}
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/90 hover:bg-[#F5E6D3] border border-[#D4A373] shadow-md hover:shadow-lg text-[#D4A373] text-sm font-medium transition-all duration-300">
            <span>Ver más</span>
            <svg
            className="w-4 h-4 text-[#D4A373]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
            />
            </svg>
        </button>
        </div>


      </div>

      {/* Dialog extra */}
      {selectedCarouselItem === "extra" && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden animate-in slide-in-from-right-8 duration-500 flex flex-col">
            <div className="relative flex-shrink-0">
              <img
                src="/natural-wood-terrace.png"
                alt="FRANQUICIAS DISPONIBLES"
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedCarouselItem(null)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 transition-all duration-200 hover:scale-110"
              >
                <svg
                  className="w-6 h-6 text-stone-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="p-8">
                <h3 className="text-3xl font-bold text-stone-800 mb-4 font-sans">FRANQUICIAS DISPONIBLES</h3>
                <p className="text-lg text-amber-600 italic mb-6 font-sans">Llevá The Salad Bar a tu ciudad</p>
                <p className="text-stone-700 leading-relaxed text-base font-sans">
                  Agradecemos tu interés en unirte a la red de franquicias de The Salad Bar. Como parte de nuestro
                  proceso de selección, hemos diseñado este formulario con el objetivo de comprender mejor tu perfil,
                  experiencia y expectativas, asegurando así una sinergia exitosa y duradera entre ambas partes. Este
                  cuestionario nos permitirá evaluar tu idoneidad como socio estratégico y, a su vez, te proporcionará
                  una oportunidad para reflexionar sobre los requisitos y responsabilidades que conlleva la adquisición
                  de una franquicia. Toda la información proporcionada será tratada con estricta confidencialidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
