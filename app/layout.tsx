import type React from "react"
import type { Metadata } from "next"
import { Eczar, Mulish } from "next/font/google"
import "./globals.css"
import WhatsAppButton from "@/components/whatsapp-button"

const eczar = Eczar({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-eczar",
  weight: ["400", "500", "600", "700", "800"],
})

const mulish = Mulish({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mulish",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "The Salad Bar® - Cocina Mediterránea Contemporánea",
  description:
    "Experiencia culinaria mediterránea única con ingredientes frescos y ambiente sofisticado",
  icons: {
    icon: "/favicon-logo.png",
    apple: "/favicon-logo.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={`${eczar.variable} ${mulish.variable} antialiased`}
    >
      <head>
        <style>{`
          html, body { margin: 0; padding: 0; overflow-x: hidden; }
          *, *::before, *::after { box-sizing: border-box; }
          a { color: inherit; text-decoration: none; }

          /* Scrollbar */
          html, * { scrollbar-width: thin; scrollbar-color: rgba(26,58,82,.15) transparent; }
          ::-webkit-scrollbar { width: 4px; height: 4px; background: transparent; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: rgba(26,58,82,.15); border-radius: 99px; }
          ::-webkit-scrollbar-thumb:hover { background: rgba(26,58,82,.32); }

          /* Nav hover */
          .nav-link { position: relative; opacity: .82; transition: opacity .25s; }
          .nav-link:hover { opacity: 1; }
          .nav-link::after {
            content: ""; position: absolute; left: 0; bottom: -3px;
            width: 100%; height: 1px; background: currentColor;
            transform: scaleX(0); transform-origin: right;
            transition: transform .35s cubic-bezier(.4,0,.2,1);
          }
          .nav-link:hover::after { transform: scaleX(1); transform-origin: left; }

          /* Two-column grid */
          .two-col-grid { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); }
          @media (max-width: 980px) { .two-col-grid { grid-template-columns: 1fr !important; } }
          @media (max-width: 800px) { .foot-cols { grid-template-columns: 1fr !important; gap: 32px !important; } }
          @media (max-width: 800px) { .hidden.md\\:flex { display: none !important; } }
          .car-card:hover .car-cta { opacity: 1 !important; transform: translateY(0) !important; }

          /* Dialog animations */
          @keyframes dlgFade { from { opacity:0 } to { opacity:1 } }
          @keyframes dlgRise { from { opacity:0; transform:translateY(30px) scale(.98) } to { opacity:1; transform:translateY(0) scale(1) } }

          /* Dialog backdrop + shell */
          .dlg-backdrop {
            position: fixed; inset: 0;
            background: rgba(26,58,82,.65);
            backdrop-filter: blur(14px) saturate(140%);
            -webkit-backdrop-filter: blur(14px) saturate(140%);
            z-index: 100; display: grid; place-items: center;
            padding: 32px; animation: dlgFade .4s ease;
          }
          .dlg {
            position: relative; max-width: 1240px; width: 100%;
            height: min(92vh, 820px); overflow: hidden;
            background: #f5f3ef; border-radius: 12px;
            box-shadow: 0 60px 120px -40px rgba(0,0,0,.5);
            animation: dlgRise .5s cubic-bezier(.2,.8,.2,1);
          }
          .dlg-close {
            position: absolute; top: 22px; right: 22px; z-index: 10;
            width: 44px; height: 44px; border-radius: 50%; border: none;
            background: rgba(245,243,239,.95); color: #1a3a52; cursor: pointer;
            display: grid; place-items: center; transition: all .2s;
            box-shadow: 0 6px 20px -8px rgba(0,0,0,.3);
          }
          .dlg-close:hover { background: #1a3a52; color: #f5f3ef; transform: scale(1.05); }

          /* Editorial dialog */
          .dlg-ed { display: grid; grid-template-columns: 1fr 1fr; height: 100%; }
          .dlg-ed__photo { position: relative; overflow: hidden; background: #ddd5ca; min-height: 0; }
          .dlg-ed__photo-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: opacity 1.2s ease; }
          .dlg-ed__photo::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg,transparent 50%,rgba(26,58,82,.5)); pointer-events: none; }
          .dlg-ed__photo-title {
            position: absolute; left: 28px; right: 28px; bottom: 84px; z-index: 2;
            color: white; font-family: "Muli",sans-serif; font-weight: 200;
            font-size: clamp(28px,3.2vw,52px); line-height: 1.05; letter-spacing: .03em;
            text-transform: uppercase; white-space: pre-line; margin: 0;
          }
          .dlg-ed__thumbs {
            position: absolute; left: 50%; bottom: 22px; transform: translateX(-50%);
            z-index: 2; display: flex; gap: 2px; max-width: calc(100% - 24px);
          }
          .dlg-ed__thumb {
            width: 56px; height: 42px; overflow: hidden; cursor: pointer;
            border: none; background: transparent; padding: 0;
            opacity: .42; transition: opacity .25s; position: relative; flex-shrink: 0;
          }
          .dlg-ed__thumb.active { opacity: 1; }
          .dlg-ed__thumb.active::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 2px; background: white; }
          .dlg-ed__thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
          .dlg-ed__text { padding: 60px 56px; overflow-y: auto; display: flex; flex-direction: column; gap: 20px; min-height: 0; }
          .dlg-ed__eyebrow { font-size: 11px; letter-spacing: .4em; text-transform: uppercase; color: #2c4f6b; display: flex; align-items: center; gap: 12px; }
          .dlg-ed__eyebrow::before { content: ""; width: 28px; height: 1px; background: currentColor; opacity: .6; flex-shrink: 0; }
          .dlg-ed__subtitle { font-family: "Times New Roman",serif; font-style: italic; font-size: 22px; color: #2c4f6b; margin: 0; line-height: 1.4; }
          .dlg-ed__body { font-family: "Glacial Indifference",sans-serif; font-size: 16px; line-height: 1.75; color: #1a3a52; margin: 0; font-weight: 300; }
          .dlg-ed__body::first-letter { font-family: "Times New Roman",serif; font-style: italic; font-size: 3.6em; font-weight: 400; line-height: .72; float: left; margin: .07em .1em 0 0; color: #2c4f6b; }
          @media (max-width: 900px) {
            .dlg { height: auto; max-height: 92vh; }
            .dlg-ed { grid-template-columns: 1fr; height: auto; max-height: 92vh; overflow-y: auto; }
            .dlg-ed__photo { height: 300px; }
            .dlg-ed__text { padding: 32px 24px; }
          }
        `}</style>
      </head>
      <body style={{ margin: 0, padding: 0, background: "#f5f3ef" }}>{children}
      <WhatsAppButton />
      </body>
    </html>
  )
}
