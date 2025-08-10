/*'use client'
import { useState } from 'react'
import data from '@/data/formations.json'

interface CategorySelectorProps {
  onCategorySelect: (categoryId: string) => void
}

export default function CategorySelector({ onCategorySelect }: CategorySelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId)
    onCategorySelect(categoryId)
    
    // Scroll automatique vers les formations avec un petit délai
    setTimeout(() => {
      const formationsSection = document.getElementById('formations-section')
      if (formationsSection) {
        formationsSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        })
      }
    }, 150)
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Choisissez votre domaine de spécialisation
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez nos parcours certifiants adaptés à votre profil
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {data.categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`
                cursor-pointer p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105
                ${selectedCategory === category.id 
                  ? 'border-blue-500 bg-blue-50 shadow-lg' 
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }
              `}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">{category.icon}</div>
                <h3 className="font-semibold text-gray-800 text-sm leading-tight mb-1">
                  {category.nom}
                </h3>
                <div className="text-xs text-gray-500">
                  {category.formations.length} formation{category.formations.length > 1 ? 's' : ''}
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedCategory && (
          <div className="text-center mt-6">
            <div className="inline-flex items-center text-blue-600 text-sm animate-bounce">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              Découvrez les formations ci-dessous
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
*/