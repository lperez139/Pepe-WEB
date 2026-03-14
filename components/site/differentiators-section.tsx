import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import { differentiators } from "@/lib/site-content";

export function DifferentiatorsSection() {
  return (
    <section className="section-spacing">
      <Container>
        <Reveal>
          <SectionIntro
            eyebrow="Diferenciadores"
            title="Ejecucion técnica con foco en trazabilidad y continuidad"
            description="Combinamos vision de ingeniería, implementación controlada y soporte para que cada solucion aporte valor operativo real."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {differentiators.map((item, index) => (
            <Reveal key={item} delay={0.04 * index}>
              <article className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
                <h3 className="text-base font-semibold leading-relaxed text-[color:var(--text-main)]">{item}</h3>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

