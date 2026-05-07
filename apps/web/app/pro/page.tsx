"use client";
import {useState} from "react";

const WA_ICON = (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" style={{flexShrink: 0}}>
        <path
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
);


const S: Record<string, React.CSSProperties> = {
    sectionTag: {
        fontSize: "0.75rem",
        fontWeight: 600,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "var(--yellow)",
        marginBottom: "0.8rem"
    },
    h2: {
        fontFamily: "'Syne',sans-serif",
        fontWeight: 800,
        fontSize: "clamp(2rem,4vw,3rem)",
        letterSpacing: "-0.02em",
        lineHeight: 1.05,
        marginBottom: "0.8rem"
    },
    sectionDesc: {
        fontSize: "1rem",
        color: "rgba(245,243,238,0.5)",
        maxWidth: "50ch",
        fontWeight: 300,
        lineHeight: 1.6,
        marginBottom: "3rem"
    },
};

export default function ProPage() {
    const [submitted, setSubmitted] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState(false);


    const APPS_SCRIPT_URL = `${process.env.NEXT_PUBLIC_APPS_SCRIPT_URL}`;
    const SUPABASE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}`;
    const SUPABASE_KEY = `${process.env.NEXT_PUBLIC_SUPABASE_KEY}`;
    const SLACK_WEBHOOK = `${process.env.NEXT_PUBLIC_SLACK_WEBHOOK}`;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSending(true);
        setError(false);
        const form = e.currentTarget;
        const payload = {
            nombre: (form.querySelector('#nombre') as HTMLInputElement).value,
            whatsapp: (form.querySelector('#whatsapp') as HTMLInputElement).value,
            oficio: (form.querySelector('#oficio') as HTMLSelectElement).value,
            zona: (form.querySelector('#zona') as HTMLSelectElement).value,
            experiencia: (form.querySelector('#experiencia') as HTMLSelectElement).value,
        };
        try {
            await Promise.allSettled([
                fetch(APPS_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(payload)
                }),
                fetch(`${SUPABASE_URL}/rest/v1/pro_applicants`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'apikey': SUPABASE_KEY, 'Prefer': 'return=minimal'},
                    body: JSON.stringify(payload)
                }),
            ]);
            fetch(SLACK_WEBHOOK, {
                method: 'POST',
                mode: 'no-cors',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({text: `🆕 *Nuevo profesional* (vía /pro)\n👤 ${payload.nombre}\n📱 ${payload.whatsapp}\n🔧 ${payload.oficio}\n📍 ${payload.zona}\n⏱ ${payload.experiencia}`})
            });
            setSubmitted(true);
        } catch {
            setError(true);
        }
        setSending(false);
    }

    return (
        <>
            {/* ── HERO ── */}
            <div style={{
                minHeight: "90vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "8rem 2.5rem 5rem",
                position: "relative",
                overflow: "hidden"
            }}>
                <div aria-hidden="true" style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    background: "radial-gradient(ellipse 60% 55% at 70% 30%, rgba(255,209,0,0.09) 0%, transparent 70%), radial-gradient(ellipse 35% 35% at 10% 80%, rgba(255,209,0,0.04) 0%, transparent 60%)"
                }}/>
                <div style={{
                    maxWidth: 1080,
                    margin: "0 auto",
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "5rem",
                    alignItems: "center"
                }} className="hero-inner">

                    {/* Left */}
                    <div className="animate-fade-up">
                        <div className="animate-fade-up" style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontSize: "0.78rem",
                            fontWeight: 500,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "var(--yellow)",
                            border: "1px solid rgba(255,209,0,0.3)",
                            padding: "0.4rem 1rem",
                            borderRadius: "100px",
                            marginBottom: "1.8rem",
                            width: "fit-content"
                        }}>
                            <span className="pulse-dot" style={{
                                width: 6,
                                height: 6,
                                background: "var(--yellow)",
                                borderRadius: "50%",
                                display: "inline-block"
                            }} aria-hidden="true"/>
                            Madrid · 32 profesionales activos
                        </div>
                        <h1 className="animate-fade-up-1" style={{
                            fontFamily: "'Syne',sans-serif",
                            fontWeight: 800,
                            fontSize: "clamp(2.4rem,5vw,4rem)",
                            lineHeight: 1.0,
                            letterSpacing: "-0.03em"
                        }}>
                            Recibe clientes<br/><em style={{fontStyle: "normal", color: "var(--yellow)"}}>por
                            WhatsApp.</em>
                        </h1>
                        <p className="animate-fade-up-2" style={{
                            fontSize: "clamp(0.95rem,1.8vw,1.05rem)",
                            color: "rgba(245,243,238,0.5)",
                            maxWidth: "44ch",
                            marginTop: "1.3rem",
                            fontWeight: 300,
                            lineHeight: 1.65
                        }}>
                            Solicitudes reales de clientes en Madrid. Con barrio, urgencia y descripción. Respondes
                            desde tu móvil y decides el precio.
                        </p>
                        <div className="animate-fade-up-3"
                             style={{display: "flex", gap: "1.5rem", flexWrap: "wrap", marginTop: "2.2rem"}}>
                            {["Gratis durante el lanzamiento", "Sin comisiones", "Solo WhatsApp", "Solo Madrid"].map(p => (
                                <span key={p} style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.4rem",
                                    fontSize: "0.85rem",
                                    color: "rgba(245,243,238,0.45)"
                                }}>
                  <span style={{color: "var(--yellow)", fontWeight: 700}}>✓</span>{p}
                </span>
                            ))}
                        </div>
                        <a href="#registro" className="animate-fade-up-3" style={{
                            display: "inline-block",
                            background: "var(--yellow)",
                            color: "var(--black)",
                            fontFamily: "'Syne',sans-serif",
                            fontWeight: 700,
                            fontSize: "1rem",
                            padding: "1rem 2.2rem",
                            borderRadius: "100px",
                            textDecoration: "none",
                            marginTop: "2.2rem",
                            transition: "transform 0.2s, box-shadow 0.2s"
                        }}
                           onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
                           onMouseLeave={e => (e.currentTarget.style.transform = "")}>
                            Quiero clientes →
                        </a>
                    </div>

                    {/* Right — Lead preview */}
                    <div className="animate-fade-up-3 lead-preview-desktop">
                        <p style={{
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "rgba(245,243,238,0.25)",
                            marginBottom: "0.8rem"
                        }}>Así llegan los avisos a tu móvil</p>
                        {[
                            {
                                oficio: "🔧 Fontanero",
                                urgencia: "Urgente",
                                urgClass: "alta",
                                desc: "Fuga de agua bajo el fregadero. Necesito solución hoy, hay agua en el suelo.",
                                zona: "Chamberí",
                                time: "Hace 2 min"
                            },
                            {
                                oficio: "⚡ Electricista",
                                urgencia: "Esta semana",
                                urgClass: "normal",
                                desc: "Necesito instalar 3 enchufes nuevos en el salón y revisar el cuadro eléctrico.",
                                zona: "Salamanca",
                                time: "Hace 8 min"
                            },
                            {
                                oficio: "🏠 Reformas",
                                urgencia: "Sin prisa",
                                urgClass: "normal",
                                desc: "Quiero reformar el baño completo. Busco presupuesto para azulejos y fontanería.",
                                zona: "Retiro",
                                time: "Hace 15 min"
                            },
                        ].map((lead, i) => (
                            <div key={i} style={{
                                background: "var(--gray)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                borderRadius: 16,
                                padding: "1.5rem",
                                marginBottom: "0.8rem",
                                position: "relative",
                                overflow: "hidden"
                            }}>
                                <div aria-hidden="true" style={{
                                    position: "absolute",
                                    left: 0,
                                    top: 0,
                                    bottom: 0,
                                    width: 3,
                                    background: "var(--yellow)"
                                }}/>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    marginBottom: "0.6rem"
                                }}>
                                    <span style={{
                                        fontFamily: "'Syne',sans-serif",
                                        fontWeight: 700,
                                        fontSize: "0.95rem"
                                    }}>{lead.oficio}</span>
                                    <span style={{
                                        fontSize: "0.7rem",
                                        fontWeight: 600,
                                        letterSpacing: "0.07em",
                                        textTransform: "uppercase",
                                        padding: "0.2rem 0.7rem",
                                        borderRadius: "100px",
                                        background: lead.urgClass === "alta" ? "rgba(255,80,80,0.15)" : "rgba(255,209,0,0.1)",
                                        color: lead.urgClass === "alta" ? "#ff8080" : "var(--yellow)"
                                    }}>{lead.urgencia}</span>
                                </div>
                                <p style={{
                                    fontSize: "0.85rem",
                                    color: "rgba(245,243,238,0.55)",
                                    lineHeight: 1.5,
                                    marginBottom: "0.6rem"
                                }}>{lead.desc}</p>
                                <div style={{
                                    display: "flex",
                                    gap: "1rem",
                                    fontSize: "0.78rem",
                                    color: "rgba(245,243,238,0.35)"
                                }}>
                                    <span>📍 {lead.zona}</span><span>🕐 {lead.time}</span>
                                </div>
                            </div>
                        ))}
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontSize: "0.78rem",
                            color: "rgba(245,243,238,0.3)",
                            marginTop: "0.5rem"
                        }}>
                            <span style={{
                                width: 6,
                                height: 6,
                                background: "#25D366",
                                borderRadius: "50%",
                                display: "inline-block",
                                animation: "pulse 2s infinite"
                            }}/>
                            Nuevas solicitudes entrando ahora
                        </div>
                    </div>
                </div>
            </div>

            {/* ── MARQUEE ── */}
            <div style={{
                overflow: "hidden",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                padding: "1rem 0",
                background: "rgba(255,209,0,0.03)"
            }}>
                <div style={{
                    display: "flex",
                    gap: "3rem",
                    animation: "marquee 22s linear infinite",
                    whiteSpace: "nowrap",
                    width: "max-content"
                }}>
                    {["Fontaneros", "Electricistas", "Cerrajeros", "Pintores", "Reformas", "Albañiles", "Cristaleros", "Aire acondicionado", "Fontaneros", "Electricistas", "Cerrajeros", "Pintores", "Reformas", "Albañiles", "Cristaleros", "Aire acondicionado"].map((item, i) => (
                        <span key={i} style={{
                            fontFamily: "'Syne',sans-serif",
                            fontWeight: 600,
                            fontSize: "0.85rem",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "rgba(245,243,238,0.25)"
                        }}>
              {item}<span style={{color: "var(--yellow)", marginRight: "3rem"}}> ·</span>
            </span>
                    ))}
                </div>
            </div>

            {/* ── STEPS ── */}
            <div style={{padding: "6rem 2.5rem", maxWidth: 1080, margin: "0 auto"}}>
                <div style={S.sectionTag}>Proceso</div>
                <h2 style={S.h2}>4 pasos. Nada más.</h2>
                <p style={S.sectionDesc}>Sin apps, sin plataformas complicadas. Si sabes usar WhatsApp, sabes usar
                    MasAvisos.</p>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                    gap: "1.5px",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 16,
                    overflow: "hidden"
                }}>
                    {[
                        {
                            num: "01",
                            title: "Te registras",
                            desc: "Rellenas el formulario con tu oficio y tu zona. Gratis. Sin tarjeta. En menos de 5 minutos.",
                            tag: "Gratis",
                            tagStyle: {background: "rgba(37,211,102,0.1)", color: "#25D366"}
                        },
                        {
                            num: "02",
                            title: "Un cliente necesita ayuda",
                            desc: 'Alguien en tu zona escribe buscando un profesional. Ej: "Fuga de agua en cocina, Chamberí, urgente hoy".'
                        },
                        {
                            num: "03",
                            title: "Te llega al instante",
                            desc: "Recibes el aviso por WhatsApp con barrio, urgencia y descripción del trabajo. Sin intermediarios.",
                            tag: "En minutos",
                            tagStyle: {background: "rgba(255,209,0,0.1)", color: "var(--yellow)"}
                        },
                        {
                            num: "04",
                            title: "Tú pones el precio",
                            desc: "Respondes con tu presupuesto directamente al cliente. Si acepta, el trabajo es tuyo. Sin comisiones."
                        },
                    ].map(step => (
                        <div key={step.num} className="step-card" style={{
                            background: "var(--black)",
                            padding: "2.5rem 2rem",
                            transition: "background 0.3s"
                        }}>
                            <div style={{
                                fontFamily: "'Syne',sans-serif",
                                fontSize: "3rem",
                                fontWeight: 800,
                                color: "rgba(255,209,0,0.15)",
                                lineHeight: 1,
                                marginBottom: "1rem"
                            }}>{step.num}</div>
                            <h3 style={{
                                fontFamily: "'Syne',sans-serif",
                                fontWeight: 700,
                                fontSize: "1.05rem",
                                marginBottom: "0.5rem"
                            }}>{step.title}</h3>
                            <p style={{
                                fontSize: "0.88rem",
                                color: "rgba(245,243,238,0.5)",
                                lineHeight: 1.55
                            }}>{step.desc}</p>
                            {step.tag && <span style={{
                                display: "inline-block",
                                marginTop: "0.9rem",
                                fontSize: "0.72rem",
                                fontWeight: 600,
                                letterSpacing: "0.07em",
                                textTransform: "uppercase",
                                padding: "0.25rem 0.8rem",
                                borderRadius: "100px", ...step.tagStyle
                            }}>{step.tag}</span>}
                        </div>
                    ))}
                </div>
            </div>

            {/* ── BENEFITS ── */}
            <div style={{
                background: "rgba(255,255,255,0.02)",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                borderBottom: "1px solid rgba(255,255,255,0.05)"
            }}>
                <div style={{padding: "6rem 2.5rem", maxWidth: 1080, margin: "0 auto"}}>
                    <div style={S.sectionTag}>Por qué MasAvisos</div>
                    <h2 style={S.h2}>Lo que ganas.</h2>
                    <p style={S.sectionDesc}>Pensado para profesionales que quieren más trabajos reales, menos llamadas
                        inútiles y cero complicaciones.</p>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
                        gap: "1.5rem"
                    }}>
                        {[
                            {
                                icon: "⚡",
                                title: "Avisos inmediatos",
                                desc: "Clientes que necesitan ayuda ahora. No pierdes tiempo buscando trabajo — el trabajo te encuentra a ti."
                            },
                            {
                                icon: "📲",
                                title: "Todo por WhatsApp",
                                desc: "Sin apps nuevas, sin registros complicados. Recibes y respondes desde tu móvil de siempre."
                            },
                            {
                                icon: "🎯",
                                title: "Clientes listos para contratar",
                                desc: "El cliente ya ha descrito su problema. Llegas sabiendo qué necesita, dónde y cuándo."
                            },
                            {
                                icon: "🔄",
                                title: "Reparto justo",
                                desc: "El sistema rota los leads entre profesionales. Nadie acapara el trabajo. Todos tienen su oportunidad."
                            },
                            {
                                icon: "📍",
                                title: "Tu zona, tus clientes",
                                desc: "Solo recibes solicitudes del barrio donde trabajas. Sin desplazamientos innecesarios ni tiempo perdido."
                            },
                            {
                                icon: "💰",
                                title: "Tú pones el precio",
                                desc: "Nadie te fija tarifas ni se lleva comisión. Respondes con lo que consideras justo. Tú mandas."
                            },
                        ].map(b => (
                            <div key={b.title} style={{
                                background: "var(--gray)",
                                border: "1px solid rgba(255,255,255,0.07)",
                                borderLeft: "3px solid var(--yellow)",
                                borderRadius: 12,
                                padding: "2rem",
                                transition: "transform 0.3s"
                            }}
                                 onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
                                 onMouseLeave={e => (e.currentTarget.style.transform = "")}>
                                <div style={{fontSize: "1.5rem", marginBottom: "0.8rem"}}>{b.icon}</div>
                                <h3 style={{
                                    fontFamily: "'Syne',sans-serif",
                                    fontWeight: 700,
                                    fontSize: "1rem",
                                    marginBottom: "0.4rem"
                                }}>{b.title}</h3>
                                <p style={{
                                    fontSize: "0.88rem",
                                    color: "rgba(245,243,238,0.5)",
                                    lineHeight: 1.5
                                }}>{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── PRICING ── */}
            <div style={{
                background: "var(--dark)",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                borderBottom: "1px solid rgba(255,255,255,0.06)"
            }}>
                <div style={{
                    maxWidth: 1080,
                    margin: "0 auto",
                    padding: "6rem 2.5rem",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "4rem",
                    alignItems: "center"
                }} className="pricing-inner">
                    <div>
                        <div style={S.sectionTag}>Precio</div>
                        <h2 style={S.h2}>Ahora gratis.<br/>Siempre justo.</h2>
                        <p style={{
                            fontSize: "1rem",
                            color: "rgba(245,243,238,0.5)",
                            lineHeight: 1.7,
                            maxWidth: "40ch",
                            marginTop: "0.8rem"
                        }}>Gratis durante el lanzamiento. Más adelante, una cuota mensual simple por recibir clientes.
                            Sin comisiones, sin sorpresas.</p>
                        <ul style={{marginTop: "2rem", display: "flex", flexDirection: "column", gap: "0.7rem"}}>
                            {["Avisos ilimitados durante el lanzamiento", "Sin comisión por trabajo cerrado", "Cuota futura comunicada con antelación", "Puedes darte de baja cuando quieras"].map(item => (
                                <li key={item} style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.6rem",
                                    fontSize: "0.9rem",
                                    color: "rgba(245,243,238,0.6)",
                                    listStyle: "none"
                                }}>
                                    <span
                                        style={{color: "var(--yellow)", fontWeight: 700, flexShrink: 0}}>✓</span>{item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div style={{
                        background: "var(--yellow)",
                        color: "var(--black)",
                        borderRadius: 16,
                        padding: "3rem 2.5rem",
                        textAlign: "center"
                    }}>
                        <div style={{
                            display: "inline-block",
                            background: "var(--black)",
                            color: "var(--yellow)",
                            fontFamily: "'Syne',sans-serif",
                            fontWeight: 700,
                            fontSize: "0.75rem",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            padding: "0.3rem 0.9rem",
                            borderRadius: "100px",
                            marginBottom: "1.5rem"
                        }}>Fase lanzamiento
                        </div>
                        <div style={{
                            fontFamily: "'Syne',sans-serif",
                            fontWeight: 800,
                            fontSize: "5rem",
                            lineHeight: 1,
                            marginBottom: "0.2rem"
                        }}>0€
                        </div>
                        <div style={{fontSize: "0.9rem", color: "rgba(0,0,0,0.55)", marginBottom: "2rem"}}>por mes ·
                            acceso completo
                        </div>
                        <div style={{
                            borderTop: "1.5px solid rgba(0,0,0,0.15)",
                            paddingTop: "1.5rem",
                            fontSize: "0.9rem",
                            color: "rgba(0,0,0,0.65)",
                            lineHeight: 1.6
                        }}>
                            Después del lanzamiento:
                            <strong style={{
                                display: "block",
                                fontFamily: "'Syne',sans-serif",
                                fontWeight: 700,
                                fontSize: "1rem",
                                color: "var(--black)",
                                marginTop: "0.3rem"
                            }}>cuota mensual reducida</strong>
                            a confirmar según ciudad y oficio
                        </div>
                    </div>
                </div>
            </div>

            {/* ── FORM ── */}
            <div id="registro" style={{
                background: "rgba(255,255,255,0.02)",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                padding: "6rem 2.5rem"
            }}>
                <div style={{
                    background: "var(--gray)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 20,
                    padding: "3.5rem",
                    maxWidth: 680,
                    margin: "0 auto"
                }}>
                    {!submitted ? (
                        <>
                            <div style={S.sectionTag}>Registro</div>
                            <p style={{
                                marginBottom: "1.2rem",
                                fontSize: "0.9rem",
                                color: "var(--yellow)",
                                fontWeight: 600
                            }}>Buscamos los primeros 50 profesionales activos en Madrid</p>
                            <h2 style={{...S.h2, marginBottom: "0.4rem"}}>Empieza a recibir clientes</h2>
                            <p style={{...S.sectionDesc, marginBottom: "2rem"}}>Alta en menos de 5 minutos. Te
                                contactamos por WhatsApp.</p>
                            {error && <div style={{
                                background: "rgba(255,80,80,0.1)",
                                border: "1px solid rgba(255,80,80,0.3)",
                                borderRadius: 10,
                                padding: "0.8rem 1rem",
                                fontSize: "0.85rem",
                                color: "#ff8080",
                                marginBottom: "1rem"
                            }}>Algo ha fallado. Por favor inténtalo de nuevo.</div>}
                            <form onSubmit={handleSubmit}>
                                <div style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: "1rem",
                                    marginBottom: "1rem"
                                }} className="form-row">
                                    {[{
                                        id: "nombre",
                                        label: "Nombre",
                                        type: "text",
                                        placeholder: "Juan García"
                                    }, {
                                        id: "whatsapp",
                                        label: "WhatsApp",
                                        type: "tel",
                                        placeholder: "+34 612 345 678"
                                    }].map(f => (
                                        <div key={f.id}
                                             style={{display: "flex", flexDirection: "column", gap: "0.35rem"}}>
                                            <label htmlFor={f.id} style={{
                                                fontSize: "0.8rem",
                                                fontWeight: 500,
                                                color: "rgba(245,243,238,0.5)",
                                                letterSpacing: "0.04em",
                                                textTransform: "uppercase"
                                            }}>{f.label}</label>
                                            <input id={f.id} type={f.type} placeholder={f.placeholder} required style={{
                                                background: "rgba(255,255,255,0.05)",
                                                border: "1px solid rgba(255,255,255,0.1)",
                                                borderRadius: 10,
                                                padding: "0.85rem 1rem",
                                                color: "var(--white)",
                                                fontFamily: "'DM Sans',sans-serif",
                                                fontSize: "0.95rem",
                                                outline: "none",
                                                width: "100%"
                                            }}/>
                                        </div>
                                    ))}
                                </div>
                                <div style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: "1rem",
                                    marginBottom: "1rem"
                                }} className="form-row">
                                    <div style={{display: "flex", flexDirection: "column", gap: "0.35rem"}}>
                                        <label htmlFor="oficio" style={{
                                            fontSize: "0.8rem",
                                            fontWeight: 500,
                                            color: "rgba(245,243,238,0.5)",
                                            letterSpacing: "0.04em",
                                            textTransform: "uppercase"
                                        }}>Oficio</label>
                                        <select id="oficio" required style={{
                                            background: "rgba(255,255,255,0.05)",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                            borderRadius: 10,
                                            padding: "0.85rem 1rem",
                                            color: "var(--white)",
                                            fontFamily: "'DM Sans',sans-serif",
                                            fontSize: "0.95rem",
                                            outline: "none",
                                            width: "100%",
                                            WebkitAppearance: "none"
                                        }}>
                                            <option value="" disabled>Tu oficio</option>
                                            <optgroup label="Urgencias">
                                                <option>Fontanero</option>
                                                <option>Electricista</option>
                                                <option>Cerrajero</option>
                                            </optgroup>
                                            <optgroup label="Trabajos frecuentes">
                                                <option>Pintor</option>
                                                <option>Albañil</option>
                                                <option>Reformas generales</option>
                                                <option>Instalador aire acondicionado</option>
                                                <option>Carpintero</option>
                                                <option>Montador de muebles</option>
                                            </optgroup>
                                            <optgroup label="Especializados">
                                                <option>Cristalero</option>
                                                <option>Persianista</option>
                                                <option>Antenista</option>
                                                <option>Técnico electrodomésticos</option>
                                                <option>Domótica</option>
                                                <option>Pladur / Yeso</option>
                                                <option>Impermeabilización</option>
                                                <option>Suelos / Parquet</option>
                                                <option>Cocinas y baños</option>
                                            </optgroup>
                                            <option>Manitas</option>
                                            <option>Otro</option>
                                        </select>
                                    </div>
                                    <div style={{display: "flex", flexDirection: "column", gap: "0.35rem"}}>
                                        <label htmlFor="zona" style={{
                                            fontSize: "0.8rem",
                                            fontWeight: 500,
                                            color: "rgba(245,243,238,0.5)",
                                            letterSpacing: "0.04em",
                                            textTransform: "uppercase"
                                        }}>Zona de trabajo</label>
                                        <select id="zona" required style={{
                                            background: "rgba(255,255,255,0.05)",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                            borderRadius: 10,
                                            padding: "0.85rem 1rem",
                                            color: "var(--white)",
                                            fontFamily: "'DM Sans',sans-serif",
                                            fontSize: "0.95rem",
                                            outline: "none",
                                            width: "100%",
                                            WebkitAppearance: "none"
                                        }}>
                                            <option value="" disabled>Selecciona una zona</option>
                                            <option>Toda Madrid</option>
                                            <optgroup label="Madrid Centro">
                                                <option>Toda Madrid Centro</option>
                                                <option>Centro</option>
                                            </optgroup>
                                            <optgroup label="Madrid Norte">
                                                <option>Toda Madrid Norte</option>
                                                <option>Chamartín</option>
                                                <option>Tetuán</option>
                                                <option>Fuencarral - El Pardo</option>
                                            </optgroup>
                                            <optgroup label="Madrid Noreste">
                                                <option>Toda Madrid Noreste</option>
                                                <option>Salamanca</option>
                                                <option>Retiro</option>
                                                <option>Ciudad Lineal</option>
                                                <option>Hortaleza</option>
                                                <option>San Blas - Canillejas</option>
                                                <option>Barajas</option>
                                            </optgroup>
                                            <optgroup label="Madrid Noroeste">
                                                <option>Toda Madrid Noroeste</option>
                                                <option>Chamberí</option>
                                                <option>Arganzuela</option>
                                            </optgroup>
                                            <optgroup label="Madrid Oeste">
                                                <option>Toda Madrid Oeste</option>
                                                <option>Moncloa - Aravaca</option>
                                                <option>Latina</option>
                                            </optgroup>
                                            <optgroup label="Madrid Sur">
                                                <option>Toda Madrid Sur</option>
                                                <option>Usera</option>
                                                <option>Villaverde</option>
                                            </optgroup>
                                            <optgroup label="Madrid Sureste">
                                                <option>Toda Madrid Sureste</option>
                                                <option>Puente de Vallecas</option>
                                                <option>Villa de Vallecas</option>
                                                <option>Moratalaz</option>
                                            </optgroup>
                                            <optgroup label="Madrid Suroeste">
                                                <option>Toda Madrid Suroeste</option>
                                                <option>Carabanchel</option>
                                            </optgroup>
                                            <optgroup label="Madrid Este">
                                                <option>Toda Madrid Este</option>
                                                <option>Vicálvaro</option>
                                            </optgroup>
                                            <optgroup label="Norte Comunidad">
                                                <option>Toda la zona Norte Comunidad</option>
                                                <option>Alcobendas</option>
                                                <option>San Sebastián de los Reyes</option>
                                                <option>Colmenar Viejo</option>
                                                <option>Tres Cantos</option>
                                            </optgroup>
                                            <optgroup label="Noroeste Comunidad">
                                                <option>Toda la zona Noroeste Comunidad</option>
                                                <option>Pozuelo de Alarcón</option>
                                                <option>Majadahonda</option>
                                                <option>Las Rozas</option>
                                                <option>Torrelodones</option>
                                            </optgroup>
                                            <optgroup label="Oeste Comunidad">
                                                <option>Toda la zona Oeste Comunidad</option>
                                                <option>Boadilla del Monte</option>
                                                <option>Villaviciosa de Odón</option>
                                            </optgroup>
                                            <optgroup label="Sur Comunidad">
                                                <option>Toda la zona Sur Comunidad</option>
                                                <option>Getafe</option>
                                                <option>Leganés</option>
                                                <option>Fuenlabrada</option>
                                                <option>Alcorcón</option>
                                                <option>Móstoles</option>
                                                <option>Parla</option>
                                            </optgroup>
                                            <optgroup label="Este Comunidad">
                                                <option>Toda la zona Este Comunidad</option>
                                                <option>Coslada</option>
                                                <option>San Fernando de Henares</option>
                                                <option>Torrejón de Ardoz</option>
                                                <option>Alcalá de Henares</option>
                                            </optgroup>
                                            <optgroup label="Sureste Comunidad">
                                                <option>Toda la zona Sureste Comunidad</option>
                                                <option>Rivas-Vaciamadrid</option>
                                                <option>Arganda del Rey</option>
                                            </optgroup>
                                        </select>
                                    </div>
                                </div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.35rem",
                                    marginBottom: "1rem"
                                }}>
                                    <label htmlFor="experiencia" style={{
                                        fontSize: "0.8rem",
                                        fontWeight: 500,
                                        color: "rgba(245,243,238,0.5)",
                                        letterSpacing: "0.04em",
                                        textTransform: "uppercase"
                                    }}>Años de experiencia</label>
                                    <select id="experiencia" required style={{
                                        background: "rgba(255,255,255,0.05)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        borderRadius: 10,
                                        padding: "0.85rem 1rem",
                                        color: "var(--white)",
                                        fontFamily: "'DM Sans',sans-serif",
                                        fontSize: "0.95rem",
                                        outline: "none",
                                        width: "100%",
                                        WebkitAppearance: "none"
                                    }}>
                                        <option value="" disabled>Selecciona</option>
                                        <option>Menos de 2 años</option>
                                        <option>2 a 5 años</option>
                                        <option>5 a 10 años</option>
                                        <option>Más de 10 años</option>
                                    </select>
                                </div>
                                <div style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: "0.75rem",
                                    margin: "1.2rem 0 1.8rem"
                                }}>
                                    <input type="checkbox" id="terms" required style={{
                                        width: 18,
                                        height: 18,
                                        marginTop: 2,
                                        accentColor: "var(--yellow)",
                                        flexShrink: 0,
                                        cursor: "pointer"
                                    }}/>
                                    <label htmlFor="terms" style={{
                                        fontSize: "0.83rem",
                                        color: "rgba(245,243,238,0.45)",
                                        lineHeight: 1.5,
                                        cursor: "pointer"
                                    }}>Acepto recibir solicitudes de trabajo por WhatsApp. Entiendo que el servicio es
                                        gratuito durante el lanzamiento y que la futura cuota mensual se comunicará con
                                        antelación.</label>
                                </div>
                                <button type="submit" disabled={sending} style={{
                                    width: "100%",
                                    background: "var(--yellow)",
                                    color: "var(--black)",
                                    fontFamily: "'Syne',sans-serif",
                                    fontWeight: 700,
                                    fontSize: "1.05rem",
                                    padding: "1.1rem",
                                    borderRadius: "100px",
                                    border: "none",
                                    cursor: sending ? "not-allowed" : "pointer",
                                    opacity: sending ? 0.6 : 1,
                                    transition: "opacity 0.2s, transform 0.2s"
                                }}>
                                    {sending ? "Enviando..." : "Quiero clientes por WhatsApp →"}
                                </button>
                                <p style={{
                                    textAlign: "center",
                                    fontSize: "0.78rem",
                                    color: "rgba(245,243,238,0.3)",
                                    marginTop: "0.8rem"
                                }}>Sin tarjeta · Sin compromiso · Solo profesionales serios · Solo Madrid</p>
                            </form>
                        </>
                    ) : (
                        <div style={{textAlign: "center", padding: "3rem 1rem"}}>
                            <div style={{fontSize: "3rem", marginBottom: "1rem"}}>✅</div>
                            <h3 style={{
                                fontFamily: "'Syne',sans-serif",
                                fontWeight: 800,
                                fontSize: "1.8rem",
                                marginBottom: "0.5rem"
                            }}>¡Ya estás dentro!</h3>
                            <p style={{color: "rgba(245,243,238,0.5)"}}>Te avisaremos por WhatsApp en cuanto empieces a
                                recibir solicitudes en tu zona de Madrid.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* ── WA FLOAT ── */}
            <a href="https://wa.me/34612208911?text=Hola%2C%20quiero%20unirme%20a%20MasAvisos%20y%20recibir%20clientes%20por%20WhatsApp"
               target="_blank" rel="noopener noreferrer"
               style={{
                   position: "fixed",
                   bottom: "1.8rem",
                   right: "1.8rem",
                   zIndex: 999,
                   display: "flex",
                   alignItems: "center",
                   gap: "0.65rem",
                   background: "#25D366",
                   color: "#fff",
                   fontFamily: "'Syne',sans-serif",
                   fontWeight: 700,
                   fontSize: "0.88rem",
                   padding: "0.75rem 1.4rem 0.75rem 1rem",
                   borderRadius: "100px",
                   textDecoration: "none",
                   boxShadow: "0 4px 24px rgba(37,211,102,0.45)",
                   animation: "waPop 0.5s 1.5s ease both, waPulse 3s 4s ease-in-out infinite"
               }}>
                {WA_ICON} Hablar por WhatsApp
            </a>
        </>
    );
}
