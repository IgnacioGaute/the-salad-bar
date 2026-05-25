"use client"
import { Button } from "@/components/ui/button"
import type React from "react"
import { useEffect, useState } from "react"
import { type CarouselApi, Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import FranquiciaCard from "@/components/franquicia-card"
import MainContactForm from "@/components/main-contact"
import { Instagram, Mail, Phone } from "lucide-react"
import JoinTeamForm from "@/components/join-team-form"

function CarouselCell({
  images,
  initialDelay = 0,
  objectFit = "cover",
  height = "220px",
  containerStyle = {},
}: {
  images: string[]
  initialDelay?: number
  objectFit?: "cover" | "contain"
  height?: string
  containerStyle?: React.CSSProperties
}) {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => setCurrent(p => (p + 1) % images.length), 2800)
      return () => clearInterval(interval)
    }, initialDelay)
    return () => clearTimeout(timeout)
  }, [images.length, initialDelay])
  return (
    <div className="relative overflow-hidden rounded-sm" style={{ height, ...containerStyle }}>
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt="Plato The Salad Bar"
          className="absolute inset-0 w-full h-full transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0, objectFit }}
        />
      ))}
    </div>
  )
}

export default function HomePage() {
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false)
  const [experienciaCarouselApi, setExperienciaCarouselApi] = useState<CarouselApi | undefined>(undefined)
  const [experienciaSelectedIndex, setExperienciaSelectedIndex] = useState(0)
  const [selectedCarouselItem, setSelectedCarouselItem] = useState<number | null>(null)

  
  const carouselData = [
    {
      src: "/new-seasons.jpeg",
      title: "THE\nSEASONS",
      subtitle: "Las estaciones no solo hablan del clima.",
      description:
        "En The Salad Bar, la experiencia es tan importante como la comida. Acompañamos el ritmo de las estaciones y los diferentes momentos de nuestros clientes, creando un ambiente que conecta con su estado de ánimo a través de la música, el entorno y la decoración. Nuestro compromiso con la calidad, la frescura de los ingredientes y la lealtad de nuestros clientes nos impulsa a renovar la carta constantemente, con cada estación. De esta manera, no solo seguimos las tendencias, sino que también las creamos nosotros mismos, garantizando que siempre haya algo nuevo para disfrutar. Las estaciones no solo hablan del clima. Hablan de un mood, de un momento, de una energía. Y en The Salad Bar, respetamos cada uno de ellos.",
    },
    {
      src: "/new-equipo.jpeg",
      title: "SE PARTE DE NUESTRO EQUIPO",
      subtitle: "",
      description:
        "En nuestro equipo compartimos valores, el sentido de la responsabilidad y la pasión. Compartir estos valores no solo nos define, sino que también crea un ambiente de trabajo excepcional, un lugar que se disfruta mucho y de que te vas a sentir orgulloso  de pertenecer. Aquí, el crecimiento no tiene límites. Te ofrecemos la capacitación continua para que vayas más allá de lo que creías posible. Queremos tu espíritu joven y profesional,  para acompañar nuestra filosofía, un ambiente distendido que no compromete la excelencia. Al final de esta presentación, envía tu CV al mail de la sucursal donde quieras incorporarte.",
    },
    {
      src: "/new-historia.jpeg",
      title: "NUESTRA HISTORIA",
      subtitle: "",
      description:
        "Juli y Jorge son nuestros fundadores. Juli dedicó muchos años al mundo gastronómico en destinos como Norteamérica, España y el Caribe. Allí vivió experiencias que le demostraron que lo saludable podía ser rico, abundante y nutritivo, sin perder sabor ni disfrute. Al regresar a Argentina en 2022 notó que esa propuesta no existía y deciden crear juntos The Salad Bar: un proyecto con alma propia, pensado para que la alimentación consciente no fuera aburrida y para que cada persona —cliente o colaborador— pudiera sentirse parte de algo especial. Jorge, se convierte en un pilar fundamental para The Salad Bar, aportando su experiencia, compromiso y apoyo en diferentes áreas para que el proyecto creciera y se consolidara. Con pasión por los detalles y por la experiencia humana, pensaron cada aspecto del local: desde la carta, los espacios y  hasta la música que acompaña cada momento. Comenzaron con una libreta llena de recetas, una idea clara y el deseo de formar un equipo que trabajara con compromiso, pero también con alegría y propósito.  Hoy The Salad Bar no es solo un lugar para comer: es el reflejo en cada plato, detalle y experiencia de la misma energía que inspiró su creación. ",
    },
    {
      src: "/new-momentos.jpeg",
      title: "MOMENTOS",
      subtitle: "Be Real",
      description:
        "Creamos y nos encontramos en esos momentos que nos hacen bien. Compartimos  con gente que siente igual el disfrute y la alegría de vivir. Si andás cerca súmate y vivámoslo juntos.",
    },
  ]



  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

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
        setFormData({ name: "", email: "", phone: "", message: "" })
      } else {
        setError("Hubo un error al enviar el mensaje. Intenta de nuevo.")
      }
    } catch (err) {
      setError("No se pudo conectar con el servidor.")
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (!experienciaCarouselApi) return
    const updateSelected = () => setExperienciaSelectedIndex(experienciaCarouselApi.selectedScrollSnap())
    updateSelected()
    experienciaCarouselApi.on("select", updateSelected)
    experienciaCarouselApi.on("reInit", updateSelected)
    return () => {
      experienciaCarouselApi.off("select", updateSelected)
      experienciaCarouselApi.off("reInit", updateSelected)
    }
  }, [experienciaCarouselApi])
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F3EF" }}>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] sm:h-screen flex items-center justify-center overflow-hidden px-4 sm:px-10 pb-10 sm:pb-0">
  {/* Fondo con video */}
  <div className="absolute inset-0 z-0 overflow-hidden bg-stone-900">
    <video
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
      poster=""
    >
      <source src="https://zonohzcylydpimhxkqjm.supabase.co/storage/v1/object/public/adaptia-documents1/lv_7590901979958742289_20260415230706.mp4" type="video/mp4" />
      <img src="/fondo-med.png" alt="The Salad Bar" className="w-full h-full object-cover" />
    </video>
    <div className="absolute inset-0 bg-gradient-to-b from-stone-900/30 via-transparent to-stone-900/70"></div>
  </div>

