'use client'
import { useState, useEffect, useRef } from 'react'

interface Formation {
  id: string
  type: string
  titre: string
  categorie: string
  sous_categorie?: string
  duree_formation: string
  resume: string
  certifications_visees: string[]
  competences: string[]
  postes_accessibles: string[]
  salaire_moyen: string
  modalites: string[]
}

interface Category {
  id: string
  nom: string
  formations: Formation[]
}

interface DropdownFormationsProps {
  onFormationClick: (formation: Formation) => void
}

export default function DropdownFormations({ onFormationClick }: DropdownFormationsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSelectedCategory(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Charger les formations quand le dropdown s'ouvre
  useEffect(() => {
    if (isOpen && categories.length === 0) {
      loadFormations()
    }
  }, [isOpen, categories.length])

  const loadFormations = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/formations')
      const data = await response.json()
      setCategories(data.categories || [])
    } catch (error) {
      console.error('Erreur lors du chargement des formations:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
      setSelectedCategory(null)
    }, 300) // Délai de 300ms pour permettre de naviguer dans le menu
  }

  const handleFormationClick = (formation: Formation) => {
    setIsOpen(false)
    setSelectedCategory(null)
    onFormationClick(formation)
  }

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId)
  }

  // Fonction pour obtenir la couleur de la catégorie
  const getCategoryColor = (categoryName: string) => {
    const colors = {
      'devops': 'text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100',
      'cybersecurity': 'text-red-600 bg-red-50 border-red-200 hover:bg-red-100', 
      'cybersécurité': 'text-red-600 bg-red-50 border-red-200 hover:bg-red-100',
      'cloud': 'text-purple-600 bg-purple-50 border-purple-200 hover:bg-purple-100',
      'ai': 'text-green-600 bg-green-50 border-green-200 hover:bg-green-100',
      'data': 'text-orange-600 bg-orange-50 border-orange-200 hover:bg-orange-100',
      'linux': 'text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100',
      'stockage-entreprise': 'text-indigo-600 bg-indigo-50 border-indigo-200 hover:bg-indigo-100',
      'développement': 'text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100',
      'systèmes & réseaux': 'text-green-600 bg-green-50 border-green-200 hover:bg-green-100',
      'sécurité': 'text-red-600 bg-red-50 border-red-200 hover:bg-red-100',
      'marketing digital': 'text-purple-600 bg-purple-50 border-purple-200 hover:bg-purple-100',
      'bureautique': 'text-orange-600 bg-orange-50 border-orange-200 hover:bg-orange-100'
    }
    const key = categoryName.toLowerCase().replace(/\s+/g, '-')
    return colors[key as keyof typeof colors] || 'text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100'
  }

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory)

  return (
    <div 
      className="relative"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Lien Formations */}
      <button className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 relative group flex items-center">
        Formations
        <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        <span className={`absolute -bottom-1 left-0 h-0.5 bg-indigo-600 transition-all duration-200 ${isOpen ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 animate-fadeIn flex"
          style={{ minWidth: selectedCategory ? '700px' : '300px' }}
        >
          {loading ? (
            <div className="px-4 py-8 text-center w-full">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
              <p className="text-gray-500 text-sm mt-2">Chargement des formations...</p>
            </div>
          ) : (
            <>
              {/* Colonne des catégories */}
              <div className="py-4" style={{ minWidth: '300px' }}>
                <div className="px-4 mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Catégories</h3>
                  <p className="text-sm text-gray-500">Cliquez pour voir les formations</p>
                </div>
                
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className={`w-full px-4 py-3 text-left transition-all duration-200 border-l-4 ${
                        selectedCategory === category.id 
                          ? `${getCategoryColor(category.nom)} border-opacity-100` 
                          : `hover:${getCategoryColor(category.nom)} border-transparent`
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {category.nom}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {category.formations.length} formation{category.formations.length > 1 ? 's' : ''}
                          </div>
                        </div>
                        <svg 
                          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                            selectedCategory === category.id ? 'rotate-90' : ''
                          }`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
                
                {/* Lien vers toutes les formations */}
                <div className="border-t border-gray-100 mt-4 pt-4 px-4">
                  <a 
                    href="/formations"
                    className="flex items-center justify-center w-full py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-150"
                  >
                    Voir toutes nos formations
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Colonne des formations (affichée seulement si une catégorie est sélectionnée) */}
              {selectedCategory && selectedCategoryData && (
                <div className="border-l border-gray-200 py-4 max-h-96 overflow-y-auto" style={{ minWidth: '400px' }}>
                  <div className="px-4 mb-4">
                    <h3 className="text-lg font-bold text-gray-900">
                      {selectedCategoryData.nom}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedCategoryData.formations.length} formation{selectedCategoryData.formations.length > 1 ? 's' : ''} disponible{selectedCategoryData.formations.length > 1 ? 's' : ''}
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    {selectedCategoryData.formations.map((formation) => (
                      <button
                        key={formation.id}
                        onClick={() => handleFormationClick(formation)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 border-l-2 border-transparent hover:border-indigo-500"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 mb-1">
                              {formation.titre}
                            </h4>
                            <div className="flex items-center space-x-3 mb-1">
                              <span className="text-xs text-gray-500 flex items-center">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {formation.duree_formation}
                              </span>
                              {formation.certifications_visees?.length > 0 && (
                                <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded">
                                  Certifiant
                                </span>
                              )}
                            </div>
                            {formation.resume && (
                              <p className="text-xs text-gray-600 line-clamp-2">
                                {formation.resume.substring(0, 120)}...
                              </p>
                            )}
                          </div>
                          <svg className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}