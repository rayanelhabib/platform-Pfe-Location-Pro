"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Zap, Globe, Shield, Lock, Check, Activity, Database, MapPin } from "lucide-react"

const specs = [
  { icon: Zap, label: "Latence P99", value: "< 12ms", desc: "Global edge network" },
  { icon: Globe, label: "Débit", value: "4.2 TB/s", desc: "Bande passante illimitée" },
  { icon: Shield, label: "Disponibilité", value: "99.99%", desc: "SLA garanti" },
  { icon: Lock, label: "Conformité", value: "ISO 27001", desc: "SOC2 Type II, RGPD" },
]

const plans = [
  {
    name: "Starter",
    price: "0",
    desc: "Idéal pour démarrer et valider votre produit.",
    features: ["1 module au choix", "Jusqu'à 5 utilisateurs", "Accès API REST"],
    highlight: false,
  },
  {
    name: "Business",
    price: "2,990",
    desc: "Pour les équipes en pleine croissance.",
    features: ["CRM + ERP + LOC inclus", "Jusqu'à 50 utilisateurs", "Support prioritaire"],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Sur mesure",
    desc: "Pour les grandes organisations.",
    features: ["Modules illimités", "Utilisateurs illimités", "Customer Success Manager"],
    highlight: false,
  },
]

