import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import { industries } from "@/lib/site-content";

export function IndustriesSection() {
  return (
    <section id="industrias" className="section-spacing border-y border-[color:var(--border)] bg-[color:rgba(16,23,34,0.42)]">
      <Container>
        <Reveal>
          <SectionIntro
            eyebrow="Industrias y casos de uso"
            title="Arquitecturas de seguridad y operación para entornos de alta exigencia"
            description="Disenamos soluciones segun riesgos reales: seguridad, continuidad operativa, trazabilidad, control y visibilidad para equipos de operaciónes, seguridad y TI."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {industries.map((industry, index) => (
            <Reveal key={industry.name} delay={0.04 * index}>
              <article className="h-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
                <h3 className="text-lg font-semibold text-[color:var(--text-main)]">{industry.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-secondary)]">{industry.pain}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

