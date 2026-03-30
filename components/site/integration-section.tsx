"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";

type NodeDefinition = {
  id: string;
  label: string;
  xRatio: number;
  yRatio: number;
  width: number;
  eventIndex: number;
};

type NodePosition = {
  x: number;
  y: number;
};

const nodeDefinitions: NodeDefinition[] = [
  { id: "cctv", label: "CCTV", xRatio: 0.5, yRatio: 0.12, width: 118, eventIndex: 0 },
  { id: "acceso", label: "Control de acceso", xRatio: 0.22, yRatio: 0.24, width: 150, eventIndex: 0 },
  { id: "alarmas", label: "Alarmas", xRatio: 0.78, yRatio: 0.24, width: 118, eventIndex: 0 },
  { id: "red", label: "Red y telecom", xRatio: 0.16, yRatio: 0.56, width: 132, eventIndex: 1 },
  { id: "salas", label: "Salas de control", xRatio: 0.84, yRatio: 0.56, width: 148, eventIndex: 1 },
  { id: "consultoria", label: "Consultoria", xRatio: 0.25, yRatio: 0.82, width: 132, eventIndex: 2 },
  { id: "soporte", label: "Soporte TI", xRatio: 0.75, yRatio: 0.82, width: 132, eventIndex: 2 },
];

const examples = [
  "CCTV, control de acceso y alarmas comparten eventos para responder con evidencia y trazabilidad.",
  "La red y las salas de control sostienen una operacion estable para entornos corporativos e industriales.",
  "Consultoria y soporte permiten crecer por etapas sin perder control tecnico del proyecto.",
];

const diagramHeight = 620;
const centerPoint = { x: 400, y: 310 };

