"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"
import { Users, Layers, MapPin, ArrowRight } from "lucide-react"

function SaasCard({ children, link, accentColor }: { children: ReactNode, link: string, accentColor: string }) {
  return (
    <a href={link} style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <div className="saas-card" style={{ padding: 48, height: "100%", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
        {/* Subtle top glow based on accent color */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: accentColor, opacity: 0.9 }} />
        {children}
      </div>
    </a>
  )
}

const services = [
  {
    icon: Users,
    tag: "CRM",
    accentColor: "var(--crm)",
    title: "Prestige Nexus",
    desc: "Gérez vos prospects et automatisez votre pipeline de vente avec une vue unifiée. Plus de pertes d'opportunités.",
    link: "http://localhost:3001",
    metrics: [
      { label: "Croissance", value: "+32%" },
      { label: "Conversion", value: "18%" }
    ]
  },
  {
    icon: Layers,
    tag: "ERP",
    accentColor: "var(--erp)",
    title: "Prestige Core",
    desc: "Inventaire, facturation et ressources humaines. Tout est synchronisé en temps réel avec une précision absolue.",
    link: "http://localhost:3002",
    metrics: [
      { label: "Disponibilité", value: "99.9%" },
      { label: "Gains de temps", value: "40h/mo" }
    ]
  },
  {
    icon: MapPin,
    tag: "LOC",
    accentColor: "var(--loc)",
    title: "Prestige Fleet",
    desc: "Suivi de flotte en direct, optimisation des itinéraires et gestion intelligente des locations de véhicules.",
    link: "http://localhost:3003",
    metrics: [
      { label: "Flotte active", value: "400+" },
      { label: "Précision", value: "GPS T/R" }
    ]
  }
]

export function ServicesShowcase() {
  return (
    <section id="services" className="section" style={{ background: "var(--bg)", borderBottom: "1px solid var(--border-light)" }}>
      <div className="container">
        
        <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto", marginBottom: 80 }}>
          <h2 style={{
            fontFamily: "var(--font-heading)",
            fontStyle: "italic",
            transform: "skewX(-8deg)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 200, letterSpacing: "-0.02em",
            color: "var(--text-100)", marginBottom: 20
          }}>
            Une suite <span className="text-gradient">interconnectée.</span>
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, fontWeight: 500, color: "var(--text-60)", lineHeight: 1.6 }}>
            Chaque module est conçu pour être leader de sa catégorie, mais leur véritable pouvoir se révèle lorsqu'ils travaillent ensemble.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
          {services.map((svc, i) => {
            const Icon = svc.icon
            return (
              <motion.div
                key={svc.tag}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
              >
                <SaasCard link={svc.link} accentColor={svc.accentColor}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: 16,
                      background: "var(--bg)", border: "1px solid var(--border-light)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
                    }}>
                      <Icon style={{ width: 28, height: 28, color: svc.accentColor }} />
                    </div>
                    <span className="pill" style={{ color: svc.accentColor, borderColor: "var(--border-light)" }}>{svc.tag}</span>
                  </div>

                  <h3 style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", transform: "skewX(-8deg)", fontSize: 24, fontWeight: 200, color: "var(--text-100)", marginBottom: 16, letterSpacing: "-0.01em" }}>
                    {svc.title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 500, color: "var(--text-60)", lineHeight: 1.6, marginBottom: 32 }}>
                    {svc.desc}
                  </p>

                  <div style={{ display: "flex", gap: 16, marginTop: "auto", marginBottom: 32, paddingBottom: 32, borderBottom: "1px solid var(--border-light)" }}>
                     {svc.metrics.map(m => (
                        <div key={m.label} style={{ flex: 1 }}>
                           <div style={{ fontSize: 12, color: "var(--text-60)", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{m.label}</div>
                           <div style={{ fontFamily: "var(--font-sans)", fontSize: 18, color: "var(--text-100)", fontWeight: 700 }}>{m.value}</div>
                        </div>
                     ))}
                  </div>

                  <div style={{
                    display: "flex", alignItems: "center", gap: 8,
                    fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600,
                    color: "var(--text-100)", transition: "color 0.2s"
                  }}>
                    Accéder à {svc.tag} <ArrowRight style={{ width: 16, height: 16 }} />
                  </div>
                </SaasCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
