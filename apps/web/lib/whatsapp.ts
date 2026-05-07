export const WA_NUMBER = "34612208911";
export const WA_NUMBER_DISPLAY = "+34 612 20 89 11";

export const WA_MSG_CLIENT =
  "Hola, necesito un profesional en Madrid. Mi aviso es:";

export const WA_MSG_PRO =
  "Hola, quiero darme de alta gratis en MasAvisos como profesional.";

export function getWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WA_NUMBER}?text=${encoded}`;
}

export const clientWhatsAppUrl = getWhatsAppUrl(WA_MSG_CLIENT);
export const proWhatsAppUrl = getWhatsAppUrl(WA_MSG_PRO);

export function getServiceWhatsAppUrl(service: string, city = "Madrid"): string {
  const msg = `Hola, necesito un ${service} en ${city}. Mi aviso es:`;
  return getWhatsAppUrl(msg);
}
