import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import { faqs } from "@/lib/site-content";

export function FaqSection() {
  return (
    <section id="faq" className="section-spacing">
      <Container>
        <Reveal>
          <SectionIntro
            eyebrow="FAQ"
            title="Preguntas frecuentes sobre integración tecnológica y seguridad electronica"
            description="Respuestas para equipos de operaciónes, seguridad y TI que buscan soluciones escalables y soporte continuo."
          />
        </Reveal>
        <div className="mt-10 space-y-3">
          {faqs.map((faq, index) => (
            <Reveal key={faq.question} delay={0.03 * (index % 5)}>
              <details className="group rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
                <summary className="cursor-pointer list-none pr-8 text-base font-semibold text-[color:var(--text-main)] marker:content-none">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-secondary)]">{faq.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

