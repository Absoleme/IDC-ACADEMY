'use client'
import { useState } from 'react'
import Header from '@/components/header'
import Hero from '@/components/hero'
import Guarantees from '@/components/guarantees'
import CategorySelector from '@/components/CategorySelector'
import FormationsList from '@/components/FormationList'
import Contact from '@/components/contact'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Guarantees />
      <CategorySelector onCategorySelect={setSelectedCategory} />
      {selectedCategory && <FormationsList categoryId={selectedCategory} />}
      <Contact />
    </main>
  )
}
