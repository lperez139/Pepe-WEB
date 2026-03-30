import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";

export function AboutSection() {
  return (
    <section id="nosotros" className="section-spacing border-y border-[color:var(--border)] bg-[color:rgba(16,23,34,0.45)]">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <SectionIntro
              eyebrow="Nosotros"
              title="Equipo técnico especializado en integración de infraestructura crítica"
              description="Trabajamos con enfoque de ingeniería para reducir riesgos de implementación y asegurar continuidad operacional en empresas, industrias y recintos institucionales."
            />
            <p className="mt-6 text-sm leading-relaxed text-[color:var(--text-secondary)]">
              Nuestra propuesta combina experiencia en cctv para empresas, videovigilancia IP, control de acceso
              biométrico, cableado estructurado, fibra óptica, salas de control y soporte de infraestructura
              tecnológica.
            </p>
            <div className="mt-7">
              <ButtonLink href="#contacto">Solicitar evaluación técnica</ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-[color:var(--border)] bg-[linear-gradient(165deg,rgba(19,29,43,0.76)_0%,rgba(16,23,34,0.92)_100%)] p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-glow)]">
                Enfoque de trabajo
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-[color:var(--text-main)]">
                Precisión técnica para operaciones que no pueden detenerse
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[color:var(--text-secondary)]">
                Ejecutamos proyectos de integración con metodología, control documental y estándares de calidad. Desde
                el diseño hasta el soporte, cada etapa prioriza seguridad, estabilidad y escalabilidad.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <Stat label="Proyectos B2B" value="+180" />
                <Stat label="Sedes integradas" value="+420" />
                <Stat label="Cobertura soporte" value="24/7" />
                <Stat label="Tiempo respuesta" value="<24h" />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[color:var(--border)] bg-[color:rgba(255,255,255,0.02)] px-4 py-3">
      <p className="text-lg font-semibold text-[color:var(--text-main)]">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.1em] text-[color:var(--text-secondary)]">{label}</p>
    </div>
  );
}

