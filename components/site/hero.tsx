import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { compatiblePlatforms, trustPillars } from "@/lib/site-content";
import { HeroLogo } from "@/components/site/hero-logo";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      <div className="hero-grid absolute inset-0 -z-20" aria-hidden />
      <div className="hero-glow absolute inset-x-0 top-0 -z-10 h-[640px]" aria-hidden />
      <Container>
        <Reveal className="mb-8">
          <HeroLogo />
        </Reveal>
        <Reveal>
          <p className="mb-6 inline-flex rounded-full border border-[color:var(--border)] bg-[color:rgba(255,255,255,0.02)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent-glow)]">
            Integrador tecnológico B2B
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="max-w-5xl text-balance font-heading text-4xl font-semibold leading-[1.08] text-[color:var(--text-main)] md:text-6xl">
            Integración tecnológica, videovigilancia y control de acceso para empresas e infraestructura crítica
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-7 max-w-4xl text-pretty text-base leading-relaxed text-[color:var(--text-secondary)] md:text-xl">
            Diseñamos, implementamos y mantenemos soluciones de CCTV, control de acceso, redes, cartelería digital y
            monitoreo centralizado para entornos corporativos, industriales e institucionales.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href="#contacto">Solicitar cotización</ButtonLink>
            <ButtonLink href="#servicios" variant="secondary">
              Ver servicios
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-12">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {trustPillars.map((pillar) => (
              <div
                key={pillar}
                className="rounded-2xl border border-[color:var(--border)] bg-[color:rgba(16,23,34,0.6)] px-4 py-3 text-sm text-[color:var(--text-main)] backdrop-blur-sm"
              >
                {pillar}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.25} className="mt-10">
          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:rgba(16,23,34,0.5)] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
              Plataformas compatibles
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {compatiblePlatforms.map((platform) => (
                <span
                  key={platform}
                  className="rounded-full border border-[color:var(--border)] bg-[color:rgba(255,255,255,0.02)] px-3 py-1.5 text-xs text-[color:var(--text-secondary)]"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