</section>

<section id="filosofia" className="py-40 relative overflow-hidden" style={{ backgroundColor: "#E8E4DD" }}>
  <div className="absolute inset-0 opacity-5">
    <div
      className="absolute top-20 left-20 w-96 h-96 border rounded-full"
      style={{ borderColor: "#DDD5CA" }}
    ></div>
    <div
      className="absolute bottom-20 right-20 w-64 h-64 border rounded-full"
      style={{ borderColor: "#DDD5CA" }}
    ></div>
  </div>

  <div className="max-w-8xl mx-auto px-6 relative">
    {/* 👇 unificado: gap + min height + centrado vertical */}
    <div className="grid md:grid-cols-2 gap-24 items-center min-h-[700px]">
      <div className="animate-in slide-in-from-left-12 duration-1500 h-full flex flex-col justify-center">
        <div className="space-y-12">
          <div className="w-24 h-px bg-gradient-to-r from-[#1A3A52] to-transparent animate-in slide-in-from-left-8 duration-1500 delay-200"></div>

          <h2
            style={{ fontFamily: "var(--font-muli)", color: "#1A3A52" }}
            className="text-6xl md:text-8xl font-serif font-light leading-none tracking-wide"
          >
            FILOSOFIA
          </h2>

          <div className="space-y-8" style={{ color: "#1A3A52" }}>
            <p
              style={{ fontFamily: "var(--font-glacial)" }}
              className="text-xl leading-relaxed font-light animate-in fade-in duration-1500 delay-400 font-sans"
            >
              Nuestros valores destacan que{" "}
              <span className="block italic font-light" style={{ color: "#2C4F6B" }}>
                COMER BIEN ES UNA FORMA DE AUTO RESPETO
              </span>
              y comer bien es una combinación que reúne calidad, sabor, conciencia, servicio y experiencia. Somos
              muy exigentes con la calidad y frescura de nuestros insumos, queremos darte lo mejor y en un entorno
              que te haga sentir bien. Buscamos que cada visita se sienta para vos una experiencia ligera, fresca
              y con aire de vacaciones, que refleja un estilo de vida, por lo que en estos años creamos una
              propuesta que asegura un público fiel, que no solo conecta con el producto sino emocionalmente con
              la marca.
            </p>
          </div>
        </div>
      </div>

      <div className="animate-in slide-in-from-right-12 duration-1500 group h-full flex items-center">
        <div className="relative w-full h-[700px]">
          <img
            src="/filosofia.jpeg"
            alt="Barra de ensaladas con ingredientes frescos"
            className="w-full h-full object-cover shadow-2xl transition-all duration-1000 group-hover:shadow-3xl"
          />
          <div
            className="absolute -bottom-8 -right-8 w-32 h-32 opacity-20 group-hover:opacity-30 transition-opacity duration-700"
            style={{ backgroundColor: "#DDD5CA" }}
          ></div>
          <div
            className="absolute -top-8 -left-8 w-24 h-24 border-2 opacity-30 group-hover:opacity-50 transition-opacity duration-700"
            style={{ borderColor: "#DDD5CA" }}
          ></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section
  id="historia"
  className="py-40 relative overflow-hidden animate-in slide-in-from-top-8 duration-[2000ms]"
  style={{ backgroundColor: "#F5F3EF" }}
