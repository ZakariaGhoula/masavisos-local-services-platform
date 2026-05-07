import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Política de Privacidad — MasAvisos",
  description: "Política de privacidad de MasAvisos. Cómo tratamos tus datos personales.",
  alternates: { canonical: "https://masavisos.es/privacidad" },
  robots: { index: false },
};

// TODO: Revisión legal requerida por profesional especializado en RGPD en España.

export default function PrivacidadPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Privacidad" }]} />
      <section className="py-16 px-5">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-stone-900 mb-6">Política de Privacidad</h1>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-sm text-amber-800">
            ⚠️ Placeholder. Requiere revisión por especialista en RGPD y LOPDGDD antes de publicación en producción.
          </div>

          <div className="space-y-6 text-sm text-stone-600 leading-relaxed">
            <div>
              <h2 className="text-lg font-semibold text-stone-900 mb-2">1. Responsable del tratamiento</h2>
              <p>MasAvisos [datos del titular pendientes de completar] es el responsable del tratamiento de los datos personales recogidos a través de este sitio web y de las comunicaciones por WhatsApp.</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-stone-900 mb-2">2. Datos que recogemos</h2>
              <p>Recogemos únicamente los datos que el usuario nos facilita voluntariamente a través de WhatsApp: nombre, número de teléfono, descripción del servicio solicitado y ubicación aproximada.</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-stone-900 mb-2">3. Finalidad del tratamiento</h2>
              <p>Utilizamos tus datos para conectarte con profesionales disponibles en tu zona. No los cedemos a terceros salvo a los profesionales necesarios para prestar el servicio.</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-stone-900 mb-2">4. Base legal</h2>
              <p>El tratamiento se basa en la ejecución de los servicios solicitados por el usuario (art. 6.1.b RGPD) y, en su caso, en el consentimiento prestado.</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-stone-900 mb-2">5. Tus derechos</h2>
              <p>Tienes derecho de acceso, rectificación, supresión, portabilidad y oposición. Para ejercerlos, contacta por WhatsApp o al email indicado en el aviso legal.</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-stone-900 mb-2">6. WhatsApp</h2>
              <p>Las comunicaciones se realizan a través de WhatsApp (Meta Platforms Ireland Limited). Te recomendamos revisar la política de privacidad de WhatsApp para entender cómo gestionan tus datos de mensajería.</p>
            </div>
          </div>

          <p className="text-xs text-stone-400 mt-10">Última actualización: [fecha pendiente]</p>
        </div>
      </section>
    </>
  );
}
