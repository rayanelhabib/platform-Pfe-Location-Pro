import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"

export const metadata: Metadata = {
  title: "Enterprise.OS — Infrastructure Unifiée CRM, ERP & Localisation",
  description: "Propulsez votre croissance avec une plateforme unifiée CRM, ERP et Localisation. Performance, IA et scalabilité sans compromis.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
