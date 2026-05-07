import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Política de Cookies — MasAvisos",
  description: "Política de cookies de MasAvisos. Qué cookies usamos y cómo gestionarlas.",
  alternates: { canonical: "https://masavisos.es/cookies" },
  robots: { index: false },
};

// TODO: Revisar con especialista legal antes de publicación. Adaptar a cookies reales utilizadas.

export default function CookiesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Cookies" }]} />
      <section className="py-16 px-5">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-stone-900 mb-6">Política de Cookies</h1>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-sm text-amber-800">
            ⚠️ Placeholder. Adaptar a las cookies realmente utilizadas y revisar con especialista legal antes de producción.
          </div>

          <div className="space-y-6 text-sm text-stone-600 leading-relaxed">
            <div>
              <h2 className="text-lg font-semibold text-stone-900 mb-2">¿Qué son las cookies?</h2>
              <p>Las cookies son pequeños archivos de texto que los sitios web guardan en tu dispositivo para mejorar tu experiencia de navegación.</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-stone-900 mb-2">Cookies que utilizamos</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse border border-stone-200 rounded-lg">
                  <thead>
                    <tr className="bg-stone-50">
                      <th className="border border-stone-200 px-3 py-2 text-left font-semibold text-stone-700">Nombre</th>
                      <th className="border border-stone-200 px-3 py-2 text-left font-semibold text-stone-700">Tipo</th>
                      <th className="border border-stone-200 px-3 py-2 text-left font-semibold text-stone-700">Finalidad</th>
                      <th className="border border-stone-200 px-3 py-2 text-left font-semibold text-stone-700">Duración</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-stone-200 px-3 py-2">[pendiente]</td>
                      <td className="border border-stone-200 px-3 py-2">Técnica</td>
                      <td className="border border-stone-200 px-3 py-2">Funcionamiento básico</td>
                      <td className="border border-stone-200 px-3 py-2">Sesión</td>
                    </tr>
                    <tr>
                      <td className="border border-stone-200 px-3 py-2">[pendiente]</td>
                      <td className="border border-stone-200 px-3 py-2">Analítica</td>
                      <td className="border border-stone-200 px-3 py-2">Estadísticas de uso</td>
                      <td className="border border-stone-200 px-3 py-2">1 año</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-stone-900 mb-2">Cómo gestionar las cookies</h2>
              <p>Puedes configurar tu navegador para rechazar o eliminar cookies. Ten en cuenta que algunas funcionalidades del sitio pueden verse afectadas.</p>
            </div>
          </div>

          <p className="text-xs text-stone-400 mt-10">Última actualización: [fecha pendiente]</p>
        </div>
      </section>
    </>
  );
}
