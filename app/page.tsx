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

export default function HomePage() {
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false)
  const [experienciaCarouselApi, setExperienciaCarouselApi] = useState<CarouselApi | undefined>(undefined)
  const [experienciaSelectedIndex, setExperienciaSelectedIndex] = useState(0)

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
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="fondo-principal.jpg"
            alt="Mediterranean terrace dining"
            className="w-full h-full object-cover animate-in fade-in duration-2000 hover:scale-105 transition-transform duration-[5000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/10 via-transparent to-stone-900/40"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-6">
          <div className="animate-in slide-in-from-top-12 duration-1500 delay-300">
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-12"></div>
          </div>

          <div className="animate-in fade-in duration-2000 delay-500 mb-8">
            <img
              src="/the-salad-bar-logo-transp.png"
              alt="The Salad Bar"
              className="w-80 md:w-96 mx-auto filter brightness-0 invert hover:scale-105 transition-transform duration-700"
            />
            <div className="mt-4">
              <span className="text-lg font-light tracking-widest opacity-80">®</span>
            </div>
          </div>

          <div className="animate-in slide-in-from-bottom-8 duration-1500 delay-700">
            <p className="text-2xl md:text-3xl font-light mb-4 text-balance opacity-95 tracking-wide font-sans">
              Cocina Mediterránea Contemporánea
            </p>
            <p className="text-lg md:text-xl font-light mb-16 text-balance opacity-80 italic font-sans">
              Donde la tradición se encuentra con la innovación
            </p>
          </div>

          <div className="animate-in zoom-in duration-1500 delay-1200">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-12"></div>
            <HeroButton />
          </div>
        </div>
      </section>

      <section className="py-40 bg-gradient-to-b from-stone-50 to-stone-100" id="experiencia-culinaria">
        <div className="w-full px-0">
          <div className="text-center mb-16 md:mb-24 animate-in fade-in duration-1500">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-8"></div>
            <h2 className="text-5xl md:text-6xl font-serif font-light text-stone-800 mb-4 md:mb-8 tracking-wide">
              Experiencia Culinaria
            </h2>
          </div>

          <Carousel
            className="relative w-full"
            opts={{ loop: true, align: "start", slidesToScroll: 1 }}
            setApi={setExperienciaCarouselApi}
          >
            <CarouselContent>
              {[
                { src: "/european-restaurant-facade.png", title: "Tradición Europea", subtitle: "Auténtica experiencia mediterránea" },
                { src: "/modern-beige-interior.png", title: "Diseño Contemporáneo", subtitle: "Espacios que inspiran" },
                { src: "/natural-wood-terrace.png", title: "Terraza Mediterránea", subtitle: "Calidez al aire libre" },
                { src: "/gourmet-healthy-dishes.png", title: "Gourmet Saludable", subtitle: "Sabor y equilibrio" },
              ].map((item, idx) => (
                <CarouselItem key={idx} className="basis-full md:basis-1/3">
                  <div
                    className="group relative overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-1000 cursor-pointer"
                    onClick={() => {
                      if (!experienciaCarouselApi) return
                      if (idx === experienciaSelectedIndex) {
                        experienciaCarouselApi.scrollPrev()
                      } else {
                        experienciaCarouselApi.scrollNext()
                      }
                    }}
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-[40vh] md:h-[55vh] lg:h-[70vh] object-cover transition-transform duration-[3000ms] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute bottom-8 left-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-8 group-hover:translate-y-0">
                      <h3 className="text-3xl md:text-4xl font-serif font-light mb-2">{item.title}</h3>
                      <p className="text-lg md:text-xl opacity-90">{item.subtitle}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      <section id="filosofia" className="py-40 bg-stone-200 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 border border-stone-400 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 border border-stone-400 rounded-full"></div>
        </div>

        <div className="max-w-8xl mx-auto px-6 relative">
          <div className="grid md:grid-cols-2 gap-32 items-center">
            <div className="animate-in slide-in-from-left-12 duration-1500">
              <div className="space-y-12">
                <div className="w-24 h-px bg-gradient-to-r from-amber-600 to-transparent animate-in slide-in-from-left-8 duration-1500 delay-200"></div>

                <h2 className="text-6xl md:text-8xl font-serif font-light text-stone-800 leading-none tracking-wide">
                  Filosofía
                  {/* <span className="block text-amber-700 italic font-light">Mediterránea</span> */}
                </h2>

                <div className="space-y-8 text-stone-900">
                  <p className="text-xl leading-relaxed font-light animate-in fade-in duration-1500 delay-400 font-sans">
                  Nuestros valores destacan que <span className="block text-amber-700 italic font-light">COMER BIEN ES UNA FORMA DE AUTO RESPETO</span> 
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
                    className="border-2 border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white px-8 py-4 text-lg font-light rounded-none transition-all duration-500 hover:scale-105 tracking-wide bg-transparent font-sans"
                  >
                    Nuestra Historia
                  </Button>
                </div>
              </div>
            </div>

            <div className="animate-in slide-in-from-right-12 duration-1500 group">
              <div className="relative">
                <img
                  src="/intimate-garden-dining.png"
                  alt="Comedor íntimo en jardín"
                  className="w-full h-[700px] object-cover shadow-2xl transition-all duration-1000 group-hover:shadow-3xl"
                />
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-amber-400 opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
                <div className="absolute -top-8 -left-8 w-24 h-24 border-2 border-stone-400 opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Historia Expandible */}
      {isHistoryExpanded && (
        <section id="historia" className="py-40 bg-stone-200 relative overflow-hidden animate-in slide-in-from-top-8 duration-[2000ms]">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-20 w-96 h-96 border border-stone-400 rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-64 h-64 border border-stone-400 rounded-full"></div>
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
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-amber-400 opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
                  <div className="absolute -top-8 -right-8 w-24 h-24 border-2 border-stone-400 opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>
                </div>
              </div>

              {/* Texto a la derecha */}
              <div className="animate-in slide-in-from-right-12 duration-1000 delay-400">
                <div className="space-y-8">
                  <div className="w-24 h-px bg-gradient-to-r from-amber-600 to-transparent"></div>
                  
                  <h3 className="text-5xl md:text-6xl font-serif font-light text-stone-800 leading-none tracking-wide">
                    Nuestra Historia
                  </h3>

                  <div className="space-y-6 text-stone-700">
                    <p className="text-xl leading-relaxed font-light font-sans">
                    Juli y Jorge son nuestros fundadores. Juli dedicó muchos años al mundo gastronómico en destinos como Norteamérica, España y el Caribe. Allí vivió experiencias que le demostraron que lo saludable podía ser rico, abundante y nutritivo, sin perder sabor ni disfrute. Al regresar a Argentina en 2022 notó que en Salta esa propuesta no existía y deciden crear juntos <span className="text-amber-700 italic font-light">The Salad Bar</span>: un proyecto con alma propia, pensado para que la alimentación consciente no fuera aburrida y para que cada persona —cliente o colaborador— pudiera sentirse parte de algo especial. 
                    Jorge, se convierte en un pilar fundamental para <span className="text-amber-700 italic font-light">The Salad Bar</span>, aportando su experiencia, compromiso y apoyo en diferentes áreas para que el proyecto creciera y se consolidara. 
                    Con pasión por los detalles y por la experiencia humana, pensaron cada aspecto del local: desde la carta, los espacios y  hasta la música que acompaña cada momento. Comenzaron con una libreta llena de recetas, una idea clara y el deseo de formar un equipo que trabajara con compromiso, pero también con alegría y propósito. 
                    </p>
                    
                    <p className="text-xl leading-relaxed font-light font-sans">
                    Hoy The Salad Bar no es solo un lugar para comer: es el reflejo en cada plato, detalle y experiencia de la misma energía que inspiró su creación.
                    </p>
                  </div>

                  <div className="pt-8">
                    <div className="w-16 h-px bg-gradient-to-r from-amber-600 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Botón para volver a filosofía */}
            <div className="text-center mt-16 animate-in slide-in-from-bottom-8 duration-1000 delay-600">
              <Button
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
                className="border-2 border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white px-8 py-4 text-lg font-light rounded-none transition-all duration-500 hover:scale-105 tracking-wide bg-transparent font-sans"
              >
                Cerrar Historia
              </Button>
            </div>
          </div>
        </section>
      )}

      <section className="py-40 bg-gradient-to-b from-stone-100 to-stone-50">
        <div className="max-w-8xl mx-auto px-6">
          <div className="text-center mb-32 animate-in fade-in duration-1500">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-8"></div>
            <h2 className="text-5xl md:text-6xl font-serif font-light text-stone-800 mb-8 tracking-wide">
              Espacios Únicos
            </h2>
            <p className="text-2xl text-stone-600 font-light italic font-sans">Cada rincón diseñado para inspirar</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 animate-in slide-in-from-left-12 duration-1500 delay-200">
              <div className="group relative overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-1000">
                <img
                  src="/mediterranean-bakery-interior.png"
                  alt="Interior de panadería mediterránea"
                  className="w-full h-[500px] object-cover transition-transform duration-[3000ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute bottom-8 left-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-8 group-hover:translate-y-0">
                  <h3 className="text-3xl font-serif font-light mb-2">Panadería Artesanal</h3>
                  <p className="text-lg opacity-90">Tradición en cada bocado</p>
                </div>
              </div>
            </div>

            <div className="space-y-8 animate-in slide-in-from-right-8 duration-1500 delay-400">
              <div className="group relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700">
                <img
                  src="/minimalist-striped-terrace.png"
                  alt="Terraza minimalista con rayas"
                  className="w-full h-60 object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-stone-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <div className="bg-stone-800 p-8 text-white">
                <h3 className="text-2xl font-serif font-light mb-4">Diseño Minimalista</h3>
                <p className="text-stone-300 leading-relaxed">Líneas limpias que realzan la experiencia gastronómica</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-40 bg-gradient-to-b from-stone-800 via-stone-900 to-stone-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-amber-400 to-transparent"></div>
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-amber-400 to-transparent"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center mb-32 animate-in fade-in duration-1500">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-12"></div>
            <h2 className="text-6xl md:text-8xl font-serif font-light text-stone-100 mb-8 tracking-wider">
              Conectemos
            </h2>
            <p className="text-2xl text-stone-300 font-light italic font-sans">
              Cada conversación es el inicio de una experiencia única
            </p>
          </div>

          <Card className="border-0 shadow-3xl bg-gradient-to-br from-stone-700/80 to-stone-800/80 backdrop-blur-xl hover:shadow-4xl transition-all duration-1000 animate-in slide-in-from-bottom-12 duration-1500 hover:scale-[1.01] rounded-none relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>

            <CardContent className="p-20">
              <form className="space-y-12">
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="group relative">
                    <Input
                      placeholder="Nombre completo"
                      className="h-16 border-0 border-b-2 border-stone-500 bg-transparent text-stone-100 placeholder:text-stone-400 focus:bg-transparent focus:border-amber-400 transition-all duration-500 text-xl group-hover:border-amber-300 rounded-none pb-4 font-sans"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-500 group-focus-within:w-full"></div>
                  </div>
                  <div className="group relative">
                    <Input
                      type="email"
                      placeholder="Correo electrónico"
                      className="h-16 border-0 border-b-2 border-stone-500 bg-transparent text-stone-100 placeholder:text-stone-400 focus:bg-transparent focus:border-amber-400 transition-all duration-500 text-xl group-hover:border-amber-300 rounded-none pb-4 font-sans"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-500 group-focus-within:w-full"></div>
                  </div>
                </div>

                <div className="group relative">
                  <Input
                    type="tel"
                    placeholder="Número de teléfono"
                    className="h-16 border-0 border-b-2 border-stone-500 bg-transparent text-stone-100 placeholder:text-stone-400 focus:bg-transparent focus:border-amber-400 transition-all duration-500 text-xl group-hover:border-amber-300 rounded-none pb-4 font-sans"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-500 group-focus-within:w-full"></div>
                </div>

                <div className="group relative">
                  <Textarea
                    placeholder="Comparte tu visión con nosotros..."
                    rows={6}
                    className="border-0 border-b-2 border-stone-500 bg-transparent text-stone-100 placeholder:text-stone-400 focus:bg-transparent focus:border-amber-400 transition-all duration-500 resize-none text-xl group-hover:border-amber-300 rounded-none pb-4 font-sans"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-500 group-focus-within:w-full"></div>
                </div>

                <div className="text-center pt-16">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-transparent border-2 border-amber-400 hover:bg-amber-400 hover:border-amber-400 text-amber-400 hover:text-stone-900 px-16 py-6 text-xl font-light rounded-none transition-all duration-700 hover:scale-110 hover:shadow-2xl hover:-translate-y-2 shadow-xl tracking-widest uppercase font-sans"
                  >
                    Enviar Mensaje
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-stone-950 text-white py-32 animate-in fade-in duration-1500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <div className="space-y-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
            <h3 className="text-5xl font-serif font-light mb-4 hover:text-amber-400 transition-colors duration-500 tracking-wider">
              The Salad Bar<span className="text-2xl align-super ml-1">®</span>
            </h3>
            <p className="text-xl text-stone-400 font-light italic font-sans">Cocina Mediterránea Contemporánea</p>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-stone-600 to-transparent mx-auto mt-8"></div>
          </div>
        </div>
      </footer>
    </div>
  )
}