>
  <div className="absolute inset-0 opacity-5">
    <div className="absolute top-20 left-20 w-96 h-96 border rounded-full" style={{ borderColor: "#DDD5CA" }}></div>
    <div className="absolute bottom-20 right-20 w-64 h-64 border rounded-full" style={{ borderColor: "#DDD5CA" }}></div>
  </div>
  <div className="max-w-8xl mx-auto px-6 relative">
    <div className="grid md:grid-cols-2 gap-24 items-center min-h-[700px]">

      {/* 2×3 carruseles automáticos — izquierda */}
      <div className="animate-in slide-in-from-left-12 duration-1000 delay-200">
        <div className="grid grid-cols-2 gap-3">
          <CarouselCell initialDelay={0}    images={["/pg-04.jpeg", "/pg-10.jpeg", "/pg-16.jpeg"]} />
          <CarouselCell initialDelay={500}  images={["/pg-02.jpeg", "/pg-08.jpeg", "/pg-14.jpeg"]} />
          <CarouselCell initialDelay={1000} images={["/pg-01.jpeg", "/pg-07.jpeg", "/pg-13.jpeg"]} />
          <CarouselCell initialDelay={1500} images={["/pg-03.jpeg", "/pg-09.jpeg", "/pg-15.jpeg"]} />
          <CarouselCell initialDelay={2000} images={["/pg-05.jpeg", "/pg-11.jpeg", "/pg-06.jpeg"]} />
          <CarouselCell initialDelay={2500} images={["/pg-12.jpeg", "/pg-16.jpeg", "/pg-02.jpeg"]} />
        </div>
      </div>

      {/* Texto — derecha */}
      <div className="animate-in slide-in-from-right-12 duration-1000 delay-400 h-full flex flex-col justify-center">
        <div className="space-y-8">
          <div className="w-24 h-px bg-gradient-to-r from-[#1A3A52] to-transparent"></div>
          <h3
            style={{ fontFamily: "var(--font-muli)", color: "#1A3A52" }}
            className="text-5xl md:text-6xl font-serif font-light leading-none tracking-wide"
          >
            PROPUESTA GASTRONÓMICA
          </h3>
          <ul
            style={{ fontFamily: "var(--font-glacial)", color: "#1A3A52" }}
            className="list-disc list-inside space-y-2 text-lg font-sans"
          >
            <li>Desayunos, brunch y meriendas</li>
            <li>Armá tu propia ensalada / The Salad Bar + de 55 ingredientes</li>
            <li>Pre Set Bowls</li>
            <li>Sopas</li>
            <li>Platos elaborados</li>
            <li>Wraps y Sandwiches</li>
            <li>Jugos naturales y smoothies</li>
            <li>The Bar: aperitivos, vinos y cerveza</li>
          </ul>
          <div
            style={{ fontFamily: "var(--font-glacial)", color: "#1A3A52" }}
            className="space-y-4 text-lg leading-relaxed font-sans"
          >
            <p>
              En The Salad Bar, creemos que lo rico y nutritivo pueden ir de la mano. Cocinamos con pasión y
              atención al detalle, cuidando la calidad de los ingredientes y los métodos de cocción para
              destacar sus sabores naturales.
            </p>
            <p>
              Completa nuestra propuesta: desayunos, brunch, meriendas y el bar, siguiendo la misma línea.
              Veganos, vegetarianos y celíacos también encontrarán opciones, sin ser restrictivo.
            </p>
            <p>
              Siendo razonables con los precios, generosos con las porciones y exigentes con la calidad,
              logramos un producto que hace que la gente nos recomiende y quiera volver.
            </p>
          </div>
          <div className="w-16 h-px bg-gradient-to-r from-[#1A3A52] to-transparent"></div>
        </div>
      </div>

    </div>
  </div>
