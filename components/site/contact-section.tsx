import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import { company } from "@/lib/site-content";

const projectTypes = [
  "CCTV para empresas",
  "Control de acceso biométrico",
  "Redes y cableado estructurado",
  "Cartelería digital",
  "Sala de control y monitoreo",
  "UPS online y respaldo",
  "Integración multiplataforma",
  "Soporte de infraestructura tecnológica",
];

export function ContactSection() {
  return (
    <section id="contacto" className="section-spacing border-y border-[color:var(--border)] bg-[color:rgba(16,23,34,0.48)]">
      <Container>
        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.9fr]">
          <Reveal>
            <SectionIntro
              eyebrow="Contacto"
              title="Conversemos tu proyecto de integración tecnológica"
              description="Solicita una evaluación técnica para definir alcance, riesgos y hoja de ruta de implementación. Respondemos rápido y con enfoque B2B."
            />
            <form className="mt-8 grid gap-4 rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 md:grid-cols-2 md:p-8">
              <Field label="Nombre" name="nombre" autoComplete="name" />
              <Field label="Empresa" name="empresa" autoComplete="organization" />
              <Field label="Cargo" name="cargo" autoComplete="organization-title" />
              <Field label="Email" name="email" type="email" autoComplete="email" />
              <Field label="Teléfono" name="telefono" type="tel" autoComplete="tel" />
              <div className="space-y-2">
                <label htmlFor="tipoProyecto" className="text-sm font-medium text-[color:var(--text-main)]">
                  Tipo de proyecto
                </label>
                <select
                  id="tipoProyecto"
                  name="tipoProyecto"
                  className="w-full rounded-xl border border-[color:var(--border)] bg-[color:rgba(10,15,20,0.7)] px-3 py-2.5 text-sm text-[color:var(--text-main)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-glow)]"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="mensaje" className="text-sm font-medium text-[color:var(--text-main)]">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={5}
                  className="w-full resize-y rounded-xl border border-[color:var(--border)] bg-[color:rgba(10,15,20,0.7)] px-3 py-2.5 text-sm text-[color:var(--text-main)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-glow)]"
                  placeholder="Cuántos sitios tienes, qué sistemas deseas integrar y cuál es la prioridad operativa."
                  required
                />
              </div>
              <button
                type="submit"
                className="md:col-span-2 inline-flex items-center justify-center rounded-xl border border-[color:var(--primary)] bg-[color:var(--primary)] px-6 py-3 text-sm font-semibold text-[color:var(--text-main)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-20px_rgba(34,211,238,0.64)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]"
              >
                Solicitar evaluación técnica
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.08}>
            <aside className="h-fit rounded-3xl border border-[color:var(--border)] bg-[linear-gradient(165deg,rgba(19,29,43,0.74)_0%,rgba(16,23,34,0.92)_100%)] p-7">
              <h3 className="text-xl font-semibold text-[color:var(--text-main)]">Contacto directo</h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-secondary)]">
                Equipo técnico-comercial especializado en proyectos de seguridad electrónica e infraestructura TI para
                empresas, industrias y edificios institucionales.
              </p>
              <dl className="mt-7 space-y-4 text-sm">
                <div>
                  <dt className="text-[color:var(--text-secondary)]">Teléfono</dt>
                  <dd className="mt-1 text-[color:var(--text-main)]">{company.phone}</dd>
                </div>
                <div>
                  <dt className="text-[color:var(--text-secondary)]">Email</dt>
                  <dd className="mt-1 text-[color:var(--text-main)]">{company.email}</dd>
                </div>
                <div>
                  <dt className="text-[color:var(--text-secondary)]">Cobertura</dt>
                  <dd className="mt-1 text-[color:var(--text-main)]">{company.location}</dd>
                </div>
              </dl>
              <div className="mt-8 rounded-2xl border border-[color:var(--border)] bg-[color:rgba(255,255,255,0.02)] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-glow)]">
                  Compromiso de respuesta
                </p>
                <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
                  Respuesta inicial en menos de 24 horas hábiles para evaluaciones, visitas técnicas y solicitudes de
                  cotización.
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
};

function Field({ label, name, type = "text", autoComplete }: FieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium text-[color:var(--text-main)]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-[color:var(--border)] bg-[color:rgba(10,15,20,0.7)] px-3 py-2.5 text-sm text-[color:var(--text-main)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-glow)]"
        required
      />
    </div>
  );
}

