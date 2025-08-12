'use client'
import Header from '@/components/header'
import Hero from '@/components/hero'
import Guarantees from '@/components/guarantees'
import Partners from '@/components/Partners'
import TechSalaryGrids from '@/components/TechSalaryGrids'
import Contact from '@/components/contact'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Guarantees />
      
      {/* Section 1: Nos Partenaires */}
      <Partners />

      {/* Section 2: Grilles de Salaires Tech */}
      <TechSalaryGrids />
      
      <Contact />
    </main>
  )
}
