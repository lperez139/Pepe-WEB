"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

type SystemMetric = {
  id: string;
  label: string;
  value: number;
  unit: string;
  status: "Operativo" | "Monitoreado";
};

const baseMetrics: SystemMetric[] = [
  { id: "cctv", label: "Camaras CCTV activas", value: 482, unit: "camaras", status: "Operativo" },
  { id: "acceso", label: "Puntos de control de acceso", value: 126, unit: "lectores", status: "Operativo" },
  { id: "nvr", label: "NVR y servidores en linea", value: 34, unit: "nodos", status: "Operativo" },
  { id: "red", label: "Nodos de red criticos", value: 219, unit: "switches/AP", status: "Monitoreado" },
  { id: "ups", label: "Sistemas UPS en supervision", value: 52, unit: "UPS", status: "Monitoreado" },
  { id: "signage", label: "Pantallas de carteleria online", value: 88, unit: "pantallas", status: "Operativo" },
];

const events = [
  "Evento sincronizado: acceso biometrico mas video asociado en edificio corporativo.",
  "Chequeo de salud completado: UPS y respaldo energetico dentro de umbral estable.",
  "Alarma perimetral validada: video contextual abierto en sala de monitoreo.",
  "Estado de red actualizado: latencia y disponibilidad en rango operativo.",
];

export function LiveSystemsDashboard() {
  const reduceMotion = useReducedMotion();
  const [metrics, setMetrics] = useState<SystemMetric[]>(baseMetrics);
  const [now, setNow] = useState("");

  useEffect(() => {
    const updateClock = () => {
      setNow(
        new Intl.DateTimeFormat("es-CL", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    };

    updateClock();
    const clockInterval = setInterval(updateClock, 1000);
    const metricsInterval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((item, index) => {
          const variance = ((Date.now() + index * 17) % 3) - 1;
          return { ...item, value: Math.max(1, item.value + variance) };
        }),
      );
    }, 3000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(metricsInterval);
    };
  }, []);

  const onlineCount = metrics.reduce((acc, item) => acc + item.value, 0);

  return (
    <section className="pb-6 md:pb-10">
      <Container>
        <Reveal>
          <div className="rounded-3xl border border-[color:var(--border)] bg-[linear-gradient(160deg,rgba(16,23,34,0.92)_0%,rgba(19,29,43,0.88)_100%)] p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-glow)]">
                  Centro de monitoreo
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-[color:var(--text-main)] md:text-4xl">Sistemas activos</h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-[color:rgba(255,99,99,0.35)] bg-[color:rgba(90,16,24,0.28)] px-3 py-1.5 text-xs font-semibold text-red-200">
                  <motion.span
                    aria-hidden
                    className="h-2.5 w-2.5 rounded-full bg-red-500"
                    animate={reduceMotion ? undefined : { opacity: [0.4, 1, 0.4], scale: [0.9, 1.18, 0.9] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  />
                  EN VIVO
                </div>
                <p className="rounded-full border border-[color:var(--border)] px-3 py-1.5 text-xs text-[color:var(--text-secondary)]">
                  Ultima actualizacion: {now || "--:--:--"}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 xl:grid-cols-[1.35fr_0.82fr]">
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {metrics.map((metric) => (
                  <article
                    key={metric.id}
                    className="rounded-2xl border border-[color:var(--border)] bg-[color:rgba(10,15,20,0.62)] p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.1em] text-[color:var(--text-secondary)]">{metric.label}</p>
                    <p className="mt-2 text-3xl font-semibold text-[color:var(--text-main)]">{metric.value}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-xs text-[color:var(--text-secondary)]">{metric.unit}</p>
                      <span className="rounded-full border border-[color:rgba(34,211,238,0.35)] bg-[color:rgba(34,211,238,0.12)] px-2 py-1 text-[11px] font-medium text-cyan-200">
                        {metric.status}
                      </span>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="rounded-2xl border border-[color:var(--border)] bg-[color:rgba(10,15,20,0.62)] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--accent-glow)]">
                  Resumen live
                </p>
                <p className="mt-3 text-4xl font-semibold text-[color:var(--text-main)]">{onlineCount}</p>
                <p className="text-sm text-[color:var(--text-secondary)]">elementos bajo supervision en tiempo real</p>

                <div className="mt-6 space-y-3">
                  {events.map((event, index) => (
                    <div key={event} className="rounded-xl border border-[color:var(--border)] bg-[color:rgba(255,255,255,0.01)] p-3">
                      <p className="text-xs leading-relaxed text-[color:var(--text-secondary)]">{event}</p>
                      <p className="mt-2 text-[11px] uppercase tracking-[0.08em] text-[color:var(--accent-glow)]">
                        Stream {index + 1}
                      </p>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
