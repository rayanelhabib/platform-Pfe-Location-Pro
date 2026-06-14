"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowRight } from "lucide-react"

const navLinks = [
  { label: "Nexus CRM", href: "http://localhost:3001" },
  { label: "Core ERP", href: "http://localhost:3002" },
  { label: "Fleet LOC", href: "http://localhost:3003" },
  { label: "Tarifs", href: "#pricing" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      background: scrolled ? "rgba(255, 255, 255, 0.9)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border-light)" : "1px solid transparent",
      transition: "all 0.3s ease"
    }}>
      <div className="container" style={{ height: 80, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        
        {/* Brand */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "var(--text-100)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
          }}>
            <div style={{ width: 12, height: 12, borderRadius: 4, background: "#ffffff" }} />
          </div>
          <span style={{
            fontFamily: "var(--font-heading)",
            fontStyle: "italic",
            fontSize: "22px",
            fontWeight: 300,
            color: "var(--text-100)",
            letterSpacing: "-0.02em",
          }}>
            Prestige<span style={{ color: "var(--text-40)", fontWeight: 400 }}>.Maroc</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex" style={{ alignItems: "center", gap: 40 }}>
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} style={{
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              fontWeight: 400,
              color: "var(--text-60)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-100)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-60)"}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ width: 1, height: 24, background: "var(--border-light)" }} />
          <Link href="http://localhost:3001" className="btn-secondary" style={{ padding: "10px 20px", fontSize: 14 }}>
            Connexion
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: "transparent", border: "none", cursor: "pointer",
            color: "var(--text-100)", padding: 4
          }}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: "absolute", top: 80, left: 0, right: 0,
              background: "var(--bg-surface)", borderBottom: "1px solid var(--border-light)",
              padding: "24px", display: "flex", flexDirection: "column", gap: 16,
              boxShadow: "0 20px 40px rgba(0,0,0,0.05)"
            }}
          >
            {navLinks.map((link) => (
              <Link 
                key={link.label} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 18,
                  fontWeight: 600,
                  color: "var(--text-100)",
                  textDecoration: "none",
                  padding: "16px 0",
                  borderBottom: "1px solid var(--border-subtle)"
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link href="http://localhost:3001" className="btn-primary" style={{ marginTop: 24, width: "100%", justifyContent: "center" }}>
              Connexion <ArrowRight style={{ width: 18, height: 18 }} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
