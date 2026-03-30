import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import { clientLogos } from "@/lib/site-content";

export function ClientsSection() {
  return (
    <section id="clientes" className="section-spacing border-y border-[color:var(--border)] bg-[color:rgba(16,23,34,0.42)]">
      <Container>
        <Reveal>
          <SectionIntro
            eyebrow="Clientes"
            title="Empresas que trabajan con nosotros"
            description="Espacio preparado para exhibir logos de clientes y reforzar la confianza comercial en la portada."
          />
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {clientLogos.map((client, index) => (
            <Reveal key={client.id} delay={0.04 * index}>
              <article className="group flex min-h-[150px] items-center gap-4 rounded-2xl border border-[color:var(--border)] bg-[linear-gradient(160deg,rgba(19,29,43,0.8)_0%,rgba(16,23,34,0.9)_100%)] p-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[color:rgba(34,211,238,0.32)] bg-[color:rgba(34,211,238,0.08)] text-lg font-semibold tracking-[0.18em] text-[color:var(--text-main)]">
                  {client.mark}
                </div>
                <div>
                  <p className="text-lg font-semibold text-[color:var(--text-main)]">{client.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--text-secondary)]">
                    Placeholder listo para reemplazar por el logo final del cliente.
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
