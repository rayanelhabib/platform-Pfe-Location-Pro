"use client"

import Link from "next/link"

const footerLinks = [
  {
    title: "Produits",
    links: [
      { label: "Prestige Nexus", href: "http://localhost:3001" },
      { label: "Prestige Core", href: "http://localhost:3002" },
      { label: "Prestige Fleet", href: "http://localhost:3003" },
      { label: "Tarifs", href: "#pricing" },
    ]
  },
  {
    title: "Entreprise",
    links: [
      { label: "À propos", href: "#" },
      { label: "Carrières", href: "#" },
      { label: "Contact", href: "#" },
    ]
  },
  {
    title: "Légal",
    links: [
      { label: "Confidentialité", href: "#" },
      { label: "Conditions d'utilisation", href: "#" },
    ]
  }
]

export default function Footer() {
  return (
    <footer style={{
      background: "var(--bg)",
      borderTop: "1px solid var(--border-light)",
      paddingTop: 80,
      paddingBottom: 40,
    }}>
      <div className="container">
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "64px 32px",
          marginBottom: 80,
        }}>
          {/* Brand Col */}
          <div style={{ gridColumn: "1 / -1", maxWidth: 360 }} className="lg:col-span-2 lg:grid-column-auto">
            <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: "var(--text-100)", display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{ width: 12, height: 12, borderRadius: 4, background: "#ffffff" }} />
              </div>
              <span style={{
                fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 500,
                color: "var(--text-100)", letterSpacing: "-0.01em",
              }}>
                Prestige<span style={{ color: "var(--text-40)", fontWeight: 600 }}>.Maroc</span>
              </span>
            </Link>
            <p style={{
              fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 300, color: "var(--text-60)", lineHeight: 1.6,
            }}>
              L'écosystème nouvelle génération qui unifie la gestion de votre relation client, vos ressources d'entreprise et votre flotte logistique.
            </p>
          </div>

          {/* Links Cols */}
          {footerLinks.map(col => (
            <div key={col.title}>
              <h4 style={{
                fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 500,
                color: "var(--text-100)", textTransform: "uppercase", letterSpacing: "0.05em",
                marginBottom: 20,
              }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} style={{
                      fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 300, color: "var(--text-60)", textDecoration: "none", transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-100)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-60)"}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{
          paddingTop: 32, borderTop: "1px solid var(--border-subtle)",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24
        }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--text-60)" }}>
            © 2026 Prestige Maroc. Tous droits réservés.
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", background: "var(--bg)", borderRadius: 99, border: "1px solid var(--border-light)" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--erp)", boxShadow: "0 0 10px rgba(16,185,129,0.5)" }} />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: "var(--text-80)" }}>Systèmes opérationnels</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
