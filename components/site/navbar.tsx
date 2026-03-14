"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { navLinks } from "@/lib/site-content";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { Brand } from "@/components/ui/brand";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-[color:var(--border)] bg-[color:rgba(10,15,20,0.88)] backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <Container className="py-4">
        <div className="flex items-center justify-between gap-4">
          <Brand
            className="shrink-0 text-[color:var(--text-main)]"
            logoClassName="h-8 w-auto md:h-9"
            nameClassName="text-xs font-semibold tracking-[0.14em] text-[color:var(--text-main)] md:text-sm"
          />
          <div className="hidden items-center gap-3 xl:flex">
            <ButtonLink href="#contacto" variant="secondary">
              Agendar visita técnica
            </ButtonLink>
            <ButtonLink href="#contacto">Solicitar cotización</ButtonLink>
          </div>
          <ButtonLink href="#contacto" className="xl:hidden">
            Cotizar
          </ButtonLink>
        </div>
        <nav aria-label="Navegación principal" className="mt-3 overflow-x-auto pb-1 [scrollbar-width:none]">
          <ul className="flex min-w-max items-center gap-5 text-sm text-[color:var(--text-secondary)]">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link className="transition-colors hover:text-[color:var(--text-main)]" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="xl:hidden">
              <Link className="text-[color:var(--accent-glow)] transition-colors hover:text-[color:var(--text-main)]" href="#contacto">
                Agendar visita técnica
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}

