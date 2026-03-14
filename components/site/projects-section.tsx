import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import { projectHighlights } from "@/lib/site-content";

export function ProjectsSection() {
  return (
    <section id="proyectos" className="section-spacing">
      <Container>
        <Reveal>
          <SectionIntro
            eyebrow="Proyectos"
            title="Implementaciónes orientadas a impacto operaciónal medible"
            description="Ejemplos referenciales de proyectos donde combinamos ingeniería, integración de sistemás de seguridad y soporte continuo."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {projectHighlights.map((project, index) => (
            <Reveal key={project.title} delay={0.06 * index}>
              <article className="group h-full rounded-2xl border border-[color:var(--border)] bg-[linear-gradient(165deg,rgba(19,29,43,0.75)_0%,rgba(16,23,34,0.9)_100%)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[color:rgba(34,211,238,0.35)]">
                <div
                  aria-hidden
                  className="mb-5 h-36 rounded-xl border border-[color:var(--border)] bg-[radial-gradient(circle_at_70%_20%,rgba(34,211,238,0.3),transparent_45%),radial-gradient(circle_at_20%_80%,rgba(29,78,216,0.36),transparent_45%),linear-gradient(140deg,rgba(16,23,34,0.85),rgba(19,29,43,0.95))]"
                />
                <h3 className="text-xl font-semibold text-[color:var(--text-main)]">{project.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[color:var(--text-secondary)]">{project.result}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.scope.map((scope) => (
                    <span
                      key={scope}
                      className="rounded-full border border-[color:var(--border)] px-3 py-1.5 text-xs text-[color:var(--text-secondary)]"
                    >
                      {scope}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

