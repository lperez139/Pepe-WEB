"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import { services } from "@/lib/site-content";

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [canHover, setCanHover] = useState(false);
  const [visible, setVisible] = useState(false);

  const glowX = useMotionValue(-400);
  const glowY = useMotionValue(-400);
  const smoothX = useSpring(glowX, { stiffness: 110, damping: 24, mass: 0.35 });
  const smoothY = useSpring(glowY, { stiffness: 110, damping: 24, mass: 0.35 });

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!canHover || reduceMotion) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    glowX.set(event.clientX - rect.left - 220);
    glowY.set(event.clientY - rect.top - 220);
    setVisible(true);
  };

  const handleLeave = () => setVisible(false);

  return (
    <section id="servicios" className="section-spacing">
      <Container>
        <div
          ref={sectionRef}
          className="relative overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:rgba(16,23,34,0.58)] p-6 md:p-10"
          onMouseMove={handleMove}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={handleLeave}
        >
          {canHover && !reduceMotion ? (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.22)_0%,rgba(29,78,216,0.14)_35%,rgba(16,23,34,0)_72%)] blur-2xl"
              style={{ x: smoothX, y: smoothY, opacity: visible ? 1 : 0 }}
              transition={{ duration: 0.25 }}
            />
          ) : null}

          <Reveal>
            <SectionIntro
              eyebrow="Servicios"
              title="Capacidades integrales para seguridad electrónica e infraestructura tecnológica"
              description="Integramos videovigilancia IP, control de acceso biométrico, redes, digital signage, energía y monitoreo bajo una arquitectura única, escalable y auditable."
            />
          </Reveal>

          <div className="relative z-10 mt-10 grid gap-4 lg:grid-cols-2">
            {services.map((service, index) => (
              <Reveal key={service.id} delay={0.03 * (index % 6)}>
                <motion.article
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -4,
                          borderColor: "rgba(34,211,238,0.36)",
                          boxShadow: "0 16px 40px -24px rgba(34,211,238,0.42)",
                        }
                  }
                  transition={{ duration: 0.32 }}
                  className="group h-full rounded-2xl border border-[color:var(--border)] bg-[linear-gradient(170deg,rgba(19,29,43,0.8)_0%,rgba(16,23,34,0.78)_100%)] p-6"
                >
                  <h3 className="text-xl font-semibold text-[color:var(--text-main)]">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-secondary)]">{service.description}</p>
                  <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-glow)]">
                        Capacidades
                      </p>
                      <ul className="mt-3 space-y-2">
                        {service.capabilities.map((item) => (
                          <li key={item} className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-glow)]">
                        Aplicaciones
                      </p>
                      <ul className="mt-3 space-y-2">
                        {service.applications.map((item) => (
                          <li key={item} className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

