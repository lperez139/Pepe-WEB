import type { Metadata, Viewport } from "next";
import { Manrope, Sora } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.simplecore.cl"),
  title: {
    default: "Integración tecnológica y seguridad electrónica para empresas | Simple Core",
    template: "%s | Simple Core",
  },
  description:
    "Integrador B2B especializado en cctv para empresas, videovigilancia IP, control de acceso biométrico, redes, cartelería digital, salas de control, UPS online y soporte de infraestructura tecnológica.",
  keywords: [
    "cctv para empresas",
    "videovigilancia ip",
    "control de acceso biométrico",
    "integración de sistemas de seguridad",
    "cableado estructurado",
    "fibra óptica",
    "digital signage",
    "salas de control",
    "ups online",
    "monitoreo tecnológico",
    "soporte de infraestructura tecnológica",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://www.simplecore.cl",
    siteName: "Simple Core",
    title: "Integración tecnológica y seguridad electrónica para empresas",
    description:
      "Diseño, implementación e integración de CCTV, control de acceso, redes, digital signage y monitoreo centralizado para infraestructura crítica.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Integración tecnológica y seguridad electrónica para empresas",
    description:
      "Soluciones B2B de videovigilancia IP, control de acceso biométrico, redes y continuidad operacional.",
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0F14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${manrope.variable} ${sora.variable} bg-[var(--bg)] text-[var(--text-main)] antialiased`}>
        {children}
      </body>
    </html>
  );
}