</section>

<section id="cafeteria" className="py-40 relative overflow-hidden" style={{ backgroundColor: "#E8E4DD" }}>
  <div className="absolute inset-0 opacity-5">
    <div
      className="absolute top-20 left-20 w-96 h-96 border rounded-full"
      style={{ borderColor: "#DDD5CA" }}
    ></div>
    <div
      className="absolute bottom-20 right-20 w-64 h-64 border rounded-full"
      style={{ borderColor: "#DDD5CA" }}
    ></div>
  </div>

  <div className="max-w-8xl mx-auto px-6 relative">
    {/* 👇 mismo layout que las otras dos */}
    <div className="grid md:grid-cols-2 gap-24 items-center min-h-[700px]">
      <div className="animate-in slide-in-from-left-12 duration-1500 h-full flex flex-col justify-center">
        <div className="space-y-12">
          <div className="w-24 h-px bg-gradient-to-r from-[#1A3A52] to-transparent animate-in slide-in-from-left-8 duration-1500 delay-200"></div>

          <h2
            style={{ fontFamily: "var(--font-muli)", color: "#1A3A52" }}
            className="text-5xl md:text-6xl font-serif font-light leading-none tracking-wide"
          >
            CAFETERIA - EASY NIGHTS
          </h2>
          <div className="space-y-8" style={{ color: "#1A3A52" }}>
            <p
              style={{ fontFamily: "var(--font-glacial)" }}
              className="text-xl leading-relaxed font-light animate-in fade-in duration-1500 delay-400 font-sans"
            >
              Siguiendo la misma linea y con un gran desafío nos comprometemos a brindarte en cada brunch,
              merienda, tentempié y a cualquier hora, propuestas de las que estamos enamorados, smoothies,
              panqueques, tostones llenos de nutrición, pastelería de nuestra cocina, jugos naturales para
              levantar cualquier estado y por supuesto café, para nosotros de la mejor calidad. Sentite libre,
              sentite liviano, sentite sano. Nosotros nos comprometemos a cuidarte. 
              <br />
              Y parte de llevar una vida
              saludable nos habla de esas charlas con amigos, de ese ratito de despeje al ir terminando el dia, un
              aperitivo , una picadita y buena musica. Easy nights crean el ambiente perfecto para esa pausa, para
              que te relajes, desconectes, las charlas fluyan y te pongas al dia.
            </p>
          </div>
        </div>
      </div>
      {/* 2×3 carruseles automáticos — cafetería */}
      <div className="animate-in slide-in-from-right-12 duration-1500 h-full flex items-center">
        <div className="grid grid-cols-2 gap-3 w-full">
          <CarouselCell initialDelay={0}    images={["/cf-01.jpeg", "/cf-07.jpeg", "/cf-13.jpeg"]} />
          <CarouselCell initialDelay={500}  images={["/cf-02.jpeg", "/cf-08.jpeg", "/cf-14.jpeg"]} />
          <CarouselCell initialDelay={1000} images={["/cf-03.jpeg", "/cf-09.jpeg", "/cf-15.jpeg"]} />
          <CarouselCell initialDelay={1500} images={["/cf-04.jpeg", "/cf-10.jpeg"]} />
          <CarouselCell initialDelay={2000} images={["/cf-05.jpeg", "/cf-11.jpeg"]} />
          <CarouselCell initialDelay={2500} images={["/cf-06.jpeg", "/cf-12.jpeg"]} />
        </div>
      </div>
    </div>
  </div>
