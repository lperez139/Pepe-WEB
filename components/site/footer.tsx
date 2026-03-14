import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Brand } from "@/components/ui/brand";
import { company, navLinks } from "@/lib/site-content";

const featuredServices = [
  "Videovigilancia IP",
  "Control de acceso biométrico",
  "Integración de sistemas de seguridad",
  "Cableado estructurado y fibra óptica",
  "Salas de control",
  "Soporte de infraestructura tecnológica",
];

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--border)] bg-[color:rgba(10,15,20,0.96)] py-14">
      <Container>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <Brand
              className="text-[color:var(--text-main)]"
              logoClassName="h-10 w-auto"
              nameClassName="text-sm font-semibold tracking-[0.16em] text-[color:var(--text-main)]"
            />
            <p className="mt-4 text-sm leading-relaxed text-[color:var(--text-secondary)]">
              Integrador B2B especializado en cctv para empresas, control de acceso, redes, digital signage y
              monitoreo tecnológico para continuidad operacional.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[color:var(--text-main)]">Navegación</h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link className="text-sm text-[color:var(--text-secondary)] transition hover:text-[color:var(--text-main)]" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[color:var(--text-main)]">Servicios</h3>
            <ul className="mt-4 space-y-2">
              {featuredServices.map((service) => (
                <li key={service} className="text-sm text-[color:var(--text-secondary)]">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[color:var(--text-main)]">Contacto</h3>
            <ul className="mt-4 space-y-2 text-sm text-[color:var(--text-secondary)]">
              <li>{company.phone}</li>
              <li>{company.email}</li>
              <li>{company.location}</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-[color:var(--text-secondary)] transition hover:text-[color:var(--text-main)]"
              >
                LinkedIn
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-[color:var(--text-secondary)] transition hover:text-[color:var(--text-main)]"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[color:var(--border)] pt-6 text-xs text-[color:var(--text-secondary)]">
          <p>© {new Date().getFullYear()} {company.legalName}. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="#contacto" className="transition hover:text-[color:var(--text-main)]">
              Política de privacidad
            </Link>
            <Link href="#contacto" className="transition hover:text-[color:var(--text-main)]">
              Términos legales
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

