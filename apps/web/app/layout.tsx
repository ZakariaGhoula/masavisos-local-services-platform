import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://masavisos.es"),
  title: {
    default: "MasAvisos — Fontaneros, Electricistas y más en Madrid",
    template: "%s | MasAvisos",
  },
  description:
    "Encuentra fontaneros, electricistas, cerrajeros y pintores en Madrid. Envía tu aviso por WhatsApp y recibe respuesta rápida de profesionales locales.",
  keywords: ["fontanero Madrid", "electricista Madrid", "cerrajero Madrid", "pintor Madrid", "reformas Madrid"],
  authors: [{ name: "MasAvisos" }],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://masavisos.es",
    siteName: "MasAvisos",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
