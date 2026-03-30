import Image from "next/image";
import portadaImage from "@/assets/portada.jpg";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pb-18 pt-32 md:min-h-[92svh] md:pb-24 md:pt-36">
      <div className="absolute inset-0 -z-30">
        <Image
          src={portadaImage}
          alt="Portada tecnológica de monitoreo global y sistemas conectados"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(6,10,16,0.94)_0%,rgba(6,10,16,0.86)_35%,rgba(6,10,16,0.52)_62%,rgba(6,10,16,0.78)_100%)]" />
      <div className="hero-grid absolute inset-0 -z-10 opacity-20" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-52 bg-[linear-gradient(180deg,rgba(10,15,20,0)_0%,rgba(10,15,20,0.95)_100%)]" />

      <Container className="relative z-10">
        <div>
          <div className="max-w-4xl">
            <Reveal>
              <p className="mb-6 inline-flex rounded-full border border-[color:rgba(34,211,238,0.18)] bg-[color:rgba(7,13,20,0.55)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent-glow)] backdrop-blur-sm">
                Integrador tecnológico B2B
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="max-w-5xl text-balance font-heading text-4xl font-semibold leading-[1.04] text-[color:var(--text-main)] md:text-6xl xl:text-[4.5rem]">
                Integración tecnológica, videovigilancia y control de acceso para empresas e infraestructura crítica
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-3xl text-pretty text-base leading-relaxed text-[color:rgba(243,247,251,0.78)] md:text-xl">
                Diseñamos, implementamos y mantenemos soluciones de CCTV, control de acceso, redes y soporte tecnico
                para entornos corporativos, industriales e institucionales.
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
          </div>
        </div>
      </Container>
    </section>
  );
}
