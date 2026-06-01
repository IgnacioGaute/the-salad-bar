"use client"
import React, { useState, useEffect, useRef } from "react"
import ContactForm from "@/components/contact-form"
import JoinTeamForm from "@/components/join-team-form"
import MainContactForm from "@/components/main-contact"

/* =========== DATA =========== */
const PROPUESTA_CELLS = [
  ["/pg-04.jpeg", "/pg-10.jpeg", "/pg-05.jpeg"],
  ["/pg-02.jpeg", "/pg-08.jpeg", "/pg-11.jpeg"],
  ["/pg-01.jpeg", "/pg-07.jpeg", "/pg-12.jpeg"],
  ["/pg-03.jpeg", "/pg-09.jpeg", "/pg-06.jpeg"],
]

const CAFETERIA_CELLS = [
  ["/cf-01.jpeg", "/cf-07.jpeg", "/cf-12.jpeg"],
  ["/cf-02.jpeg", "/cf-08.jpeg"],
  ["/cf-03.jpeg", "/cf-09.jpeg"],
  ["/cf-04.jpeg", "/cf-10.jpeg", "/cf-11.jpeg"],
]

const CAROUSEL_ITEMS = [
  {
    src: "/new-seasons.jpeg",
    title: "THE\nSEASONS",
    subtitle: "Las estaciones no solo hablan del clima.",
    description:
      "En The Salad Bar, la experiencia es tan importante como la comida. Acompañamos el ritmo de las estaciones y los diferentes momentos de nuestros clientes, creando un ambiente que conecta con su estado de ánimo a través de la música, el entorno y la decoración. Nuestro compromiso con la calidad, la frescura de los ingredientes y la lealtad de nuestros clientes nos impulsa a renovar la carta constantemente, con cada estación. De esta manera, no solo seguimos las tendencias, sino que también las creamos nosotros mismos, garantizando que siempre haya algo nuevo para disfrutar. Las estaciones no solo hablan del clima. Hablan de un mood, de un momento, de una energía. Y en The Salad Bar, respetamos cada uno de ellos.",
    gallery: ["/ts-01.jpeg", "/ts-02.jpeg", "/ts-03.jpeg", "/ts-04.jpeg", "/ts-05.jpeg", "/ts-06.jpeg", "/ts-07.jpeg", "/ts-08.jpeg"],
    withForm: false,
  },
  {
    src: "/new-equipo.jpeg",
    title: "SE PARTE DE NUESTRO EQUIPO",
    subtitle: "",
    description:
      "En nuestro equipo compartimos valores, el sentido de la responsabilidad y la pasión. Compartir estos valores no solo nos define, sino que también crea un ambiente de trabajo excepcional, un lugar que se disfruta mucho y del que te vas a sentir orgulloso  de pertenecer. Aquí, el crecimiento no tiene límites. Te ofrecemos la capacitación continua para que vayas más allá de lo que creías posible. Queremos tu espíritu joven y profesional,  para acompañar nuestra filosofía, un ambiente distendido que no compromete la excelencia. Al final de esta presentación, envía tu CV al mail de la sucursal donde quieras incorporarte.",
    gallery: ["/new-equipo.jpeg"],
    withForm: true,
  },
  {
    src: "/new-historia.jpeg",
    title: "NUESTRA HISTORIA",
    subtitle: "",
    description:
      "Juli y Jorge son nuestros fundadores. Juli dedicó muchos años al mundo gastronómico en destinos como Norteamérica, España y el Caribe. Allí vivió experiencias que le demostraron que lo saludable podía ser rico, abundante y nutritivo, sin perder sabor ni disfrute. Al regresar a Argentina en 2022 notó que esa propuesta no existía y deciden crear juntos The Salad Bar: un proyecto con alma propia, pensado para que la alimentación consciente no fuera aburrida y para que cada persona —cliente o colaborador— pudiera sentirse parte de algo especial. Jorge, se convierte en un pilar fundamental para The Salad Bar, aportando su experiencia, compromiso y apoyo en diferentes áreas para que el proyecto creciera y se consolidara. Con pasión por los detalles y por la experiencia humana, pensaron cada aspecto del local: desde la carta, los espacios y  hasta la música que acompaña cada momento. Comenzaron con una libreta llena de recetas, una idea clara y el deseo de formar un equipo que trabajara con compromiso, pero también con alegría y propósito.  Hoy The Salad Bar no es solo un lugar para comer: es el reflejo en cada plato, detalle y experiencia de la misma energía que inspiró su creación.",
    gallery: ["/nh-01.jpeg", "/nh-02.jpeg", "/nh-03.jpeg"],
    withForm: false,
  },
  {
    src: "/momentos-01.jpeg",
    title: "MOMENTOS",
    subtitle: "Be Real",
    description:
      "Creamos y nos encontramos en esos momentos que nos hacen bien. Compartimos  con gente que siente igual el disfrute y la alegría de vivir. Si andás cerca súmate y vivámoslo juntos.",
    gallery: ["/momentos-01.jpeg", "/momentos-02.jpeg"],
    withForm: false,
  },
]

