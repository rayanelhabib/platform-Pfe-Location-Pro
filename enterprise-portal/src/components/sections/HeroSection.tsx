"use client"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const LOGOS = ["Twenty CRM", "IDURAR ERP", "Bookcars LOC", "Next.js", "React", "Node.js", "Stripe", "PostgreSQL"]

function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function HeroSection() {
  return (
    <section
      style={{
        background: "var(--bg)",
        paddingTop: 180,
        paddingBottom: 100,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        borderBottom: "1px solid var(--border-subtle)",
        overflow: "hidden"
      }}
    >
      {/* Light Mode Ambient Glows */}
      <div className="glow-orb" style={{ top: "-20%", left: "50%", transform: "translateX(-50%)", width: 800, height: 800, background: "radial-gradient(circle, rgba(79,70,229,0.05) 0%, rgba(0,0,0,0) 70%)" }} />
      <div className="dot-bg" style={{ position: "absolute", inset: 0, opacity: 0.6 }} />

      <div className="container" style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: 900 }}>
        
        {/* Subtle Badge */}
        <FadeUp delay={0.1}>
          <div style={{ 
            display: "inline-flex", alignItems: "center", gap: 8, 
            background: "var(--bg-surface)", padding: "6px 16px", 
            borderRadius: 99, border: "1px solid var(--border-light)", 
            marginBottom: 32, boxShadow: "0 4px 12px rgba(0,0,0,0.03)"
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-80)", letterSpacing: "0.02em" }}>Plateforme Unifiée 2026</span>
          </div>
        </FadeUp>

        {/* Clean Professional Heading */}
        <FadeUp delay={0.2}>
          <h1 style={{
            fontFamily: "var(--font-heading)",
            fontStyle: "italic",
            transform: "skewX(-8deg)",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 200,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "var(--text-100)",
            marginBottom: 24
          }}>
            Synchronisez votre entreprise, <br className="hidden md:block"/>
            <span className="text-gradient-accent">accélérez votre croissance.</span>
          </h1>
        </FadeUp>

        {/* Subtitle */}
        <FadeUp delay={0.3}>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(1.1rem, 2vw, 1.25rem)",
            fontWeight: 500,
            color: "var(--text-60)",
            lineHeight: 1.6,
            maxWidth: 640,
            margin: "0 auto 40px",
          }}>
            Prestige Maroc unifie la gestion de votre relation client, vos ressources d'entreprise et votre flotte logistique. Un seul écosystème conçu pour la performance.
          </p>
        </FadeUp>

        {/* Feature Ticks */}
        <FadeUp delay={0.35}>
           <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 24, marginBottom: 56 }}>
              {["Aucune double saisie", "Données temps réel", "Intégrations natives"].map((text, i) => (
                 <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckCircle2 style={{ width: 18, height: 18, color: "var(--accent)" }} />
                    <span style={{ fontSize: 14, color: "var(--text-80)", fontWeight: 500 }}>{text}</span>
                 </div>
              ))}
           </div>
        </FadeUp>

        {/* CTAs */}
        <FadeUp delay={0.4}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", marginBottom: 80 }}>
            <a href="http://localhost:3001" className="btn-primary" style={{ padding: "14px 32px", fontSize: 16 }}>
              Accéder au CRM <ArrowRight style={{ width: 18, height: 18 }} />
            </a>
            <a href="#services" className="btn-secondary" style={{ padding: "14px 32px", fontSize: 16 }}>
              Explorer les modules
            </a>
          </div>
        </FadeUp>

        {/* Simple Logo Strip */}
        <FadeUp delay={0.5}>
          <p style={{ fontSize: 12, color: "var(--text-60)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 32 }}>
            Basé sur les meilleures technologies
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "32px 64px", opacity: 0.8 }}>
            {LOGOS.slice(0, 5).map((logo, i) => (
               <span key={i} style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", transform: "skewX(-8deg)", display: "inline-block", fontSize: 20, fontWeight: 200, color: "var(--text-40)" }}>{logo}</span>
            ))}
          </div>
        </FadeUp>

      </div>
    </section>
  )
}
