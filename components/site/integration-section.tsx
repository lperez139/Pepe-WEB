"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";

const nodes = [
  { label: "CCTV", x: 16, y: 24 },
  { label: "Control de acceso", x: 35, y: 12 },
  { label: "Alarmas", x: 66, y: 12 },
  { label: "Red y telecom", x: 84, y: 26 },
  { label: "Monitoreo central", x: 84, y: 74 },
  { label: "Respaldo energético", x: 50, y: 88 },
  { label: "Cartelería digital", x: 16, y: 74 },
];

const examples = [
  "Alarma de intrusión abre video contextual en sala de control.",
  "Acceso biométrico genera evidencia automática en CCTV.",
  "Falla eléctrica activa protocolo UPS y notificaciones operativas.",
  "Eventos de red afectan criticidad y disparan respuesta preventiva.",
];

export function IntegrationSection() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <section id="integracion" className="section-spacing">
      <Container>
        <Reveal>
          <SectionIntro
            eyebrow="Integración real"
            title="Diseñamos ecosistemas tecnológicos conectados, no soluciones aisladas"
            description="La arquitectura integra seguridad electrónica, red, energía y monitoreo para ejecutar automatizaciones operativas y centralizar la toma de decisiones."
          />
        </Reveal>
        <div className="mt-10 grid gap-6 xl:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 md:p-8">
              <h3 className="text-2xl font-semibold text-[color:var(--text-main)]">Centralización operativa</h3>
              <p className="mt-4 text-sm leading-relaxed text-[color:var(--text-secondary)]">
                Unificamos eventos, alarmas y evidencia para que operaciones, seguridad y TI actúen con contexto
                inmediato.
              </p>
              <ul className="mt-6 space-y-4">
                {examples.map((example, index) => (
                  <li
                    key={example}
                    className={`rounded-xl border px-4 py-3 text-sm transition-colors ${
                      active === index
                        ? "border-[color:rgba(34,211,238,0.5)] bg-[color:rgba(34,211,238,0.1)] text-[color:var(--text-main)]"
                        : "border-[color:var(--border)] bg-[color:rgba(255,255,255,0.01)] text-[color:var(--text-secondary)]"
                    }`}
                  >
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative min-h-[520px] rounded-3xl border border-[color:var(--border)] bg-[linear-gradient(165deg,rgba(19,29,43,0.8)_0%,rgba(16,23,34,0.92)_100%)] p-4">
              <div className="absolute inset-0 hidden md:block" aria-hidden>
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  {nodes.map((node, index) => (
                    <line
                      key={`line-${node.label}`}
                      x1="50"
                      y1="50"
                      x2={node.x}
                      y2={node.y}
                      stroke={active === index ? "rgba(34, 211, 238, 0.8)" : "rgba(167,180,198,0.3)"}
                      strokeWidth="0.55"
                      className="integration-line"
                    />
                  ))}
                </svg>
              </div>

              <div className="relative hidden h-full md:block">
                <motion.button
                  whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                  type="button"
                  className="absolute left-1/2 top-1/2 w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[color:rgba(34,211,238,0.42)] bg-[color:rgba(13,23,38,0.88)] px-5 py-4 text-center text-sm font-semibold text-[color:var(--text-main)] shadow-[0_18px_42px_-20px_rgba(34,211,238,0.5)]"
                >
                  Plataforma de integración Simple Core
                </motion.button>

                {nodes.map((node, index) => (
                  <motion.button
                    key={node.label}
                    type="button"
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border px-3 py-2 text-xs font-medium transition ${
                      active === index
                        ? "border-[color:rgba(34,211,238,0.6)] bg-[color:rgba(34,211,238,0.12)] text-[color:var(--text-main)]"
                        : "border-[color:var(--border)] bg-[color:rgba(16,23,34,0.86)] text-[color:var(--text-secondary)]"
                    }`}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  >
                    {node.label}
                  </motion.button>
                ))}
              </div>

              <div className="grid gap-3 md:hidden">
                <div className="rounded-xl border border-[color:rgba(34,211,238,0.45)] bg-[color:rgba(16,23,34,0.78)] px-4 py-3 text-sm text-[color:var(--text-main)]">
                  Plataforma de integración Simple Core
                </div>
                {nodes.map((node) => (
                  <div
                    key={node.label}
                    className="rounded-xl border border-[color:var(--border)] bg-[color:rgba(16,23,34,0.9)] px-4 py-3 text-sm text-[color:var(--text-secondary)]"
                  >
                    {node.label}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
