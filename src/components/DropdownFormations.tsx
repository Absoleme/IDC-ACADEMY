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
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
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
    }, 300) // Délai de 300ms pour permettre de naviguer dans le menu
  }

  const handleFormationClick = (formation: Formation) => {
    setIsOpen(false)
    onFormationClick(formation)
  }

  // Fonction pour obtenir la couleur de la catégorie
  const getCategoryColor = (categoryName: string) => {
    const colors = {
      'devops': 'text-blue-600 bg-blue-50',
      'cybersecurity': 'text-red-600 bg-red-50', 
      'cybersécurité': 'text-red-600 bg-red-50',
      'cloud': 'text-purple-600 bg-purple-50',
      'ai': 'text-green-600 bg-green-50',
      'data': 'text-orange-600 bg-orange-50',
      'linux': 'text-gray-600 bg-gray-50',
      'stockage-entreprise': 'text-indigo-600 bg-indigo-50',
    }
    const key = categoryName.toLowerCase().replace(/\s+/g, '-')
    return colors[key as keyof typeof colors] || 'text-gray-600 bg-gray-50'
  }

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
        <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-100 py-4 z-50 animate-fadeIn">
          {loading ? (
            <div className="px-4 py-8 text-center">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
              <p className="text-gray-500 text-sm mt-2">Chargement des formations...</p>
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              <div className="px-4 mb-4">
                <h3 className="text-lg font-bold text-gray-900">Nos Formations</h3>
                <p className="text-sm text-gray-500">Cliquez sur une formation pour plus de détails</p>
              </div>
              
              {categories.map((category) => (
                <div key={category.id} className="mb-6 last:mb-0">
                  {/* En-tête de catégorie */}
                  <div className="px-4 mb-3">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(category.nom)}`}>
                      <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
                      {category.nom}
                    </div>
                  </div>
                  
                  {/* Formations de la catégorie */}
                  <div className="space-y-1">
                    {category.formations.slice(0, 4).map((formation) => (
                      <button
                        key={formation.id}
                        onClick={() => handleFormationClick(formation)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 border-l-2 border-transparent hover:border-indigo-500"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {formation.titre}
                            </h4>
                            <div className="flex items-center mt-1 space-x-3">
                              <span className="text-xs text-gray-500 flex items-center">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {formation.duree_formation}
                              </span>
                              {formation.certifications_visees?.length > 0 && (
                                <span className="text-xs text-green-600 font-medium">
                                  Certifiant
                                </span>
                              )}
                            </div>
                          </div>
                          <svg className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>
                    ))}
                    
                    {category.formations.length > 4 && (
                      <div className="px-4 pt-2">
                        <a 
                          href="/formations"
                          className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                          Voir les {category.formations.length - 4} autres formations →
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
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
          )}
        </div>
      )}
    </div>
  )
}