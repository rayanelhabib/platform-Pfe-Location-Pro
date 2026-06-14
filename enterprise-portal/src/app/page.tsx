import { HeroSection } from "@/components/sections/HeroSection"
import { ServicesShowcase } from "@/components/sections/ServicesShowcase"
import { SpecsDashboard } from "@/components/sections/SpecsDashboard"
import Footer from "@/components/layout/Footer"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesShowcase />
      <SpecsDashboard />
      <Footer />
    </>
  )
}
