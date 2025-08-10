'use client'
import Header from '@/components/header'
import Hero from '@/components/hero'
import Guarantees from '@/components/guarantees'
import FormationsCertifiantes from '@/components/FormationsCertifiantes'
import ParcoursReconversion from '@/components/ParcoursReconversion'
import Contact from '@/components/contact'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Guarantees />
      
      {/* Section 1: Formations pour Certifications */}
      <FormationsCertifiantes 
        title="Formations Certifiantes"
        description="Préparez et obtenez vos certifications IT avec nos formations intensives. Classées par domaine d'expertise pour vous aider à choisir votre spécialisation."
        id="formations-certifiantes"
      />

      {/* Section 2: Parcours de Reconversion RNCP */}
      <ParcoursReconversion 
        title="Parcours de Reconversion Professionnelle"
        description="Parcours longs et certifiants RNCP niveau 6 et 7 pour une reconversion complète vers l'IT. Accompagnement personnalisé et insertion professionnelle garantie."
        id="parcours-reconversion"
      />
      
      <Contact />
    </main>
  )
}
