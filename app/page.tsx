"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import HeroButton from "@/components/hero-button"
import { useEffect, useState } from "react"
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import ContactForm from "@/components/contact-form"
import FranquiciaCard from "@/components/franquicia-card"
import MainContactForm from "@/components/main-contact"

export default function HomePage() {
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false)
  const [experienciaCarouselApi, setExperienciaCarouselApi] = useState<CarouselApi | undefined>(undefined)
  const [experienciaSelectedIndex, setExperienciaSelectedIndex] = useState(0)
  const [selectedCarouselItem, setSelectedCarouselItem] = useState<number | null>(null)

  // Datos del carrusel con descripciones detalladas
  const carouselData = [
    { 
      src: "/european-restaurant-facade.png", 
      title: "THE SEASONS", 
      subtitle: "Las estaciones no solo hablan del clima.",
      description: "En The Salad Bar, la experiencia es tan importante como la comida. Acompañamos el ritmo de las estaciones y los diferentes momentos de nuestros clientes, creando un ambiente que conecta con su estado de ánimo a través de la música, el entorno y la decoración. Nuestro compromiso con la calidad, la frescura de los ingredientes y la lealtad de nuestros clientes nos impulsa a renovar la carta constantemente, con cada estación. De esta manera, no solo seguimos las tendencias, sino que también las creamos nosotros mismos, garantizando que siempre haya algo nuevo para disfrutar. Las estaciones no solo hablan del clima. Hablan de un mood, de un momento, de una energía. Y en The Salad Bar, respetamos cada uno de ellos."
    },
    { 
      src: "/modern-beige-interior.png", 
      title: "SE PARTE DE NUESTRO EQUIPO", 
      subtitle: "",
      description: "En nuestro equipo compartimos valores, el sentido de la responsabilidad y la pasión. Compartir estos valores no solo nos define, sino que también crea un ambiente de trabajo excepcional, un lugar que se disfruta mucho y de que te vas a sentir orgulloso  de pertenecer. Aquí, el crecimiento no tiene límites. Te ofrecemos la capacitación continua para que vayas más allá de lo que creías posible. Queremos tu espíritu joven y profesional,  para acompañar nuestra filosofía, un ambiente distendido que no compromete la excelencia. "
    },
    { 
      src: "/natural-wood-terrace.png", 
      title: "NUESTRA HISTORIA", 
      subtitle: "",
      description: "Juli y Jorge son nuestros fundadores. Juli dedicó muchos años al mundo gastronómico en destinos como Norteamérica, España y el Caribe. Allí vivió experiencias que le demostraron que lo saludable podía ser rico, abundante y nutritivo, sin perder sabor ni disfrute. Al regresar a Argentina en 2022 notó que esa propuesta no existía y deciden crear juntos The Salad Bar: un proyecto con alma propia, pensado para que la alimentación consciente no fuera aburrida y para que cada persona —cliente o colaborador— pudiera sentirse parte de algo especial. Jorge, se convierte en un pilar fundamental para The Salad Bar, aportando su experiencia, compromiso y apoyo en diferentes áreas para que el proyecto creciera y se consolidara. Con pasión por los detalles y por la experiencia humana, pensaron cada aspecto del local: desde la carta, los espacios y  hasta la música que acompaña cada momento. Comenzaron con una libreta llena de recetas, una idea clara y el deseo de formar un equipo que trabajara con compromiso, pero también con alegría y propósito.  Hoy The Salad Bar no es solo un lugar para comer: es el reflejo en cada plato, detalle y experiencia de la misma energía que inspiró su creación. "
    },
  ]

  const extendedCarouselData = [
    ...carouselData,
    {
      src: "/natural-wood-terrace.png",
      title: "FRANQUICIAS DISPONIBLES",
      subtitle: "Llevá The Salad Bar a tu ciudad",
      description: "Agradecemos tu interés en unirte a la red de franquicias de The Salad Bar. ..."
    }
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
    <div className="min-h-screen" style={{ backgroundColor: '#dbdce0' }}>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
  <div className="absolute inset-0 z-0">
    <img
      src="fondo-principal.jpg"
      alt="Mediterranean terrace dining"
      className="w-full h-full object-cover hover:scale-110 transition-transform duration-[8000ms] ease-out"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-stone-900/20 via-transparent to-stone-900/60"></div>
    {/* Elementos decorativos flotantes */}
    <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full animate-pulse"></div>
    <div className="absolute bottom-32 right-32 w-24 h-24 border border-white/20 rounded-full animate-pulse delay-1000"></div>
    <div className="absolute top-1/2 left-10 w-16 h-16 border border-white/20 rounded-full animate-pulse delay-2000"></div>
  </div>

  <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-6">
    <div className="animate-in fade-in duration-3000 delay-500 relative inline-block">
      {/* Logo con animación mejorada */}
      <div className="relative group">
        <img
          src="/fondo-transparente.png"
          alt="The Salad Bar"
          className="w-200 md:w-250 mx-auto filter brightness-0 invert hover:scale-110 transition-all duration-1000 relative group-hover:drop-shadow-2xl"
        />
        {/* Efecto de brillo en hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform -skew-x-12"></div>
      </div>

      {/* ® pegado arriba a la derecha del logo */}
      <span className="absolute top-118 right-35 translate-x-4 -translate-y-2 text-2xl font-light opacity-80 animate-pulse">
        ®
      </span>

      {/* Línea con animación */}
      <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#4A90E2] to-transparent mx-auto mt-4 animate-pulse"></div>
      
      {/* Texto adicional con animación */}
      <div className="mt-8 animate-in slide-in-from-bottom-8 duration-2000 delay-1000">
        <p className="text-lg md:text-xl font-light tracking-widest opacity-90">
          Fresh • Healthy • Delicious
        </p>
      </div>
    </div>
  </div>
</section>



      <section id="filosofia" className="py-40 relative overflow-hidden" style={{ backgroundColor: '#d1cec9' }}>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 border rounded-full" style={{ borderColor: '#bdc7c8' }}></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 border rounded-full" style={{ borderColor: '#bdc7c8' }}></div>
        </div>

        <div className="max-w-8xl mx-auto px-6 relative">
          <div className="grid md:grid-cols-2 gap-32 items-center">
            <div className="animate-in slide-in-from-left-12 duration-1500">
              <div className="space-y-12">
                <div className="w-24 h-px bg-gradient-to-r from-[#4A90E2] to-transparent animate-in slide-in-from-left-8 duration-1500 delay-200"></div>

                <h2 style={{ fontFamily: "var(--font-muli)", color: '#000000' }} className="text-6xl md:text-8xl font-serif font-light leading-none tracking-wide">
                  FILOSOFIA
                  {/* <span className="block text-amber-700 italic font-light">Mediterránea</span> */}
                </h2>

                <div className="space-y-8" style={{ color: '#000000' }}>
                  <p style={{ fontFamily: "var(--font-glacial)" }} className="text-xl leading-relaxed font-light animate-in fade-in duration-1500 delay-400 font-sans">
                  Nuestros valores destacan que <span className="block italic font-light" style={{ color: '#000000' }}>COMER BIEN ES UNA FORMA DE AUTO RESPETO</span> 
                  y  comer bien es una combinación que reúne calidad, sabor, conciencia, servicio y experiencia. 
                  Somos muy exigentes con la calidad y frescura de nuestros insumos, queremos darte lo mejor y en un entorno que te haga sentir bien. 
                  Buscamos que cada visita se sienta para vos una experiencia, ligera, fresca y con aire de vacaciones, que refleja un estilo de vida, por lo que en estos años 
                  creamos una propuesta que asegura un público fiel, que no solo conecta con el producto sino emocionalmente con la marca.
                  </p>
                </div>

                <div className="pt-8 animate-in slide-in-from-bottom-8 duration-1500 delay-800">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      setIsHistoryExpanded(true)
                      // Scroll suave hacia la sección de historia después de que se expanda
                      setTimeout(() => {
                        const historiaSection = document.getElementById('historia')
                        if (historiaSection) {
                          historiaSection.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                          })
                        }
                      }) // Delay para que la animación de expansión comience
                    }}
                    style={{ fontFamily: "var(--font-muli)", borderColor: '#4A90E2', color: '#4A90E2' }} className="border-2 px-8 py-4 text-lg font-light rounded-none transition-all duration-500 hover:scale-105 tracking-wide bg-transparent font-sans" onMouseEnter={(e) => { (e.target as HTMLElement).style.backgroundColor = '#4A90E2'; (e.target as HTMLElement).style.color = '#d1cec9'; }} onMouseLeave={(e) => { (e.target as HTMLElement).style.backgroundColor = 'transparent'; (e.target as HTMLElement).style.color = '#4A90E2'; }}
                  >
                    Propuesta Gastronómica
                  </Button>
                </div>
              </div>
            </div>

            <div className="animate-in slide-in-from-right-12 duration-1500 group">
              <div className="relative">
                <img
                  src="/gourmet-healthy-dishes.png"
                  alt="Comedor íntimo en jardín"
                  className="w-full h-[700px] object-cover shadow-2xl transition-all duration-1000 group-hover:shadow-3xl"
                />
                <div className="absolute -bottom-8 -right-8 w-32 h-32 opacity-20 group-hover:opacity-30 transition-opacity duration-700" style={{ backgroundColor: '#bdc7c8' }}></div>
                <div className="absolute -top-8 -left-8 w-24 h-24 border-2 opacity-30 group-hover:opacity-50 transition-opacity duration-700" style={{ borderColor: '#bdc7c8' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Historia Expandible */}
      {isHistoryExpanded && (
        <section id="historia" className="py-40 relative overflow-hidden animate-in slide-in-from-top-8 duration-[2000ms]" style={{ backgroundColor: '#bdc7c8' }}>
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-20 w-96 h-96 border rounded-full" style={{ borderColor: '#bdc7c8' }}></div>
            <div className="absolute bottom-20 right-20 w-64 h-64 border rounded-full" style={{ borderColor: '#bdc7c8' }}></div>
          </div>
          <div className="max-w-8xl mx-auto px-6 relative">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Imagen a la izquierda */}
              <div className="animate-in slide-in-from-left-12 duration-1000 delay-200 group">
                <div className="relative">
                  <img
                    src="/mediterranean-terrace-dining.png"
                    alt="Historia de The Salad Bar"
                    className="w-full h-[800px] object-cover shadow-2xl transition-all duration-1000 group-hover:shadow-3xl"
                  />
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 opacity-20 group-hover:opacity-30 transition-opacity duration-700" style={{ backgroundColor: '#bdc7c8' }}></div>
                  <div className="absolute -top-8 -right-8 w-24 h-24 border-2 opacity-30 group-hover:opacity-50 transition-opacity duration-700" style={{ borderColor: '#bdc7c8' }}></div>
                </div>
              </div>

              {/* Texto a la derecha */}
              <div className="animate-in slide-in-from-right-12 duration-1000 delay-400">
                <div className="space-y-8">
                  {/* Línea decorativa superior */}
                  <div className="w-24 h-px bg-gradient-to-r from-[#4A90E2] to-transparent"></div>

                  {/* Título principal */}
                  <h3 style={{ fontFamily: "var(--font-muli)", color: '#000000' }} className="text-5xl md:text-6xl font-serif font-light leading-none tracking-wide">
                    PROPUESTA GASTRONÓMICA
                  </h3>

                  {/* Lista de productos */}
                  <ul style={{ fontFamily: "var(--font-glacial)", color: '#000000' }} className="list-disc list-inside space-y-2 text-lg font-sans">
                    <li>Desayunos, brunch y meriendas</li>
                    <li>Armá tu propia ensalada / The Salad Bar + de 55 ingredientes</li>
                    <li>Pre Set Bowls</li>
                    <li>Sopas</li>
                    <li>Platos elaborados</li>
                    <li>Wraps y Sandwiches</li>
                    <li>Jugos naturales y smoothies</li>
                    <li>The Bar: aperitivos, vinos y cerveza</li>
                  </ul>

                  {/* Descripción */}
                  <div style={{ fontFamily: "var(--font-glacial)", color: '#000000' }} className="space-y-4 text-lg leading-relaxed font-sans">
                    <p>
                      En The Salad Bar, creemos que lo rico y nutritivo pueden ir de la mano. Cocinamos con pasión y atención al detalle, cuidando la calidad de los ingredientes y los métodos de cocción para destacar sus sabores naturales.
                    </p>
                    <p>
                      Completa nuestra propuesta: desayunos, brunch, meriendas y el bar, siguiendo la misma línea. Veganos, vegetarianos y celíacos también encontrarán opciones, sin ser restrictivo.
                    </p>
                    <p>
                      Siendo razonables con los precios, generosos con las porciones y exigentes con la calidad, logramos un producto que hace que la gente nos recomiende y quiera volver. Nuestro público se fideliza, y siguiendo las principales tendencias —y marcándolas nosotros mismos— mantenemos nuestra carta en constante renovación.
                    </p>
                    <p>
                      Acompañamos cada cambio de estación asegurando productos frescos y ofreciendo nuevos sabores de forma periódica.
                    </p>
                  </div>

                  {/* Línea decorativa inferior */}
                  <div className="pt-8">
                    <div className="w-16 h-px bg-gradient-to-r from-[#4A90E2] to-transparent"></div>
                  </div>
                </div>
              </div>

            </div>
            
            {/* Botón para volver a filosofía */}
            <div className="text-center mt-16 animate-in slide-in-from-bottom-8 duration-1000 delay-600">
              <Button
              style={{ fontFamily: "var(--font-muli)", borderColor: '#183a5d', color: '#183a5d' }}
                variant="outline"
                size="lg"
                onClick={() => {
                  // Primero hacer scroll hacia arriba a la sección de filosofía
                  const filosofiaSection = document.getElementById('filosofia')
                  if (filosofiaSection) {
                    filosofiaSection.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    })
                  }
                  // Luego cerrar la sección después de que termine el scroll
                  setTimeout(() => {
                    setIsHistoryExpanded(false)
                  }, 1000) // Delay para que termine el scroll antes de cerrar
                }}
                className="border-2 px-8 py-4 text-lg font-light rounded-none transition-all duration-500 hover:scale-105 tracking-wide bg-transparent font-sans" onMouseEnter={(e) => { (e.target as HTMLElement).style.backgroundColor = '#4A90E2'; (e.target as HTMLElement).style.color = '#d1cec9'; }} onMouseLeave={(e) => { (e.target as HTMLElement).style.backgroundColor = 'transparent'; (e.target as HTMLElement).style.color = '#4A90E2'; }}
              >
                Cerrar
              </Button>
            </div>
          </div>
        </section>
      )}

   <section id="cafeteria" className="py-40 relative overflow-hidden" style={{ backgroundColor: '#dbdce0' }}>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 border rounded-full" style={{ borderColor: '#bdc7c8' }}></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 border rounded-full" style={{ borderColor: '#bdc7c8' }}></div>
        </div>

        <div className="max-w-8xl mx-auto px-6 relative">
          <div className="grid md:grid-cols-2 gap-32 items-center">
          <div className="animate-in slide-in-from-right-12 duration-1500 group">
              <div className="relative">
                <img
                  src="/gourmet-healthy-dishes.png"
                  alt="Comedor íntimo en jardín"
                  className="w-full h-[700px] object-cover shadow-2xl transition-all duration-1000 group-hover:shadow-3xl"
                />
                <div className="absolute -bottom-8 -right-8 w-32 h-32 opacity-20 group-hover:opacity-30 transition-opacity duration-700" style={{ backgroundColor: '#bdc7c8' }}></div>
                <div className="absolute -top-8 -left-8 w-24 h-24 border-2 opacity-30 group-hover:opacity-50 transition-opacity duration-700" style={{ borderColor: '#bdc7c8' }}></div>
              </div>
            </div>
            <div className="animate-in slide-in-from-left-12 duration-1500">
              <div className="space-y-12">
                <div className="w-24 h-px bg-gradient-to-r from-[#4A90E2] to-transparent animate-in slide-in-from-left-8 duration-1500 delay-200"></div>

                <h2 style={{ fontFamily: "var(--font-muli)", color: '#000000' }} className="text-5xl md:text-6xl font-serif font-light leading-none tracking-wide">
                CAFETERIA - EASY NIGHTS 
                  {/* <span className="block text-amber-700 italic font-light">Mediterránea</span> */}
                </h2>
                <div className="space-y-8" style={{ color: '#000000' }}>
                  <p style={{ fontFamily: "var(--font-glacial)" }} className="text-xl leading-relaxed font-light animate-in fade-in duration-1500 delay-400 font-sans">
                  Siguiendo la misma linea y con un gran desafío nos comprometemos a brindarte en cada brunch, merienda, tentempié y a cualquier hora, propuestas de las que estamos enamorados, smoothies, panqueques, tostones llenos de nutrición, pastelería de nuestra cocina, jugos naturales para levantar cualquier estado y por supuesto café, para nosotros de la mejor calidad. 
                  Sentite libre, sentite liviano, sentite sano. Nosotros nos comprometemos a cuidarte. 
                  Y parte de llevar una vida saludable nos habla de esas charlas con amigos, de ese ratito de despeje al ir terminando el dia, un aperitivo , una picadita  y buena musica.
                  Easy nights crean el ambiente perfecto para esa pausa, para que te relajes, desconectes, las charlas fluyan y te pongas al dia.
                  </p>
                </div>
              </div>
            </div>


          </div>
        </div>
      </section>

      <section className="py-5 pr-10 pl-10" style={{ background: 'linear-gradient(to bottom, #dbdce0, #d1cec9)' }} id="experiencia-culinaria">
        <div className="w-full px-0">
          <div className="text-center md:mb-12 animate-in fade-in duration-1500">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#4A90E2] to-transparent mx-auto mb-8"></div>
            <h2 className="text-5xl md:text-6xl font-serif font-light mb-4 md:mb-8 tracking-wide" style={{ color: '#000000' }}>
            </h2>
          </div>

          {/* Flechas de navegación arriba a la derecha */}
          <div className="flex justify-end gap-4 mb-6 mr-5">
            <button
              onClick={() => experienciaCarouselApi?.scrollPrev()}
              className="bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110" style={{ color: '#183a5d' }} onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#bdc7c8'; }} onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#183a5d'; }}
              aria-label="Anterior"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => experienciaCarouselApi?.scrollNext()}
              className="bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110" style={{ color: '#183a5d' }} onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#bdc7c8'; }} onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#183a5d'; }}
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
              opts={{ loop: true, align: "start", slidesToScroll: 1 }}
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
                        src={item.src}
                        alt={item.title}
                        className="w-full h-[32vh] md:h-[44vh] lg:h-[56vh] object-cover transition-all duration-500 group-hover:blur-sm group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#183a5d]/60 via-[#183a5d]/30 to-transparent"></div>
                      
                      {/* Título abajo a la izquierda - siempre visible con altura fija */}
                      <div className="absolute bottom-20 left-6 text-white opacity-100 transition-all duration-500">
                        <h3 style={{ fontFamily: "var(--font-times)" }} className="font-bold leading-tight tracking-wide text-2xl md:text-3xl lg:text-4xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] font-sans h-16 flex items-end">
                          {item.title}
                        </h3>
                      </div>
                      
                      {/* Subtítulo abajo, debajo del título - siempre visible */}
                      <div className="absolute bottom-6 left-6 text-white opacity-90 transition-all duration-500">
                        <p style={{ fontFamily: "var(--font-muli)" }} className="font-light leading-snug tracking-wide text-sm md:text-base lg:text-lg drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] font-sans italic">
                          {item.subtitle}
                        </p>
                      </div>

                      {/* Indicador de click - solo visible en hover */}
                      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button style={{ fontFamily: "var(--font-muli)", borderColor: '#4A90E2', color: '#4A90E2', backgroundColor: 'white' }} className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-md hover:shadow-lg text-sm font-medium transition-all duration-300" onMouseEnter={(e) => { (e.target as HTMLElement).style.backgroundColor = '#4A90E2'; (e.target as HTMLElement).style.color = '#ffffff'; }} onMouseLeave={(e) => { (e.target as HTMLElement).style.backgroundColor = 'white'; (e.target as HTMLElement).style.color = '#4A90E2'; }}>
                          <span>Ver más</span>
                          <svg
                          className="w-4 h-4"
                          style={{ color: 'inherit' }}
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
                  </CarouselItem>
                  )
                })}
              </CarouselContent>
            </Carousel>

            {/* Panel lateral con descripción */}
            {selectedCarouselItem !== null && (
              <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
                <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden animate-in slide-in-from-right-8 duration-500 flex flex-col">
                  <div className="relative flex-shrink-0">
                    <img
                      src={carouselData[selectedCarouselItem].src}
                      alt={carouselData[selectedCarouselItem].title}
                      className="w-full h-64 object-cover"
                    />
                  <button
                    onClick={() => setSelectedCarouselItem(null)}
                    className="fixed top-6 right-6 bg-white/90 hover:bg-white rounded-full p-2 transition-all duration-200 hover:scale-110 cursor-pointer"
                  >
                    <svg
                      className="w-6 h-6" style={{ color: '#bdc7c8' }} // mismo color que el subtítulo
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
                      <h3 style={{ fontFamily: "var(--font-times)", color: '#4A90E2' }}className="text-3xl font-bold mb-4 font-sans">
                        {carouselData[selectedCarouselItem].title}
                      </h3>
                      <p style={{ fontFamily: "var(--font-glacial)", color: '#4A90E2' }} className="text-lg italic mb-6 font-sans">
                        {carouselData[selectedCarouselItem].subtitle}
                      </p>
                      <p style={{ fontFamily: "var(--font-glacial)", color: '#000000' }} className="leading-relaxed text-base font-sans">
                        {carouselData[selectedCarouselItem].description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>
      <section className="p-10">
      <FranquiciaCard />
      </section>

      <section className="py-40 relative overflow-hidden" style={{ backgroundColor: '#bdc7c8' }}>
        <MainContactForm />
      </section>


      <footer className="py-32 animate-in fade-in duration-1500 relative overflow-hidden" style={{ backgroundColor: '#a5b0ac', color: '#183a5d' }}>
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-px bg-gradient-to-r from-transparent via-[#4A90E2] to-transparent"></div>
          <div className="absolute top-20 left-20 w-64 h-64 border border-[#4A90E2]/20 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 border border-[#4A90E2]/20 rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 border border-[#4A90E2]/20 rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative">
          {/* Sección principal del footer */}
          <div className="text-center mb-16">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#4A90E2] to-transparent mx-auto mb-8"></div>
            <h3 style={{ fontFamily: "var(--font-muli)" }} className="text-6xl font-serif font-light mb-6 transition-colors duration-500 tracking-wider" onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#4A90E2'; }} onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#183a5d'; }}>
              <span style={{ color: '#4A90E2' }}>The Salad Bar</span><span className="text-3xl align-super ml-2">®</span>
            </h3>
            <p className="text-lg font-light tracking-widest mb-8 opacity-80">
              Fresh • Healthy • Delicious
            </p>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#4A90E2] to-transparent mx-auto"></div>
          </div>

          {/* Información de contacto y redes */}
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-4" style={{ color: '#4A90E2' }}>Ubicación</h4>
              <p className="text-sm opacity-80">Buenos Aires, Argentina</p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-4" style={{ color: '#4A90E2' }}>Horarios</h4>
              <p className="text-sm opacity-80">Lun - Dom: 8:00 - 22:00</p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-4" style={{ color: '#4A90E2' }}>Contacto</h4>
              <p className="text-sm opacity-80">info@thesaladbar.com</p>
            </div>
          </div>

          {/* Línea decorativa final */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#4A90E2] to-transparent mb-8"></div>
          
          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm opacity-60">
              © 2024 The Salad Bar. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