export function SpecsDashboard() {
  const [annual, setAnnual] = useState(true)

  return (
    <>
      {/* ── Performance ─────────────────────────────────────── */}
      <section id="specs" className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <h2 style={{
              fontFamily: "var(--font-heading)",
              fontStyle: "italic",
              transform: "skewX(-8deg)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 200, letterSpacing: "-0.02em",
              color: "var(--text-100)", marginBottom: 20
            }}>
              L'ingénierie au service de l'expérience.
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 32, marginBottom: 120 }}>
            {specs.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.label}
                  className="saas-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{ padding: 40 }}
                >
                  <div style={{ width: 48, height: 48, background: "var(--bg)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, border: "1px solid var(--border-light)", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                    <Icon style={{ width: 24, height: 24, color: "var(--accent)" }} />
                  </div>
                  <div className="eyebrow" style={{ marginBottom: 8 }}>{s.label}</div>
                  <div style={{
                    fontFamily: "var(--font-heading)",
                    fontStyle: "italic", transform: "skewX(-8deg)",
                    fontSize: 28, fontWeight: 200, letterSpacing: "-0.01em",
                    color: "var(--text-100)", marginBottom: 8,
                  }}>{s.value}</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500, color: "var(--text-60)" }}>{s.desc}</div>
                </motion.div>
              )
            })}
          </div>

          {/* Integration Flow */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}
            className="md:grid-cols-2 grid-cols-1" id="architecture">
            <div>
              <div className="eyebrow" style={{ marginBottom: 20, color: "var(--accent)" }}>Architecture Unifiée</div>
              <h3 style={{
                fontFamily: "var(--font-heading)",
                fontStyle: "italic",
                transform: "skewX(-8deg)",
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                fontWeight: 200, letterSpacing: "-0.02em",
                color: "var(--text-100)", marginBottom: 20,
              }}>
                Un flux de données ininterrompu.
              </h3>
              <p style={{ color: "var(--text-60)", fontSize: 16, fontWeight: 500, lineHeight: 1.6, marginBottom: 24 }}>
                Oubliez les silos. Lorsqu'un prospect devient client dans le CRM, une commande est générée automatiquement dans l'ERP, et la flotte de localisation est alertée en temps réel.
              </p>
            </div>

            <div className="saas-card" style={{ padding: 48, display: "flex", flexDirection: "column", gap: 40, position: "relative" }}>
              <div style={{ position: "absolute", top: 72, bottom: 72, left: 76, width: 2, background: "var(--border-light)", zIndex: 0 }} />

              <div style={{ display: "flex", alignItems: "center", gap: 24, position: "relative", zIndex: 1 }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: "var(--bg)", border: "1px solid var(--border-light)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                  <Activity style={{ width: 24, height: 24, color: "var(--crm)" }} />
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-60)", textTransform: "uppercase", letterSpacing: "0.05em" }}>CRM</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 18, fontWeight: 700, color: "var(--text-100)" }}>Prospect Qualifié</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 24, position: "relative", zIndex: 1 }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: "var(--bg)", border: "1px solid var(--border-light)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                  <Database style={{ width: 24, height: 24, color: "var(--erp)" }} />
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-60)", textTransform: "uppercase", letterSpacing: "0.05em" }}>ERP</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 18, fontWeight: 700, color: "var(--text-100)" }}>Stock Réservé & Facturé</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 24, position: "relative", zIndex: 1 }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: "var(--bg)", border: "1px solid var(--border-light)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                  <MapPin style={{ width: 24, height: 24, color: "var(--loc)" }} />
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-60)", textTransform: "uppercase", letterSpacing: "0.05em" }}>LOC</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 18, fontWeight: 700, color: "var(--text-100)" }}>Camion en Route</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────── */}
      <section id="pricing" className="section" style={{ background: "var(--bg)", borderTop: "1px solid var(--border-light)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <h2 style={{
              fontFamily: "var(--font-heading)",
              fontStyle: "italic",
              transform: "skewX(-8deg)",
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              fontWeight: 200, letterSpacing: "-0.02em",
              color: "var(--text-100)", marginBottom: 24,
            }}>
              Tarification simple et transparente.
            </h2>
            
            <div style={{ display: "inline-flex", background: "var(--bg)", padding: 6, borderRadius: 12, border: "1px solid var(--border-light)" }}>
               <button onClick={() => setAnnual(false)} style={{ padding: "8px 24px", borderRadius: 8, background: !annual ? "var(--bg-muted)" : "transparent", border: "none", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: !annual ? "var(--text-100)" : "var(--text-60)", transition: "all 0.2s" }}>Mensuel</button>
               <button onClick={() => setAnnual(true)} style={{ padding: "8px 24px", borderRadius: 8, background: annual ? "var(--bg-muted)" : "transparent", border: "none", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: annual ? "var(--text-100)" : "var(--text-60)", transition: "all 0.2s" }}>
                  Annuel (-20%)
               </button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                className="saas-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  padding: 48,
                  borderColor: plan.highlight ? "var(--accent)" : "var(--border-light)",
                  boxShadow: plan.highlight ? "0 10px 30px rgba(79,70,229,0.08)" : undefined,
                }}
              >
                <h3 style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", transform: "skewX(-8deg)", fontSize: 20, fontWeight: 200, color: "var(--text-100)", marginBottom: 8 }}>
                  {plan.name}
                </h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500, color: "var(--text-60)", marginBottom: 32, minHeight: 40 }}>
                  {plan.desc}
                </p>

                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 32 }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", transform: "skewX(-8deg)", display: "inline-block", fontSize: 32, fontWeight: 200, letterSpacing: "-0.02em", color: "var(--text-100)" }}>
                     {plan.price !== "Sur mesure" ? (annual ? Math.floor(parseInt(plan.price.replace(',', '')) * 0.8) : plan.price) : plan.price}
                  </span>
                  {plan.price !== "Sur mesure" && <span style={{ fontSize: 15, color: "var(--text-60)", fontWeight: 500 }}>MAD / mois</span>}
                </div>

                <a href="#" className={plan.highlight ? "btn-primary" : "btn-secondary"} style={{ width: "100%", marginBottom: 40 }}>
                  Choisir ce plan
                </a>

                <ul style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <Check style={{ width: 18, height: 18, color: "var(--accent)" }} />
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--text-80)" }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--bg)", position: "relative", overflow: "hidden" }}>
        <div className="glow-orb" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 800, height: 800 }} />
        <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 10 }}>
          <div className="saas-card" style={{ padding: "100px 40px", maxWidth: 900, margin: "0 auto", border: "1px solid var(--border-light)", background: "rgba(255,255,255,0.8)", backdropFilter: "blur(20px)" }}>
            <h2 style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 800, letterSpacing: "-0.04em",
              color: "var(--text-100)",
              marginBottom: 24,
            }}>
              Prêt à accélérer ?
            </h2>
            <p style={{ color: "var(--text-60)", fontSize: 18, marginBottom: 48, maxWidth: 600, margin: "0 auto 48px", lineHeight: 1.6 }}>
              Rejoignez des centaines d'entreprises qui ont déjà optimisé leurs opérations avec Prestige Maroc.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
              <a href="http://localhost:3001" className="btn-primary" style={{ padding: "16px 32px", fontSize: 16 }}>
                Créer un compte gratuit
              </a>
              <a href="#" className="btn-secondary" style={{ padding: "16px 32px", fontSize: 16 }}>
                Contacter les ventes
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
