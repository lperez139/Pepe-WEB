"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";

type DiagramSize = {
  height: number;
  width: number;
};

type RootNodeDefinition = {
  id: string;
  label: string;
  overview: string;
  width: number;
  xRatio: number;
  yRatio: number;
  subnodes: SubNodeDefinition[];
};

type SubNodeDefinition = {
  description: string;
  dx: number;
  dy: number;
  id: string;
  label: string;
  width: number;
};

type NodePosition = {
  x: number;
  y: number;
};

const viewBoxWidth = 1600;
const viewBoxHeight = 900;
const centerPoint = { x: 800, y: 450 };

const rootNodes: RootNodeDefinition[] = [
  {
    id: "cctv",
    label: "CCTV",
    overview:
      "La videovigilancia conecta captura, analitica, grabacion y evidencia para responder con contexto operativo real.",
    width: 180,
    xRatio: 0.5,
    yRatio: 0.14,
    subnodes: [
      { id: "cctv-camaras", label: "Camaras IP", description: "Cobertura profesional por zonas.", dx: -220, dy: -110, width: 146 },
      { id: "cctv-analitica", label: "Analitica", description: "Cruce, intrusion y deteccion inteligente.", dx: 0, dy: -154, width: 138 },
      { id: "cctv-grabacion", label: "Grabacion", description: "NVR y servidores con retencion definida.", dx: 220, dy: -110, width: 146 },
      { id: "cctv-evidencia", label: "Evidencia", description: "Trazabilidad para incidentes y auditoria.", dx: 0, dy: 126, width: 140 },
    ],
  },
  {
    id: "acceso",
    label: "Control de acceso",
    overview:
      "El control de acceso cruza identidad, autorizacion y registro para proteger zonas sensibles y ordenar flujos.",
    width: 210,
    xRatio: 0.24,
    yRatio: 0.28,
    subnodes: [
      { id: "acceso-facial", label: "Facial", description: "Validacion biometrica de ingreso.", dx: -212, dy: -76, width: 120 },
      { id: "acceso-huella", label: "Huella", description: "Control confiable por usuario.", dx: -198, dy: 58, width: 124 },
      { id: "acceso-torniquetes", label: "Torniquetes", description: "Paso controlado en alto flujo.", dx: 0, dy: 146, width: 144 },
      { id: "acceso-auditoria", label: "Auditoria", description: "Historial y politicas por zona.", dx: 212, dy: 24, width: 132 },
    ],
  },
  {
    id: "alarmas",
    label: "Alarmas",
    overview:
      "Las alarmas permiten disparar acciones y correlacionar alertas con video, accesos y procedimientos de respuesta.",
    width: 170,
    xRatio: 0.76,
    yRatio: 0.28,
    subnodes: [
      { id: "alarmas-intrusion", label: "Intrusion", description: "Deteccion en zonas criticas.", dx: 214, dy: -74, width: 132 },
      { id: "alarmas-alertas", label: "Alertas", description: "Notificaciones y priorizacion.", dx: 206, dy: 52, width: 120 },
      { id: "alarmas-video", label: "Video asociado", description: "Contexto visual inmediato del evento.", dx: -38, dy: 146, width: 158 },
      { id: "alarmas-reglas", label: "Reglas", description: "Escenarios automaticos de respuesta.", dx: -214, dy: 18, width: 114 },
    ],
  },
  {
    id: "red",
    label: "Red y telecom",
    overview:
      "La capa de red sostiene disponibilidad, segmentacion y crecimiento por etapas para todos los sistemas conectados.",
    width: 184,
    xRatio: 0.17,
    yRatio: 0.62,
    subnodes: [
      { id: "red-fibra", label: "Fibra", description: "Backbone para enlaces de alta capacidad.", dx: -196, dy: -82, width: 110 },
      { id: "red-cableado", label: "Cableado", description: "Base fisica ordenada y documentada.", dx: -206, dy: 58, width: 132 },
      { id: "red-wifi", label: "WiFi", description: "Cobertura corporativa y movilidad.", dx: 0, dy: 152, width: 102 },
      { id: "red-switching", label: "Switching", description: "Core y acceso para operacion estable.", dx: 214, dy: 24, width: 142 },
    ],
  },
  {
    id: "salas",
    label: "Salas de control",
    overview:
      "Las salas de control concentran visualizacion, operadores y toma de decisiones para una operacion continua.",
    width: 204,
    xRatio: 0.83,
    yRatio: 0.62,
    subnodes: [
      { id: "salas-videowall", label: "Video wall", description: "Visualizacion central de multiples fuentes.", dx: 206, dy: -82, width: 136 },
      { id: "salas-consolas", label: "Consolas", description: "Ergonomia de operador y puestos dedicados.", dx: 214, dy: 58, width: 130 },
      { id: "salas-supervision", label: "Supervision", description: "Seguimiento 24/7 de eventos criticos.", dx: -18, dy: 152, width: 152 },
      { id: "salas-flujo", label: "Flujo operativo", description: "Procesos claros para responder mas rapido.", dx: -214, dy: 22, width: 162 },
    ],
  },
  {
    id: "consultoria",
    label: "Consultoria",
    overview:
      "La consultoria define arquitectura, alcance y fases para reducir riesgo antes de invertir en equipamiento.",
    width: 176,
    xRatio: 0.31,
    yRatio: 0.86,
    subnodes: [
      { id: "consultoria-levantamiento", label: "Levantamiento", description: "Revision tecnica del punto de partida.", dx: -186, dy: 72, width: 154 },
      { id: "consultoria-arquitectura", label: "Arquitectura", description: "Diseño integral de la solucion.", dx: 0, dy: 156, width: 144 },
      { id: "consultoria-fases", label: "Fases", description: "Crecimiento por etapas con control.", dx: 184, dy: 72, width: 104 },
      { id: "consultoria-especificacion", label: "Especificacion", description: "Equipamiento y criterios tecnicos claros.", dx: 0, dy: -134, width: 164 },
    ],
  },
  {
    id: "soporte",
    label: "Soporte TI",
    overview:
      "El soporte mantiene visibilidad, continuidad y mejora continua despues de la puesta en marcha.",
    width: 170,
    xRatio: 0.69,
    yRatio: 0.86,
    subnodes: [
      { id: "soporte-monitoreo", label: "Monitoreo", description: "Seguimiento de salud y disponibilidad.", dx: -186, dy: 72, width: 136 },
      { id: "soporte-firmware", label: "Firmware", description: "Actualizaciones controladas y trazables.", dx: 0, dy: 156, width: 132 },
      { id: "soporte-informes", label: "Informes", description: "Lectura periodica del estado tecnico.", dx: 186, dy: 72, width: 126 },
      { id: "soporte-sla", label: "SLA", description: "Acuerdos de respuesta y continuidad.", dx: 0, dy: -134, width: 94 },
    ],
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function scaleX(size: DiagramSize) {
  return size.width / viewBoxWidth;
}

function scaleY(size: DiagramSize) {
  return size.height / viewBoxHeight;
}

function rootWidth(definition: RootNodeDefinition, size: DiagramSize) {
  return clamp(definition.width * scaleX(size), 118, 214);
}

function subnodeWidth(definition: SubNodeDefinition, size: DiagramSize) {
  return clamp(definition.width * scaleX(size), 96, 170);
}

function createInitialPositions(size: DiagramSize) {
  const nextPositions: Record<string, NodePosition> = {};

  for (const node of rootNodes) {
    nextPositions[node.id] = {
      x: size.width * node.xRatio,
      y: size.height * node.yRatio,
    };
  }

  return nextPositions;
}

export function IntegrationSection() {
  const reduceMotion = useReducedMotion();
  const diagramRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);
  const prevSizeRef = useRef<DiagramSize | null>(null);
  const [ready, setReady] = useState(false);
  const [diagramSize, setDiagramSize] = useState<DiagramSize>({ width: viewBoxWidth, height: viewBoxHeight });
  const [positions, setPositions] = useState<Record<string, NodePosition>>({});
  const [selectedRootId, setSelectedRootId] = useState(rootNodes[0]?.id ?? "");
  const [selectedSubnodeId, setSelectedSubnodeId] = useState(rootNodes[0]?.subnodes[0]?.id ?? "");

  const selectedRoot = rootNodes.find((node) => node.id === selectedRootId) ?? rootNodes[0];
  const selectedSubnode =
    selectedRoot?.subnodes.find((node) => node.id === selectedSubnodeId) ?? selectedRoot?.subnodes[0] ?? null;

  const selectRoot = (nodeId: string) => {
    const nextRoot = rootNodes.find((node) => node.id === nodeId);
    setSelectedRootId(nodeId);
    setSelectedSubnodeId(nextRoot?.subnodes[0]?.id ?? "");
  };

  useEffect(() => {
    const element = diagramRef.current;
    if (!element) return;

    const syncPositions = () => {
      const nextSize = {
        width: element.clientWidth,
        height: element.clientHeight,
      };

      if (!nextSize.width || !nextSize.height) {
        return;
      }

      setDiagramSize(nextSize);
      setPositions((prev) => {
        const previousSize = prevSizeRef.current;

        if (!previousSize || Object.keys(prev).length === 0) {
          prevSizeRef.current = nextSize;
          return createInitialPositions(nextSize);
        }

        const xRatio = nextSize.width / previousSize.width;
        const yRatio = nextSize.height / previousSize.height;
        const nextPositions: Record<string, NodePosition> = {};

        for (const node of rootNodes) {
          const previousPosition = prev[node.id];
          nextPositions[node.id] = previousPosition
            ? {
                x: previousPosition.x * xRatio,
                y: previousPosition.y * yRatio,
              }
            : {
                x: nextSize.width * node.xRatio,
                y: nextSize.height * node.yRatio,
              };
        }

        prevSizeRef.current = nextSize;
        return nextPositions;
      });
      setReady(true);
    };

    syncPositions();
    const observer = new ResizeObserver(syncPositions);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const drag = dragState.current;
      const container = diagramRef.current;
      if (!drag || !container) return;

      const rect = container.getBoundingClientRect();
      const definition = rootNodes.find((node) => node.id === drag.id);
      if (!definition) return;

      const halfWidth = rootWidth(definition, diagramSize) / 2;
      const nextX = clamp(event.clientX - rect.left - drag.offsetX, halfWidth + 18, rect.width - halfWidth - 18);
      const nextY = clamp(event.clientY - rect.top - drag.offsetY, 62, rect.height - 62);

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
  }, [diagramSize]);

  const startDrag = (event: React.PointerEvent<HTMLButtonElement>, nodeId: string) => {
    const container = diagramRef.current;
    const node = positions[nodeId];
    if (!container || !node) return;

    const rect = container.getBoundingClientRect();
    dragState.current = {
      id: nodeId,
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
            title="Un grafo de dos fases para explorar como se conectan las capas"
            description="Haz click en una rama alrededor de Simple Core y aparece una segunda capa de subtemas. Las ramas principales tambien pueden moverse para reordenar el mapa visual."
          />
        </Reveal>

        <div className="mt-10 space-y-6">
          <Reveal>
            <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent-glow)]">
                  Rama activa
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-[color:var(--text-main)]">{selectedRoot.label}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[color:var(--text-secondary)]">{selectedRoot.overview}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {rootNodes.map((node) => (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => selectRoot(node.id)}
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        node.id === selectedRoot.id
                          ? "border-[color:rgba(34,211,238,0.42)] bg-[color:rgba(34,211,238,0.12)] text-[color:var(--text-main)]"
                          : "border-[color:var(--border)] bg-[color:rgba(255,255,255,0.02)] text-[color:var(--text-secondary)] hover:border-[color:rgba(34,211,238,0.26)] hover:text-[color:var(--text-main)]"
                      }`}
                    >
                      {node.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-[color:var(--border)] bg-[linear-gradient(165deg,rgba(19,29,43,0.78)_0%,rgba(16,23,34,0.92)_100%)] p-6 md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent-glow)]">
                  Segunda fase
                </p>
                <h4 className="mt-4 text-xl font-semibold text-[color:var(--text-main)]">
                  {selectedSubnode?.label ?? "Selecciona una subrama"}
                </h4>
                <p className="mt-4 text-sm leading-relaxed text-[color:var(--text-secondary)]">
                  {selectedSubnode?.description ?? "Cada rama despliega una segunda capa de conceptos tecnicos relacionados."}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {selectedRoot.subnodes.map((subnode) => (
                    <button
                      key={subnode.id}
                      type="button"
                      onClick={() => setSelectedSubnodeId(subnode.id)}
                      className={`rounded-2xl border px-4 py-4 text-left text-sm transition ${
                        subnode.id === selectedSubnode?.id
                          ? "border-[color:rgba(34,211,238,0.42)] bg-[color:rgba(34,211,238,0.12)] text-[color:var(--text-main)]"
                          : "border-[color:var(--border)] bg-[color:rgba(255,255,255,0.02)] text-[color:var(--text-secondary)] hover:border-[color:rgba(34,211,238,0.26)] hover:text-[color:var(--text-main)]"
                      }`}
                    >
                      {subnode.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(11,17,27,0.94),rgba(16,23,34,0.98))] p-3 md:p-4">
              <div
                ref={diagramRef}
                className="relative h-[420px] overflow-hidden rounded-[1.75rem] bg-[linear-gradient(165deg,rgba(19,29,43,0.9)_0%,rgba(16,23,34,0.98)_100%)] md:aspect-[16/9] md:h-auto"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.14),transparent_55%)]" aria-hidden />

                <div className="absolute inset-0 hidden md:block" aria-hidden>
                  <svg viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} className="h-full w-full">
                    {rootNodes.map((node) => {
                      const position = positions[node.id];
                      if (!position) return null;

                      const scaledX = (position.x / Math.max(diagramSize.width, 1)) * viewBoxWidth;
                      const scaledY = (position.y / Math.max(diagramSize.height, 1)) * viewBoxHeight;
                      const isSelected = node.id === selectedRoot.id;

                      return (
                        <g key={node.id}>
                          <line
                            x1={centerPoint.x}
                            y1={centerPoint.y}
                            x2={scaledX}
                            y2={scaledY}
                            stroke={isSelected ? "rgba(34,211,238,0.88)" : "rgba(167,180,198,0.2)"}
                            strokeWidth={isSelected ? "1.6" : "1.1"}
                            className={isSelected ? "integration-line" : undefined}
                          />
                          {!reduceMotion && isSelected ? (
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
                              }}
                            />
                          ) : null}
                        </g>
                      );
                    })}

                    {selectedRoot &&
                      selectedRoot.subnodes.map((subnode) => {
                        const rootPosition = positions[selectedRoot.id];
                        if (!rootPosition) return null;

                        const x = clamp(
                          rootPosition.x + subnode.dx * scaleX(diagramSize),
                          subnodeWidth(subnode, diagramSize) / 2 + 22,
                          diagramSize.width - subnodeWidth(subnode, diagramSize) / 2 - 22,
                        );
                        const y = clamp(
                          rootPosition.y + subnode.dy * scaleY(diagramSize),
                          68,
                          diagramSize.height - 68,
                        );
                        const scaledRootX = (rootPosition.x / Math.max(diagramSize.width, 1)) * viewBoxWidth;
                        const scaledRootY = (rootPosition.y / Math.max(diagramSize.height, 1)) * viewBoxHeight;
                        const scaledX = (x / Math.max(diagramSize.width, 1)) * viewBoxWidth;
                        const scaledY = (y / Math.max(diagramSize.height, 1)) * viewBoxHeight;
                        const isSelected = subnode.id === selectedSubnode?.id;

                        return (
                          <g key={subnode.id}>
                            <line
                              x1={scaledRootX}
                              y1={scaledRootY}
                              x2={scaledX}
                              y2={scaledY}
                              stroke={isSelected ? "rgba(34,211,238,0.82)" : "rgba(167,180,198,0.16)"}
                              strokeWidth={isSelected ? "1.3" : "0.95"}
                              className={isSelected ? "integration-line" : undefined}
                            />
                          </g>
                        );
                      })}
                  </svg>
                </div>

                <div className="absolute left-1/2 top-1/2 z-10 hidden w-[250px] -translate-x-1/2 -translate-y-1/2 md:block">
                  <motion.div
                    animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
                    transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                    className="rounded-[2rem] border border-[color:rgba(34,211,238,0.38)] bg-[linear-gradient(180deg,rgba(12,21,34,0.96)_0%,rgba(10,17,28,0.94)_100%)] px-6 py-7 text-center shadow-[0_24px_60px_-28px_rgba(34,211,238,0.52)]"
                  >
                    <Image
                      src="/simple-core-logo.svg"
                      alt="Simple Core"
                      width={210}
                      height={66}
                      className="mx-auto h-auto w-[170px]"
                    />
                    <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-[color:var(--accent-glow)]">
                      Operacion conectada
                    </p>
                  </motion.div>
                </div>

                <div className="relative hidden h-full md:block">
                  {ready &&
                    rootNodes.map((node) => {
                      const position = positions[node.id];
                      if (!position) return null;

                      const isSelected = node.id === selectedRoot.id;
                      const width = rootWidth(node, diagramSize);

                      return (
                        <motion.button
                          key={node.id}
                          type="button"
                          onClick={() => selectRoot(node.id)}
                          onPointerDown={(event) => startDrag(event, node.id)}
                          whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                          className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 touch-none rounded-xl border px-4 py-3 text-center text-[12px] font-medium leading-tight transition ${
                            isSelected
                              ? "border-[color:rgba(34,211,238,0.62)] bg-[color:rgba(34,211,238,0.14)] text-[color:var(--text-main)] shadow-[0_12px_34px_-20px_rgba(34,211,238,0.55)]"
                              : "border-[color:var(--border)] bg-[color:rgba(16,23,34,0.92)] text-[color:var(--text-secondary)] hover:border-[color:rgba(34,211,238,0.24)] hover:text-[color:var(--text-main)]"
                          }`}
                          style={{ left: `${position.x}px`, top: `${position.y}px`, width: `${width}px` }}
                        >
                          {node.label}
                        </motion.button>
                      );
                    })}

                  {ready &&
                    selectedRoot &&
                    selectedRoot.subnodes.map((subnode) => {
                      const rootPosition = positions[selectedRoot.id];
                      if (!rootPosition) return null;

                      const width = subnodeWidth(subnode, diagramSize);
                      const x = clamp(rootPosition.x + subnode.dx * scaleX(diagramSize), width / 2 + 20, diagramSize.width - width / 2 - 20);
                      const y = clamp(rootPosition.y + subnode.dy * scaleY(diagramSize), 68, diagramSize.height - 68);
                      const isSelected = subnode.id === selectedSubnode?.id;

                      return (
                        <motion.button
                          key={subnode.id}
                          type="button"
                          onClick={() => setSelectedSubnodeId(subnode.id)}
                          initial={reduceMotion ? undefined : { opacity: 0, scale: 0.88 }}
                          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                          transition={{ duration: 0.22, ease: "easeOut" }}
                          whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                          className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-2 text-center text-[11px] font-medium leading-tight transition ${
                            isSelected
                              ? "border-[color:rgba(34,211,238,0.62)] bg-[color:rgba(34,211,238,0.16)] text-[color:var(--text-main)]"
                              : "border-[color:rgba(255,255,255,0.08)] bg-[color:rgba(255,255,255,0.04)] text-[color:var(--text-secondary)] hover:border-[color:rgba(34,211,238,0.24)] hover:text-[color:var(--text-main)]"
                          }`}
                          style={{ left: `${x}px`, top: `${y}px`, width: `${width}px` }}
                        >
                          {subnode.label}
                        </motion.button>
                      );
                    })}
                </div>

                <div className="grid gap-3 p-4 md:hidden">
                  <div className="rounded-2xl border border-[color:rgba(34,211,238,0.42)] bg-[color:rgba(11,19,31,0.88)] px-4 py-5 text-center">
                    <Image
                      src="/simple-core-logo.svg"
                      alt="Simple Core"
                      width={190}
                      height={60}
                      className="mx-auto h-auto w-[148px]"
                    />
                    <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-[color:var(--accent-glow)]">
                      Operacion conectada
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {rootNodes.map((node) => (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => selectRoot(node.id)}
                        className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                          node.id === selectedRoot.id
                            ? "border-[color:rgba(34,211,238,0.42)] bg-[color:rgba(34,211,238,0.12)] text-[color:var(--text-main)]"
                            : "border-[color:var(--border)] bg-[color:rgba(16,23,34,0.92)] text-[color:var(--text-secondary)]"
                        }`}
                      >
                        {node.label}
                      </button>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-[color:var(--border)] bg-[color:rgba(16,23,34,0.92)] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-glow)]">
                      Segunda fase
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedRoot.subnodes.map((subnode) => (
                        <button
                          key={subnode.id}
                          type="button"
                          onClick={() => setSelectedSubnodeId(subnode.id)}
                          className={`rounded-full border px-3 py-2 text-xs transition ${
                            subnode.id === selectedSubnode?.id
                              ? "border-[color:rgba(34,211,238,0.42)] bg-[color:rgba(34,211,238,0.12)] text-[color:var(--text-main)]"
                              : "border-[color:var(--border)] bg-[color:rgba(255,255,255,0.02)] text-[color:var(--text-secondary)]"
                          }`}
                        >
                          {subnode.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