</section>

      <section
        className="py-5 pr-10 pl-10"
        style={{ background: "linear-gradient(to bottom, #F5F3EF, #E8E4DD)" }}
        id="experiencia-culinaria"
      >
        <div className="w-full px-0">
          <div className="text-center md:mb-12 animate-in fade-in duration-1500">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#DDD5CA] to-transparent mx-auto mb-8"></div>
            <h2
              className="text-5xl md:text-6xl font-serif font-light mb-4 md:mb-8 tracking-wide"
              style={{ color: "#1A3A52" }}
            ></h2>
          </div>

          {/* Flechas de navegación arriba a la derecha */}
          <div className="flex justify-end gap-4 mb-6 mr-5">
            <button
              onClick={() => experienciaCarouselApi?.scrollPrev()}
              className="bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
              style={{ color: "#1A3A52" }}
              onMouseEnter={(e) => {
                ;(e.target as HTMLElement).style.color = "#2C4F6B"
              }}
              onMouseLeave={(e) => {
                ;(e.target as HTMLElement).style.color = "#1A3A52"
              }}
              aria-label="Anterior"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => experienciaCarouselApi?.scrollNext()}
              className="bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
              style={{ color: "#1A3A52" }}
              onMouseEnter={(e) => {
                ;(e.target as HTMLElement).style.color = "#2C4F6B"
              }}
              onMouseLeave={(e) => {
                ;(e.target as HTMLElement).style.color = "#1A3A52"
              }}
              aria-label="Siguiente"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="relative">
            <Carousel
              className="relative w-full"
              opts={{ loop: true, align: "start", slidesToScroll: 1, watchDrag: true, dragFree: false }}
              setApi={setExperienciaCarouselApi}
            >
              <CarouselContent>
                {[...carouselData, ...carouselData].map((_, idx) => {
                  const item = carouselData[idx % carouselData.length]
                  return (
                    <CarouselItem key={`${item.title}-${idx}`} className="basis-full md:basis-1/3">
                      <div
                        className="group relative overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-1000 cursor-pointer"
                        onClick={() => setSelectedCarouselItem(idx % carouselData.length)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault()
                            setSelectedCarouselItem(idx % carouselData.length)
                          }
                        }}
                      >
                        <img
                          src={item.src || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-[32vh] md:h-[44vh] lg:h-[56vh] object-cover transition-all duration-500 group-hover:blur-sm group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1A3A52]/60 via-[#1A3A52]/30 to-transparent"></div>

                        {/* Título abajo a la izquierda - siempre visible con altura fija */}
                        <div className="absolute bottom-20 left-6 text-white opacity-100 transition-all duration-500">
                          <h3
                            style={{ fontFamily: "var(--font-times)" }}
                            className="font-bold leading-tight tracking-wide whitespace-pre-line text-2xl md:text-3xl lg:text-4xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] font-sans h-16 flex items-end"
                          >
                            {item.title}
                          </h3>
                        </div>

                        {/* Subtítulo abajo, debajo del título - siempre visible */}
                        <div className="absolute bottom-6 left-6 text-white opacity-90 transition-all duration-500">
                          <p
                            style={{ fontFamily: "var(--font-muli)" }}
                            className="font-light leading-snug tracking-wide text-sm md:text-base lg:text-lg drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] font-sans italic"
                          >
                            {item.subtitle}
                          </p>
                        </div>

                        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
          className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg shadow-md text-sm font-medium border transition-all duration-300"
          style={{
            backgroundColor: "white",
            color: "#7FCDCD",
            borderColor: "#7FCDCD",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#7FCDCD";
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "white";
            e.currentTarget.style.color = "#7FCDCD";
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
                    </CarouselItem>
                  )
                })}
              </CarouselContent>
            </Carousel>

            {/* Panel lateral con descripción */}
            {selectedCarouselItem !== null && (
              <div
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300"
                onClick={() => setSelectedCarouselItem(null)}   // 👈 click afuera cierra
              >
                <div
                  className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden animate-in slide-in-from-right-8 duration-500 flex flex-col"
                  onClick={(e) => e.stopPropagation()}          // 👈 evita que el click dentro cierre
                >
                  {selectedCarouselItem === 0 || selectedCarouselItem === 2 ? (
                    <>
                      <div className="relative flex-shrink-0">
                        {selectedCarouselItem === 0 ? (
                          <div className="flex gap-0.5 overflow-hidden" style={{ height: "220px", borderRadius: "1rem 1rem 0 0" }}>
                            {["/ts-01.jpeg","/ts-02.jpeg","/ts-03.jpeg","/ts-04.jpeg","/ts-05.jpeg","/ts-06.jpeg","/ts-07.jpeg","/ts-08.jpeg"].map(src => (
                              <div key={src} className="flex-1 overflow-hidden">
                                <img src={src} alt="The Seasons" className="w-full h-full object-cover" />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex gap-0.5 overflow-hidden" style={{ height: "280px", borderRadius: "1rem 1rem 0 0" }}>
                            {["/nh-01.jpeg","/nh-02.jpeg","/nh-03.jpeg"].map(src => (
                              <div key={src} className="flex-1 overflow-hidden">
                                <img src={src} alt="Nuestra Historia" className="w-full h-full object-cover" />
                              </div>
                            ))}
                          </div>
                        )}
                        <button
                          onClick={() => setSelectedCarouselItem(null)}
                          className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 transition-all duration-200 hover:scale-110 cursor-pointer"
                        >
                          <svg className="w-6 h-6" style={{ color: "#1A3A52" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex-1 overflow-y-auto">
                        <div className="p-8">
                          <h3 style={{ fontFamily: "var(--font-times)", color: "#1A3A52" }} className="text-3xl font-bold mb-4 font-sans">
                            {carouselData[selectedCarouselItem].title}
                          </h3>
                          <p style={{ fontFamily: "var(--font-glacial)", color: "#2C4F6B" }} className="text-lg italic mb-6 font-sans">
                            {carouselData[selectedCarouselItem].subtitle}
                          </p>
                          <p style={{ fontFamily: "var(--font-glacial)", color: "#1A3A52" }} className="leading-relaxed text-base font-sans">
                            {carouselData[selectedCarouselItem].description}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Equipo & Momentos: texto izquierda, foto derecha */
                    <div className="flex flex-row flex-1 overflow-hidden">
                      <div className="flex-1 overflow-y-auto p-8 flex flex-col justify-center">
                        <h3 style={{ fontFamily: "var(--font-times)", color: "#1A3A52" }} className="text-3xl font-bold mb-4 font-sans">
                          {carouselData[selectedCarouselItem].title}
                        </h3>
                        <p style={{ fontFamily: "var(--font-glacial)", color: "#2C4F6B" }} className="text-lg italic mb-6 font-sans">
                          {carouselData[selectedCarouselItem].subtitle}
                        </p>
                        <p style={{ fontFamily: "var(--font-glacial)", color: "#1A3A52" }} className="leading-relaxed text-base font-sans">
                          {carouselData[selectedCarouselItem].description}
                        </p>
                        {carouselData[selectedCarouselItem].title === "SE PARTE DE NUESTRO EQUIPO" && (
                          <div className="mt-8 pt-6 border-t border-[#E5E7EB]">
                            <JoinTeamForm />
                          </div>
                        )}
                      </div>
                      <div className="w-2/5 flex-shrink-0 relative">
                        <img
                          src={carouselData[selectedCarouselItem].src || "/placeholder.svg"}
                          alt={carouselData[selectedCarouselItem].title}
                          className="w-full h-full object-cover"
                          style={{ borderRadius: "0 1rem 1rem 0" }}
                        />
                        <button
                          onClick={() => setSelectedCarouselItem(null)}
                          className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 transition-all duration-200 hover:scale-110 cursor-pointer"
                        >
                          <svg className="w-6 h-6" style={{ color: "#1A3A52" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </section>
      <section className="py-16">
        <FranquiciaCard />
      </section>

      <section className="py-40 relative overflow-hidden" style={{ backgroundColor: "#E8E4DD" }}>
        <MainContactForm />
      </section>

      <footer
        className="py-32 animate-in fade-in duration-1500 relative overflow-hidden"
        style={{ backgroundColor: "#DDD5CA", color: "#1A3A52" }}
      >
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-px bg-gradient-to-r from-transparent via-[#D4C5A9] to-transparent"></div>
          <div className="absolute top-20 left-20 w-64 h-64 border border-[#D4C5A9]/20 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 border border-[#D4C5A9]/20 rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 border border-[#D4C5A9]/20 rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative">
          {/* Sección principal del footer */}
          <div className="text-center mb-16">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#D4C5A9] to-transparent mx-auto mb-8"></div>
            <h3
              style={{ fontFamily: "var(--font-muli)" }}
              className="text-6xl font-serif font-light mb-6 transition-colors duration-500 tracking-wider"
              onMouseEnter={(e) => {
                ;(e.target as HTMLElement).style.color = "#2C4F6B"
              }}
              onMouseLeave={(e) => {
                ;(e.target as HTMLElement).style.color = "#1A3A52"
              }}
            >
              <span style={{ color: "#1A3A52" }}>The Salad Bar</span>
              <span className="text-3xl align-super ml-2">®</span>
            </h3>
            <p className="text-lg font-light tracking-widest mb-8 opacity-80">Fresh • Healthy • Delicious</p>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D4C5A9] to-transparent mx-auto"></div>
          </div>

          {/* Información de contacto y redes */}
          <div className="grid md:grid-cols-3 gap-12 mb-16 text-center text-[#1A3A52]">
  {/* UBICACIÓN */}
  <div className="flex flex-col items-center justify-center space-y-2">
    <h4 className="text-xl font-semibold mb-2">Ubicación</h4>
    <p className="text-sm opacity-80 leading-relaxed">
      Leguizamón 416<br />Salta, Argentina
    </p>
  </div>

  {/* HORARIOS */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <h4 className="text-xl font-semibold mb-2">Horarios</h4>
              <p className="text-sm opacity-80 leading-relaxed">Lun - Vie: 11:00 - 22:30</p>
              <p className="text-sm opacity-80 leading-relaxed">Sab: 11:00 - 17:00</p>

            </div>

            {/* CONTACTO */}
            <div className="flex flex-col items-center justify-center space-y-3">
              <h4 className="text-xl font-semibold mb-2">Contacto</h4>
              <div className="flex flex-col items-center space-y-2 text-sm opacity-80">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <p>thesaladbar.salta@gmail.com</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <p>387-2521137</p>
                </div>
                <div className="flex items-center gap-2">
                  <Instagram className="w-4 h-4" />
                  <p>@thesaladbarsalta</p>
                </div>
              </div>
            </div>
          </div>


          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4C5A9] to-transparent mb-8"></div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm opacity-60">® 2022 The Salad Bar. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

