import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";

const pillars = [
  {
    title: "Ingeniería y diseño",
    text: "Cada proyecto comienza con levantamiento técnico, arquitectura y criterios claros de continuidad operacional.",
  },
  {
    title: "Integración multiplataforma",
    text: "Conectamos CCTV, control de acceso, alarmas, redes y monitoreo para una operación centralizada y trazable.",
  },
  {
    title: "Escalabilidad",
    text: "Diseñamos soluciones para crecer por etapas, desde una sede hasta despliegues multisitio con estándares comunes.",
  },
  {
    title: "Soporte continuo",
    text: "Mantenimiento preventivo, soporte correctivo y monitoreo tecnológico para sostener disponibilidad y rendimiento.",
  },
];

export function ValueProposition() {
  return (
    <section className="section-spacing border-y border-[color:var(--border)] bg-[color:rgba(16,23,34,0.45)]">
      <Container>
        <Reveal>
          <SectionIntro
            eyebrow="Propuesta de valor"
            title="Soluciones conectadas para seguridad, operación y continuidad"
            description="No instalamos piezas sueltas. Diseñamos ecosistemas tecnológicos que se integran entre sí para reducir riesgo, mejorar visibilidad y sostener la continuidad del negocio."
          />
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={0.05 * index}>
              <article className="h-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
                <h3 className="text-xl font-semibold text-[color:var(--text-main)]">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-secondary)]">{pillar.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

