'use client';

import { Button } from "@/components/ui/button";

export default function HeroButton() {
  return (
    <Button
      size="lg"
      className="bg-transparent border-2 border-amber-400 hover:bg-amber-400 hover:border-amber-400 text-amber-400 hover:text-stone-900 px-12 py-4 text-lg font-light rounded-none transition-all duration-500 hover:scale-105 hover:shadow-2xl tracking-widest uppercase font-sans"
      onClick={() =>
        document
          .getElementById("experiencia-culinaria")
          ?.scrollIntoView({ behavior: "smooth" })
      }
    >
      Explorar
    </Button>
  );
}
