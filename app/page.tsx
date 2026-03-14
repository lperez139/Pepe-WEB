import { AboutSection } from "@/components/site/about-section";
import { ContactSection } from "@/components/site/contact-section";
import { DifferentiatorsSection } from "@/components/site/differentiators-section";
import { FaqSection } from "@/components/site/faq-section";
import { Footer } from "@/components/site/footer";
import { GlobalBackgroundFollower } from "@/components/site/global-background-follower";
import { Hero } from "@/components/site/hero";
import { IndustriesSection } from "@/components/site/industries-section";
import { IntegrationSection } from "@/components/site/integration-section";
import { LiveSystemsDashboard } from "@/components/site/live-systems-dashboard";
import { Navbar } from "@/components/site/navbar";
import { ProcessSection } from "@/components/site/process-section";
import { ServicesSection } from "@/components/site/services-section";
import { ValueProposition } from "@/components/site/value-proposition";
import { company, faqs, services } from "@/lib/site-content";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  legalName: company.legalName,
  url: company.url,
  email: company.email,
  telephone: company.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Santiago",
    addressCountry: "CL",
  },
  areaServed: ["Chile", "Latinoamérica"],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Integración tecnológica y seguridad electrónica para empresas",
  provider: {
    "@type": "Organization",
    name: company.name,
    url: company.url,
  },
  areaServed: "Chile",
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Empresas, industrias, edificios corporativos e infraestructura crítica",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de integración tecnológica B2B",
    itemListElement: services.map((service, index) => ({
      "@type": "Offer",
      position: index + 1,
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
      },
    })),
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: company.name,
  url: company.url,
  telephone: company.phone,
  email: company.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Santiago",
    addressCountry: "CL",
  },
  areaServed: "Chile",
  priceRange: "$$",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function Home() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[var(--primary)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[var(--text-main)]"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <GlobalBackgroundFollower />
      <main id="contenido" className="relative z-10">
        <Hero />
        <LiveSystemsDashboard />
        <ValueProposition />
        <ServicesSection />
        <IndustriesSection />
        <IntegrationSection />
        <ProcessSection />
        <DifferentiatorsSection />
        <AboutSection />
        <FaqSection />
        <ContactSection />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}

