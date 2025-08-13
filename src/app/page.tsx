'use client'
import Header from '@/components/header'
import Hero from '@/components/hero'
import Partners from '@/components/Partners'
import Testimonials from '@/components/Testimonials'
import TechSalaryGrids from '@/components/TechSalaryGrids'
import Contact from '@/components/contact'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      
      {/* Section 1: Nos Partenaires */}
      <Partners />

      {/* Section 3: Grilles de Salaires Tech */}
      <TechSalaryGrids />
      
      <Contact />
    </main>
  )
}