export function IntegrationSection() {
  const reduceMotion = useReducedMotion();
  const diagramRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const [diagramWidth, setDiagramWidth] = useState(800);
  const [positions, setPositions] = useState<Record<string, NodePosition>>({});
  const dragState = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);

  useEffect(() => {
    const element = diagramRef.current;
    if (!element) return;

    const syncPositions = () => {
      const width = element.clientWidth;
      if (!width) return;
      setDiagramWidth(width);
      const nextPositions: Record<string, NodePosition> = {};
      for (const node of nodeDefinitions) {
        nextPositions[node.id] = {
          x: width * node.xRatio,
          y: diagramHeight * node.yRatio,
        };
      }
      setPositions((prev) => (Object.keys(prev).length === 0 ? nextPositions : prev));
      setReady(true);
    };

    syncPositions();
    const observer = new ResizeObserver(() => {
      if (Object.keys(positions).length === 0) {
        syncPositions();
      }
    });
    observer.observe(element);

    return () => observer.disconnect();
  }, [positions]);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const drag = dragState.current;
      const container = diagramRef.current;
      if (!drag || !container) return;

      const rect = container.getBoundingClientRect();
      const definition = nodeDefinitions.find((item) => item.id === drag.id);
      if (!definition) return;

      const halfWidth = definition.width / 2;
      const nextX = Math.min(Math.max(event.clientX - rect.left - drag.offsetX, halfWidth), rect.width - halfWidth);
      const nextY = Math.min(Math.max(event.clientY - rect.top - drag.offsetY, 48), diagramHeight - 48);

      setPositions((prev) => ({
        ...prev,
        [drag.id]: { x: nextX, y: nextY },
      }));
    };

    const stopDrag = () => {
      dragState.current = null;
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", stopDrag);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", stopDrag);
    };
  }, []);

  const startDrag = (event: React.PointerEvent<HTMLButtonElement>, id: string) => {
    const container = diagramRef.current;
    const node = positions[id];
    if (!container || !node) return;

    const rect = container.getBoundingClientRect();
    dragState.current = {
      id,
      offsetX: event.clientX - rect.left - node.x,
      offsetY: event.clientY - rect.top - node.y,
    };
  };

  return (
    <section id="integracion" className="section-spacing">
      <Container>
        <Reveal>
          <SectionIntro
            eyebrow="Integracion real"
            title="Servicios conectados para una operacion tecnica coherente"
            description="Arrastra los servicios alrededor del logo central y visualiza como la integracion conecta seguridad, redes, control operativo y soporte."
          />
        </Reveal>
        <div className="mt-10 grid gap-6 xl:grid-cols-[1.02fr_1fr]">
          <Reveal>
            <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 md:p-8">
              <h3 className="text-2xl font-semibold text-[color:var(--text-main)]">Integracion aplicada</h3>
              <p className="mt-4 text-sm leading-relaxed text-[color:var(--text-secondary)]">
                Cada servicio aporta valor por si solo, pero el resultado mejora cuando se disena como parte de una misma estrategia operacional.
              </p>
              <div className="mt-6 space-y-4">
                {examples.map((example, index) => (
                  <div
                    key={example}
                    className={`rounded-xl border px-4 py-3 text-sm transition-colors ${
                      active === index
                        ? "border-[color:rgba(34,211,238,0.5)] bg-[color:rgba(34,211,238,0.1)] text-[color:var(--text-main)]"
                        : "border-[color:var(--border)] bg-[color:rgba(255,255,255,0.01)] text-[color:var(--text-secondary)]"
                    }`}
                  >
                    {example}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div
              ref={diagramRef}
              className="relative min-h-[620px] overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[linear-gradient(165deg,rgba(19,29,43,0.9)_0%,rgba(16,23,34,0.98)_100%)] p-4 md:p-6"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.14),transparent_55%)]" aria-hidden />

              <div className="absolute inset-0 hidden md:block" aria-hidden>
                <svg viewBox={`0 0 800 ${diagramHeight}`} className="h-full w-full">
                  {nodeDefinitions.map((node) => {
                    const position = positions[node.id];
                    if (!position) return null;

                    const scaledX = (position.x / Math.max(diagramWidth, 1)) * 800;
                    const scaledY = position.y;
                    const isActive = active === node.eventIndex;

                    return (
                      <g key={node.id}>
                        <line
                          x1={centerPoint.x}
                          y1={centerPoint.y}
                          x2={scaledX}
                          y2={scaledY}
                          stroke="rgba(167,180,198,0.18)"
                          strokeWidth="1.2"
                        />
                        <line
                          x1={centerPoint.x}
                          y1={centerPoint.y}
                          x2={scaledX}
                          y2={scaledY}
                          stroke={isActive ? "rgba(34,211,238,0.92)" : "rgba(34,211,238,0.52)"}
                          strokeWidth="1.2"
                          className="integration-line"
                        />
                        {!reduceMotion ? (
                          <motion.circle
                            cx={centerPoint.x}
                            cy={centerPoint.y}
                            r="4"
                            fill="rgba(34,211,238,0.92)"
                            animate={{
                              cx: [centerPoint.x, scaledX],
                              cy: [centerPoint.y, scaledY],
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: 1.8,
                              repeat: Infinity,
                              repeatDelay: 0.25,
                              ease: "linear",
                              delay: node.eventIndex * 0.12,
                            }}
                          />
                        ) : null}
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="absolute left-1/2 top-1/2 z-10 hidden w-[220px] -translate-x-1/2 -translate-y-1/2 md:block">
                <motion.div
                  animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="rounded-[2rem] border border-[color:rgba(34,211,238,0.38)] bg-[linear-gradient(180deg,rgba(12,21,34,0.96)_0%,rgba(10,17,28,0.94)_100%)] px-6 py-6 text-center shadow-[0_22px_54px_-26px_rgba(34,211,238,0.55)]"
                >
                  <Image
                    src="/simple-core-logo.svg"
                    alt="Simple Core"
                    width={190}
                    height={60}
                    className="mx-auto h-auto w-[148px]"
                  />
                  <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-[color:var(--accent-glow)]">Operacion conectada</p>
                </motion.div>
              </div>

              <div className="relative hidden h-full md:block">
                {ready &&
                  nodeDefinitions.map((node) => {
                    const position = positions[node.id];
                    if (!position) return null;

                    const isActive = active === node.eventIndex;

                    return (
                      <motion.button
                        key={node.id}
                        type="button"
                        onMouseEnter={() => setActive(node.eventIndex)}
                        onFocus={() => setActive(node.eventIndex)}
                        onPointerDown={(event) => startDrag(event, node.id)}
                        whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                        className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-xl border px-3 py-2 text-center text-[11px] font-medium leading-tight transition active:cursor-grabbing ${
                          isActive
                            ? "border-[color:rgba(34,211,238,0.6)] bg-[color:rgba(34,211,238,0.14)] text-[color:var(--text-main)]"
                            : "border-[color:var(--border)] bg-[color:rgba(16,23,34,0.92)] text-[color:var(--text-secondary)]"
                        }`}
                        style={{ left: `${position.x}px`, top: `${position.y}px`, width: `${node.width}px` }}
                      >
                        {node.label}
                      </motion.button>
                    );
                  })}
              </div>

              <div className="grid gap-3 md:hidden">
                <div className="rounded-2xl border border-[color:rgba(34,211,238,0.42)] bg-[color:rgba(11,19,31,0.88)] px-4 py-5 text-center">
                  <Image
                    src="/simple-core-logo.svg"
                    alt="Simple Core"
                    width={190}
                    height={60}
                    className="mx-auto h-auto w-[148px]"
                  />
                  <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-[color:var(--accent-glow)]">Operacion conectada</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {nodeDefinitions.map((node) => (
                    <div
                      key={node.id}
                      className="rounded-xl border border-[color:var(--border)] bg-[color:rgba(16,23,34,0.92)] px-4 py-3 text-sm text-[color:var(--text-secondary)]"
                    >
                      {node.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
