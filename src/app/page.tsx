'use client'
import Header from '@/components/header'
import Hero from '@/components/hero'
import AboutUs from '@/components/AboutUs'
import Partners from '@/components/Partners'
import Testimonials from '@/components/Testimonials'
import TechSalaryGrids from '@/components/TechSalaryGrids'
import Contact from '@/components/contact'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      
      {/* Section À propos */}
      <AboutUs />
      
      {/* Section Partenaires */}
      <Partners />

      {/* Section 3: Grilles de Salaires Tech */}
      <TechSalaryGrids />
      
      <Contact />
    </main>
  )
}