type CarouselItem = (typeof CAROUSEL_ITEMS)[0]

/* =========== HOOKS =========== */
function useGallery(gallery: string[], interval = 3500) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    if (!gallery || gallery.length <= 1) return
    const id = setInterval(() => setIdx((p) => (p + 1) % gallery.length), interval)
    return () => clearInterval(id)
  }, [gallery.length, interval])
  return [idx, setIdx] as [number, React.Dispatch<React.SetStateAction<number>>]
}

/* =========== REVEAL =========== */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.style.opacity = "1"
            el.style.transform = "translateY(0)"
            io.unobserve(el)
          }
        }),
      { threshold: 0.1 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateY(40px)",
        transition: `opacity 0.9s ease ${delay}ms, transform 0.9s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* =========== CYCLE CELL (auto-cycling square image) =========== */
function CycleCell({ images, radius = 22 }: { images: string[]; radius?: number }) {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    if (images.length <= 1) return
    const id = setInterval(() => setCurrent((p) => (p + 1) % images.length), 2800)
    return () => clearInterval(id)
  }, [images.length])
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: radius,
        aspectRatio: "3 / 4",
        backgroundColor: "#ddd5ca",
        boxShadow: "0 22px 50px -28px rgba(26,58,82,.4)",
        transition: "transform .55s cubic-bezier(.2,.7,.2,1), box-shadow .55s",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 30px 60px -28px rgba(26,58,82,.5)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 22px 50px -28px rgba(26,58,82,.4)"; }}
    >
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: i === current ? 1 : 0,
            transition: "opacity 1.1s ease",
          }}
        />
      ))}
    </div>
  )
}

/* =========== AUTO GRID (2×2) =========== */
function AutoGrid({ cells, radius = 22 }: { cells: string[][]; radius?: number }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 14,
        width: "100%",
        alignSelf: "center",
      }}
    >
      {cells.map((imgs, i) => (
        <CycleCell key={i} images={imgs} radius={radius} />
      ))}
    </div>
  )
}

/* =========== NAV =========== */
function Nav() {
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navLinks = [
    { href: "#filosofia", label: "Filosofía" },
    { href: "#historia", label: "Carta" },
    { href: "#cafeteria", label: "Cafetería" },
    { href: "#experiencia-culinaria", label: "Historia" },
    { href: "#franquicias", label: "Franquicias" },
  ]

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: solid ? "14px 48px" : "22px 48px",
        transition: "background .4s ease, padding .4s ease, border-color .4s ease",
        background: solid ? "rgba(245,243,239,0.88)" : "transparent",
        backdropFilter: solid ? "blur(14px) saturate(140%)" : "none",
        WebkitBackdropFilter: solid ? "blur(14px) saturate(140%)" : "none",
        color: solid ? "#1a3a52" : "rgba(255,255,255,.95)",
        borderBottom: solid ? "1px solid rgba(26,58,82,.06)" : "1px solid transparent",
      }}
    >
      <div style={{ fontFamily: "var(--font-muli)", fontWeight: 600, fontSize: 17, letterSpacing: ".14em" }}>
        THE SALAD BAR<sup style={{ fontSize: ".52em", marginLeft: 3 }}>®</sup>
      </div>

      <div
        className="hidden md:flex"
        style={{ display: "flex", gap: 30, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase" as const }}
      >
        {navLinks.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            style={{ color: "inherit", textDecoration: "none", opacity: 0.85, transition: "opacity .2s" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "1")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = ".85")}
          >
            {label}
          </a>
        ))}
      </div>

      <button
        onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
        style={{
          fontFamily: "var(--font-muli)",
          fontSize: 11,
          letterSpacing: ".22em",
          textTransform: "uppercase",
          padding: "9px 20px",
          border: "1px solid currentColor",
          borderRadius: 999,
          background: "transparent",
          color: "inherit",
          cursor: "pointer",
          transition: "background .2s, color .2s",
        }}
        onMouseEnter={(e) => {
          const b = e.currentTarget
          b.style.background = "#1a3a52"
          b.style.color = "#f5f3ef"
          b.style.borderColor = "#1a3a52"
        }}
        onMouseLeave={(e) => {
          const b = e.currentTarget
          b.style.background = "transparent"
          b.style.color = solid ? "#1a3a52" : "rgba(255,255,255,.95)"
          b.style.borderColor = "currentColor"
        }}
      >
        Contacto
      </button>
    </nav>
  )
}

/* =========== EDITORIAL DIALOG =========== */
function EditorialDialog({
  item,
  onClose,
  extraContent,
}: {
  item: CarouselItem
  onClose: () => void
  extraContent?: React.ReactNode
}) {
  const gallery = item.gallery || [item.src]
  const [activeIdx, setActiveIdx] = useGallery(gallery, 3500)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  return (
    <div className="dlg-backdrop" onClick={onClose}>
      <div className="dlg dlg-ed" onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <button className="dlg-close" aria-label="Cerrar" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6l-6 6-6 6" />
          </svg>
        </button>

        {/* Photo side */}
        <div className="dlg-ed__photo">
          {gallery.map((src, i) => (
            <img key={src} src={src} alt={item.title} className="dlg-ed__photo-img" style={{ opacity: i === activeIdx ? 1 : 0 }} />
          ))}
          <h2 className="dlg-ed__photo-title">{item.title}</h2>
          {gallery.length > 1 && (
            <div className="dlg-ed__thumbs">
              {gallery.map((src, i) => (
                <button
                  key={src}
                  className={`dlg-ed__thumb${i === activeIdx ? " active" : ""}`}
                  onClick={() => setActiveIdx(i)}
                  aria-label={`Foto ${i + 1}`}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Text side */}
        <div className="dlg-ed__text">
          {item.subtitle ? <p className="dlg-ed__subtitle">{item.subtitle}</p> : null}
          <p className="dlg-ed__body">{item.description}</p>
          {extraContent}
        </div>
      </div>
    </div>
  )
}

/* =========== FRANCHISE DIALOG =========== */
function FranqDialog({ onClose }: { onClose: () => void }) {
  const franqItem: CarouselItem = {
    src: "/pg-04.jpeg",
    title: "FRANQUICIAS\nDISPONIBLES",
    subtitle: "Llevá The Salad Bar a tu ciudad",
    description:
      "Agradecemos tu interés. Este formulario nos permite conocerte mejor y asegurar una asociación exitosa y duradera. Toda la información es tratada con estricta confidencialidad.",
    gallery: ["/pg-04.jpeg", "/pg-08.jpeg", "/cf-07.jpeg"],
    withForm: false,
  }
  return (
    <EditorialDialog
      item={franqItem}
      onClose={onClose}
      extraContent={<ContactForm />}
    />
  )
}

/* =========== SECTION RULE =========== */
function SectionRule() {
  return (
    <div
      style={{
        width: 96,
        height: 1,
        background: "linear-gradient(90deg, #1a3a52, transparent)",
        marginBottom: 28,
      }}
    />
  )
}

/* =========== PAGE =========== */
export default function HomePage() {
  const [openCarousel, setOpenCarousel] = useState<number | null>(null)
  const [openFranq, setOpenFranq] = useState(false)
  const carTrackRef = useRef<HTMLDivElement>(null)
  const heroVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = heroVideoRef.current
    if (!v) return
    v.muted = true
    v.play().catch(() => {})
  }, [])

  const scrollCarousel = (dir: number) => {
    const el = carTrackRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>(".car-card")
    const step = card ? card.getBoundingClientRect().width + 16 : 360
    el.scrollBy({ left: dir * step, behavior: "smooth" })
  }

  const dialogItem = openCarousel !== null ? CAROUSEL_ITEMS[openCarousel] : null

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f3ef", overflowX: "hidden" }}>
      <Nav />

      {/* ========== HERO ========== */}
      <section style={{ position: "relative", height: "100vh", minHeight: 640, overflow: "hidden", backgroundColor: "#000" }}>
        <video
          ref={heroVideoRef}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }}
        >
          <source
            src="https://zonohzcylydpimhxkqjm.supabase.co/storage/v1/object/public/adaptia-documents1/lv_7590901979958742289_20260415230706.mp4"
            type="video/mp4"
          />
      
        </video>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(26,58,82,.45) 0%, rgba(26,58,82,.05) 35%, rgba(26,58,82,.6) 100%)",
          }}
        />
        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            color: "white",
            fontSize: 10,
            letterSpacing: ".4em",
            textTransform: "uppercase",
            opacity: 0.7,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span>Scroll</span>
          <span
            style={{
              width: 1,
              height: 38,
              background: "rgba(255,255,255,.6)",
              display: "block",
              animation: "scrollLine 2s ease-in-out infinite",
            }}
          />
        </div>
      </section>

      {/* ========== FILOSOFIA ========== */}
      <section
        id="filosofia"
        style={{ backgroundColor: "#e8e4dd", padding: "clamp(90px,10vw,140px) clamp(22px,4vw,80px)", position: "relative", overflow: "hidden" }}
      >
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "clamp(50px,7vw,100px)", alignItems: "center" }} className="two-col-grid">
          <Reveal>
            <SectionRule />
              <h2
                style={{
                  fontFamily: "var(--font-muli)",
                  fontWeight: 200,
                  fontSize: "clamp(50px, 5.4vw, 80px)",
                  lineHeight: 0.98,
                  letterSpacing: ".015em",
                  textTransform: "uppercase",
                  margin: "0 0 32px",
                  color: "#1a3a52",
                }}
              >
            FILOSOFIA

              </h2>
            <p style={{ fontFamily: "var(--font-glacial)", fontSize: 19, lineHeight: 1.65, fontWeight: 400, color: "#1a3a52", maxWidth: "60ch" }}>
              Nuestros valores destacan que{" "}
              <span style={{ fontFamily: "var(--font-glacial)", fontStyle: "italic", color: "#2c4f6b", display: "block", margin: "8px 0", letterSpacing: ".02em" }}>
                COMER BIEN ES UNA FORMA DE AUTO RESPETO
              </span>
              y comer bien es una combinación que reúne calidad, sabor, conciencia, servicio y experiencia. Somos
              muy exigentes con la calidad y frescura de nuestros insumos, queremos darte lo mejor y en un entorno
              que te haga sentir bien. Buscamos que cada visita se sienta para vos una experiencia ligera, fresca
              y con aire de vacaciones, que refleja un estilo de vida, por lo que en estos años creamos una
              propuesta que asegura un público fiel, que no solo conecta con el producto sino emocionalmente con
              la marca.
            </p>
          </Reveal>

          <Reveal delay={120}>
            {/* Decorative frame */}
            <div style={{ position: "relative", aspectRatio: "4/5", width: "100%" }}>
              <img
                src="/filosofia.jpeg"
                alt="Barra de ensaladas con ingredientes frescos"
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 4,
                  boxShadow: "0 30px 60px -30px rgba(26,58,82,.4)",
                  display: "block",
                }}
              />
              {/* deco squares */}
              <div style={{ position: "absolute", bottom: -28, right: -28, width: 130, height: 130, background: "#d4c5a9", opacity: 0.55, zIndex: -1 }} />
              <div style={{ position: "absolute", top: -28, left: -28, width: 100, height: 100, border: "1px solid #1a3a52", opacity: 0.25 }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== PROPUESTA GASTRONÓMICA ========== */}
      <section
        id="historia"
        style={{ backgroundColor: "#f5f3ef", padding: "clamp(90px,10vw,140px) clamp(22px,4vw,80px)", position: "relative", overflow: "hidden" }}
      >
        <div
          style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "clamp(50px,6vw,80px)", alignItems: "center" }}
          className="two-col-grid"
        >
          <Reveal delay={80}>
            <AutoGrid cells={PROPUESTA_CELLS} radius={22} />
          </Reveal>

          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <SectionRule />
              <h2
                style={{
                  fontFamily: "var(--font-muli)",
                  fontWeight: 200,
                  fontSize: "clamp(40px, 5.1vw, 78px)",
                  overflowWrap: "break-word",
                  lineHeight: 0.98,
                  letterSpacing: ".015em",
                  textTransform: "uppercase",
                  margin: "0 0 32px",
                  color: "#1a3a52",
                }}
              >
                PROPUESTA
                <br />
                GASTRONÓMICA
              </h2>
              {/* List with aqua dots */}
              <ul
                style={{
                  fontFamily: "var(--font-muli)",
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: "#1a3a52",
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  borderTop: "1px solid #ddd5ca",
                  paddingTop: 22,
                }}
              >
                {[
                  "Desayunos, brunch y meriendas",
                  "Armá tu propia ensalada / The Salad Bar + de 55 ingredientes",
                  "Pre Set Bowls",
                  "Sopas",
                  "Platos elaborados",
                  "Wraps y Sandwiches",
                  "Jugos naturales y smoothies",
                  "The Bar: aperitivos, vinos y cerveza",
                ].map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 0" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#7fcdcd", flexShrink: 0, display: "block" }} />
                    {item}
                  </li>
                ))}
              </ul>
              {[
                "En The Salad Bar, creemos que lo rico y nutritivo pueden ir de la mano. Cocinamos con pasión y atención al detalle, cuidando la calidad de los ingredientes y los métodos de cocción para destacar sus sabores naturales.",
                "Completa nuestra propuesta: desayunos, brunch, meriendas y el bar, siguiendo la misma línea. Veganos, vegetarianos y celíacos también encontrarán opciones, sin ser restrictivo.",
                "Siendo razonables con los precios, generosos con las porciones y exigentes con la calidad, logramos un producto que hace que la gente nos recomiende y quiera volver.",
              ].map((text, i) => (
                <p key={i} style={{ fontFamily: "var(--font-glacial)", fontSize: 17, lineHeight: 1.65, color: "#1a3a52", margin: i === 0 ? 0 : "14px 0 0" }}>
                  {text}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== CAFETERIA · EASY NIGHTS ========== */}
      <section
        id="cafeteria"
        style={{ backgroundColor: "#e8e4dd", padding: "clamp(90px,10vw,140px) clamp(22px,4vw,80px)", position: "relative", overflow: "hidden" }}
      >
        <div
          style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.3fr)", gap: "clamp(50px,6vw,80px)", alignItems: "center" }}
          className="two-col-grid"
        >
          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <SectionRule />
              <h2
                style={{
                  fontFamily: "var(--font-muli)",
                  fontWeight: 200,
                  fontSize: "clamp(40px, 5.4vw, 78px)",
                  overflowWrap: "break-word",
                  lineHeight: 0.98,
                  letterSpacing: ".015em",
                  textTransform: "uppercase",
                  margin: "0 0 32px",
                  color: "#1a3a52",
                }}
              >
                CAFETERIA
                <br />
                EASY NIGHTS
              </h2>
              {[
                "Siguiendo la misma linea y con un gran desafío nos comprometemos a brindarte en cada brunch, merienda, tentempié y a cualquier hora, propuestas de las que estamos enamorados, smoothies, panqueques, tostones llenos de nutrición, pastelería de nuestra cocina, jugos naturales para levantar cualquier estado y por supuesto café, para nosotros de la mejor calidad. Sentite libre, sentite liviano, sentite sano. Nosotros nos comprometemos a cuidarte.",
                "Y parte de llevar una vida saludable nos habla de esas charlas con amigos, de ese ratito de despeje al ir terminando el dia, un aperitivo , una picadita y buena musica. Easy nights crean el ambiente perfecto para esa pausa, para que te relajes, desconectes, las charlas fluyan y te pongas al dia.",
              ].map((text, i) => (
                <p key={i} style={{ fontFamily: "var(--font-glacial)", fontSize: 17, lineHeight: 1.65, color: "#1a3a52", margin: i === 0 ? 0 : "14px 0 0" }}>
                  {text}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <AutoGrid cells={CAFETERIA_CELLS} radius={22} />
          </Reveal>
        </div>
      </section>

      {/* ========== EXPERIENCIA CAROUSEL ========== */}
      <section
        id="experiencia-culinaria"
        style={{
          position: "relative",
          padding: "100px 0 140px",
          background: "linear-gradient(180deg, #f5f3ef 0%, #e8e4dd 100%)",
          overflow: "hidden",
        }}
      >
        {/* Arrow buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            padding: "0 48px",
            marginBottom: 48,
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {[{ dir: -1, d: "M15 19l-7-7 7-7" }, { dir: 1, d: "M9 5l7 7-7 7" }].map(({ dir, d }) => (
              <button
                key={dir}
                onClick={() => scrollCarousel(dir)}
                aria-label={dir === -1 ? "Anterior" : "Siguiente"}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  border: "1px solid #1a3a52",
                  background: "transparent",
                  color: "#1a3a52",
                  cursor: "pointer",
                  display: "grid",
                  placeItems: "center",
                  transition: "all .25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#1a3a52"
                  e.currentTarget.style.color = "#f5f3ef"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent"
                  e.currentTarget.style.color = "#1a3a52"
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d={d} />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Scroll track */}
        <div
          ref={carTrackRef}
          style={{
            display: "flex",
            gap: 16,
            padding: "0 48px",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
          }}
        >
          {[...CAROUSEL_ITEMS, ...CAROUSEL_ITEMS].map((item, i) => {
            const realIdx = i % CAROUSEL_ITEMS.length
            return (
              <article
                key={i}
                className="car-card"
                onClick={() => setOpenCarousel(realIdx)}
                style={{
                  flexShrink: 0,
                  flexBasis: "calc(33.333% - 11px)",
                  minWidth: 300,
                  height: 560,
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  scrollSnapAlign: "start",
                  borderRadius: 6,
                }}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 1.2s cubic-bezier(.2,.7,.2,1)",
                    display: "block",
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.transform = "scale(1.06)")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.transform = "scale(1)")}
                />
                {/* Shade */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, transparent 35%, rgba(26,58,82,.85) 100%)",
                  }}
                />
                {/* Title block */}
                <div style={{ position: "absolute", left: 28, right: 28, bottom: 26, color: "white" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-muli)",
                      fontWeight: 300,
                      fontSize: "clamp(24px, 2.2vw, 36px)",
                      lineHeight: 1,
                      margin: "0 0 10px",
                      whiteSpace: "pre-line",
                      letterSpacing: ".04em",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.title}
                  </h3>
                  {item.subtitle ? (
                    <div style={{ fontFamily: "var(--font-times)", fontStyle: "italic", fontSize: 16, opacity: 0.92 }}>
                      {item.subtitle}
                    </div>
                  ) : null}
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      marginTop: 16,
                      fontSize: 11,
                      letterSpacing: ".3em",
                      textTransform: "uppercase",
                      color: "white",
                      opacity: 0,
                      transition: "opacity .4s, transform .4s",
                      transform: "translateY(8px)",
                    }}
                    className="car-cta"
                  >
                    Ver más →
                  </span>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* ========== FRANQUICIAS ========== */}
      <section
        id="franquicias"
        style={{
          position: "relative",
          height: "88vh",
          minHeight: 600,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a3a52",
          color: "#f5f3ef",
        }}
      >
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.35 }}>
          <img src="/pg-04.jpeg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        {/* Radial overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, transparent 0%, rgba(26,58,82,.85) 75%)",
          }}
        />
        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px", maxWidth: 720 }}>
          <div style={{ width: 56, height: 1, background: "#7fcdcd", margin: "0 auto 32px" }} />
          <h2
            style={{
              fontFamily: "var(--font-muli)",
              fontWeight: 200,
              fontSize: "clamp(44px, 8vw, 96px)",
              lineHeight: 1,
              margin: 0,
              letterSpacing: ".02em",
              textTransform: "uppercase",
            }}
          >
            FRANQUICIAS
          </h2>
          <h2
            style={{
              fontFamily: "var(--font-muli)",
              fontWeight: 200,
              fontSize: "clamp(44px, 8vw, 96px)",
              lineHeight: 1,
              margin: "6px 0 0",
              letterSpacing: ".02em",
              textTransform: "uppercase",
              color: "#7fcdcd",
            }}
          >
            DISPONIBLES
          </h2>
          <p
            style={{
              fontFamily: "var(--font-times)",
              fontStyle: "italic",
              fontSize: 22,
              lineHeight: 1.5,
              margin: "28px auto 38px",
              opacity: 0.92,
              letterSpacing: ".02em",
            }}
          >
            Llevá The Salad Bar a tu ciudad
          </p>
          <button
            onClick={() => setOpenFranq(true)}
            style={{
              fontFamily: "var(--font-muli)",
              fontSize: 12,
              letterSpacing: ".35em",
              textTransform: "uppercase",
              padding: "16px 32px",
              background: "transparent",
              color: "white",
              border: "2px solid #7fcdcd",
              cursor: "pointer",
              transition: "all .35s",
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#7fcdcd"
              e.currentTarget.style.color = "#1a3a52"
              e.currentTarget.style.transform = "translateY(-2px)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent"
              e.currentTarget.style.color = "white"
              e.currentTarget.style.transform = "translateY(0)"
            }}
          >
            SOLICITAR INFORMACIÓN
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* ========== CONTACTO ========== */}
      <MainContactForm />

      {/* ========== FOOTER ========== */}
      <footer
        style={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#ddd5ca",
          color: "#1a3a52",
          padding: "clamp(80px,10vw,128px) 32px 36px",
        }}
      >
        {/* Decorative circles */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.12, pointerEvents: "none" }}>
          {[
            { top: 80, left: 80, size: 256 },
            { bottom: 80, right: 80, size: 192 },
            { top: "33%", right: "25%", size: 128 },
          ].map((style, i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                border: "1px solid #d4c5a9",
                borderRadius: "50%",
                width: style.size,
                height: style.size,
                ...style,
                display: "block",
              }}
            />
          ))}
        </div>

        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
          {/* Head */}
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <div style={{ width: 80, height: 1, background: "linear-gradient(90deg, transparent, #d4c5a9, transparent)", margin: "0 auto 32px" }} />
            <h3
              style={{
                fontFamily: "var(--font-muli)",
                fontWeight: 200,
                fontSize: "clamp(40px, 6.5vw, 96px)",
                lineHeight: 1,
                letterSpacing: ".06em",
                color: "#1a3a52",
                margin: "0 0 24px",
                transition: "color .5s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#2c4f6b")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#1a3a52")}
            >
              The Salad Bar<sup style={{ fontSize: ".35em", verticalAlign: "super", marginLeft: 6 }}>®</sup>
            </h3>
            <p style={{ fontFamily: "var(--font-muli)", fontSize: 16, fontWeight: 300, letterSpacing: ".25em", textTransform: "lowercase", opacity: 0.8, margin: "0 0 32px" }}>
              Fresh • Healthy • Delicious
            </p>
            <div style={{ width: 80, height: 1, background: "linear-gradient(90deg, transparent, #d4c5a9, transparent)", margin: "0 auto" }} />
          </div>

          {/* 3 columns */}
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 48, marginBottom: 16, textAlign: "center" }}
            className="foot-cols"
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <h4 style={{ fontFamily: "var(--font-muli)", fontWeight: 600, fontSize: 20, color: "#1a3a52", margin: "0 0 6px" }}>Ubicación</h4>
              <p style={{ fontFamily: "var(--font-muli)", fontSize: 14, color: "#1a3a52", opacity: 0.8, margin: 0, lineHeight: 1.6 }}>
                Leguizamón 416<br />Salta, Argentina
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <h4 style={{ fontFamily: "var(--font-muli)", fontWeight: 600, fontSize: 20, color: "#1a3a52", margin: "0 0 6px" }}>Horarios</h4>
              <p style={{ fontFamily: "var(--font-muli)", fontSize: 14, color: "#1a3a52", opacity: 0.8, margin: 0, lineHeight: 1.6 }}>
                Lun - Vie: 11:00 - 22:30
              </p>
              <p style={{ fontFamily: "var(--font-muli)", fontSize: 14, color: "#1a3a52", opacity: 0.8, margin: 0, lineHeight: 1.6 }}>
                Sab: 11:00 - 17:00
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <h4 style={{ fontFamily: "var(--font-muli)", fontWeight: 600, fontSize: 20, color: "#1a3a52", margin: "0 0 6px" }}>Contacto</h4>
              {[
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
                  ),
                  text: "thesaladbar.salta@gmail.com",
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.29a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
                    </svg>
                  ),
                  text: "387-2521137",
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" />
                    </svg>
                  ),
                  text: "@thesaladbarsalta",
                },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, opacity: 0.8 }}>
                  {icon}
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom rule + copyright */}
          <div style={{ width: "100%", height: 1, background: "linear-gradient(90deg, transparent, #d4c5a9, transparent)", margin: "70px 0 24px", opacity: 0.35 }} />
          <p style={{ fontFamily: "var(--font-muli)", fontSize: 13, color: "#1a3a52", opacity: 0.6, textAlign: "center", margin: 0 }}>
            ® 2022 The Salad Bar. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* ========== DIALOGS ========== */}
      {dialogItem && (
        <EditorialDialog
          item={dialogItem}
          onClose={() => setOpenCarousel(null)}
          extraContent={dialogItem.withForm ? <JoinTeamForm /> : undefined}
        />
      )}
      {openFranq && <FranqDialog onClose={() => setOpenFranq(false)} />}
    </div>
  )
}
