import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import { processSteps } from "@/lib/site-content";

export function ProcessSection() {
  return (
    <section className="section-spacing border-y border-[color:var(--border)] bg-[color:rgba(16,23,34,0.42)]">
      <Container>
        <Reveal>
          <SectionIntro
            eyebrow="Proceso"
            title="Metodologia de trabajo para proyectos B2B de infraestructura crítica"
            description="Ejecutamos con control técnico, hitos claros y foco en continuidad operaciónal desde el primer dia."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <Reveal key={step.title} delay={0.06 * index}>
              <article className="relative h-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:rgba(34,211,238,0.4)] bg-[color:rgba(34,211,238,0.1)] text-sm font-semibold text-[color:var(--text-main)]">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-[color:var(--text-main)]">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-secondary)]">{step.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

