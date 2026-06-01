"use client"

import { MessageCircle } from "lucide-react"
import { useState } from "react"

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href="https://wa.me/5493872521137"
      rel="noopener noreferrer"
      style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 50,
        background: hovered ? "#16a34a" : "#22c55e", color: "white",
        padding: 16, borderRadius: "50%",
        boxShadow: "0 4px 20px rgba(0,0,0,.25)",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background .2s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <MessageCircle style={{ width: 24, height: 24 }} />
    </a>
  )
}
