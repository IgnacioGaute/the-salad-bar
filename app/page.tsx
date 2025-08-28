import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/fresh-colorful-salad-bowl-with-vibrant-vegetables-.png"
            alt="Fresh salad bowl with vibrant vegetables"
            className="w-full h-full object-cover animate-in fade-in duration-1000 hover:scale-105 transition-transform duration-[3000ms]"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6 animate-in slide-in-from-bottom-8 duration-1000 delay-300">
          <h1 className="text-6xl md:text-8xl font-serif font-light mb-8 text-balance animate-in fade-in duration-1500 delay-500">
            The Salad Bar
          </h1>
          <p className="text-xl md:text-2xl font-light mb-12 text-balance opacity-90 animate-in slide-in-from-bottom-4 duration-1000 delay-700">
            Ingredientes frescos, sabores naturales
          </p>
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg font-medium rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl animate-in zoom-in duration-1000 delay-1000"
          >
            Descubre más
          </Button>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="group cursor-pointer animate-in slide-in-from-left-8 duration-1000 delay-200">
              <div className="overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700">
                <img
                  src="/colorful-fresh-juice-bar-with-natural-smoothies-an.png"
                  alt="Jugos naturales"
                  className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
              </div>
              <h3 className="text-3xl font-serif font-light text-gray-900 mt-8 text-center transition-colors duration-300 group-hover:text-emerald-600">
                Jugos Naturales
              </h3>
            </div>

            <div className="group cursor-pointer animate-in slide-in-from-bottom-8 duration-1000 delay-400">
              <div className="overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700">
                <img
                  src="/fresh-salad-ingredients-display.png"
                  alt="Ingredientes frescos"
                  className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-1"
                />
              </div>
              <h3 className="text-3xl font-serif font-light text-gray-900 mt-8 text-center transition-colors duration-300 group-hover:text-emerald-600">
                55+ Ingredientes
              </h3>
            </div>

            <div className="group cursor-pointer animate-in slide-in-from-right-8 duration-1000 delay-600">
              <div className="overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700">
                <img
                  src="/healthy-restaurant-atmosphere.png"
                  alt="Ambiente acogedor"
                  className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
              </div>
              <h3 className="text-3xl font-serif font-light text-gray-900 mt-8 text-center transition-colors duration-300 group-hover:text-emerald-600">
                Ambiente Único
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="animate-in slide-in-from-left-8 duration-1000">
              <div className="space-y-8">
                <div className="w-16 h-1 bg-emerald-600 animate-in slide-in-from-left-4 duration-1000 delay-200"></div>
                <h2 className="text-6xl md:text-7xl font-serif font-light text-gray-900 leading-tight hover:text-emerald-600 transition-colors duration-500">
                  Saludable & Delicioso
                </h2>
                <p className="text-2xl text-gray-700 leading-relaxed animate-in fade-in duration-1000 delay-300">
                  Comida nutritiva que cuida tu bienestar sin sacrificar el sabor.
                </p>
              </div>
            </div>
            <div className="animate-in slide-in-from-right-8 duration-1000 group">
              <img
                src="/gourmet-healthy-dishes.png"
                alt="Platos gourmet saludables"
                className="w-full h-[500px] object-cover rounded-3xl shadow-2xl transition-all duration-700 group-hover:scale-105 group-hover:shadow-3xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 animate-in fade-in duration-1000">
            <div className="w-16 h-1 bg-emerald-600 mx-auto mb-8 animate-in slide-in-from-bottom-4 duration-1000 delay-200"></div>
            <h2 className="text-6xl md:text-7xl font-serif font-light text-gray-900 mb-8 hover:text-emerald-600 transition-colors duration-500">
              Todo el Día
            </h2>
            <p className="text-2xl text-gray-600 animate-in slide-in-from-bottom-4 duration-1000 delay-300">
              Desayunos • Brunch • Meriendas • Bar
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl group animate-in zoom-in duration-1000 delay-500">
            <img
              src="/all-day-dining-restaurant.png"
              alt="Restaurante todo el día"
              className="w-full h-[700px] object-cover transition-transform duration-[3000ms] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent group-hover:from-black/40 transition-all duration-500"></div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-gray-800">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20 animate-in fade-in duration-1000">
            <div className="w-16 h-1 bg-emerald-400 mx-auto mb-8 animate-in slide-in-from-bottom-4 duration-1000 delay-200"></div>
            <h2 className="text-6xl md:text-7xl font-serif font-light text-white mb-8 hover:text-emerald-400 transition-colors duration-500">
              Contáctanos
            </h2>
            <p className="text-2xl text-gray-300">Estamos aquí para hacer tu experiencia perfecta</p>
          </div>

          <Card className="border-0 shadow-2xl bg-gray-700/90 backdrop-blur-sm hover:shadow-3xl transition-all duration-700 animate-in slide-in-from-bottom-8 duration-1000 hover:scale-[1.02] rounded-3xl">
            <CardContent className="p-16">
              <form className="space-y-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="group">
                    <Input
                      placeholder="Nombre completo"
                      className="h-20 border-2 border-gray-500 bg-gray-600/50 text-white placeholder:text-gray-300 focus:bg-gray-600 focus:border-emerald-400 transition-all duration-300 text-xl group-hover:border-emerald-300 rounded-2xl"
                    />
                  </div>
                  <div className="group">
                    <Input
                      type="email"
                      placeholder="Correo electrónico"
                      className="h-20 border-2 border-gray-500 bg-gray-600/50 text-white placeholder:text-gray-300 focus:bg-gray-600 focus:border-emerald-400 transition-all duration-300 text-xl group-hover:border-emerald-300 rounded-2xl"
                    />
                  </div>
                </div>

                <div className="group">
                  <Input
                    type="tel"
                    placeholder="Número de teléfono"
                    className="h-20 border-2 border-gray-500 bg-gray-600/50 text-white placeholder:text-gray-300 focus:bg-gray-600 focus:border-emerald-400 transition-all duration-300 text-xl group-hover:border-emerald-300 rounded-2xl"
                  />
                </div>

                <div className="group">
                  <Textarea
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    rows={8}
                    className="border-2 border-gray-500 bg-gray-600/50 text-white placeholder:text-gray-300 focus:bg-gray-600 focus:border-emerald-400 transition-all duration-300 resize-none text-xl group-hover:border-emerald-300 rounded-2xl"
                  />
                </div>

                <div className="text-center pt-8">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-20 py-8 text-2xl font-medium rounded-full transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:-translate-y-2 shadow-xl"
                  >
                    Enviar Mensaje
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-20 animate-in fade-in duration-1000">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-4xl font-serif font-light mb-6 hover:text-emerald-400 transition-colors duration-300">
            The Salad Bar
          </h3>
          <p className="text-xl text-gray-400">Ingredientes frescos, sabores naturales</p>
        </div>
      </footer>
    </div>
  )
}
