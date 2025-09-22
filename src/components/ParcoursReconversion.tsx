'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Parcours } from '@/types/formation'
import ContactModal from './ContactModal'
import FormationDetailModal from './FormationDetailModal'

interface Props {
  title: string
  description: string
  id: string
}

interface ParcoursCategory {
  cloud: Parcours[]
  data: Parcours[]
  cybersecurity: Parcours[]
  devops: Parcours[]
  ai: Parcours[]
  fullstack: Parcours[]
}

const categoryLabels = {
  cloud: 'Cloud & Infrastructure',
  data: 'Data & Analytics',
  cybersecurity: 'Cybersécurité',
  devops: 'DevOps & Automatisation',
  ai: 'Intelligence Artificielle & ML',
  fullstack: 'Développement Web & Mobile'
}

const categoryColors = {
  cloud: { 
    badge: 'bg-blue-50 border-blue-200 text-blue-800',
    gradient: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50',
    icon: '☁️'
  },
  data: { 
    badge: 'bg-green-50 border-green-200 text-green-800',
    gradient: 'from-green-500 to-emerald-500',
    bg: 'bg-green-50',
    icon: '📊'
  }, 
  cybersecurity: { 
    badge: 'bg-red-50 border-red-200 text-red-800',
    gradient: 'from-red-500 to-pink-500',
    bg: 'bg-red-50',
    icon: '🔒'
  },
  devops: { 
    badge: 'bg-purple-50 border-purple-200 text-purple-800',
    gradient: 'from-purple-500 to-indigo-500',
    bg: 'bg-purple-50',
    icon: '⚙️'
  },
  ai: { 
    badge: 'bg-orange-50 border-orange-200 text-orange-800',
    gradient: 'from-orange-500 to-yellow-500',
    bg: 'bg-orange-50',
    icon: '🤖'
  },
  fullstack: { 
    badge: 'bg-indigo-50 border-indigo-200 text-indigo-800',
    gradient: 'from-indigo-500 to-purple-500',
    bg: 'bg-indigo-50',
    icon: '💻'
  }
}

export default function ParcoursReconversion({ title, description, id }: Props) {
  const [parcours, setParcours] = useState<ParcoursCategory>({
    cloud: [],
    data: [],
    cybersecurity: [],
    devops: [],
    ai: [],
    fullstack: []
  })
  const [loading, setLoading] = useState(true)
  const [selectedParcours, setSelectedParcours] = useState<Parcours | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedParcoursId, setSelectedParcoursId] = useState<string>('')
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [durationFilter, setDurationFilter] = useState<string>('all')
  const [rncpFilter, setRncpFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage] = useState<number>(3)

  const categorizeParcours = (parcours: Parcours): keyof ParcoursCategory => {
    const titre = parcours.titre.toLowerCase()
    if (titre.includes('cloud') || titre.includes('azure') || titre.includes('aws')) return 'cloud'
    if (titre.includes('data') || titre.includes('analyst')) return 'data'
    if (titre.includes('cyber') || titre.includes('security') || titre.includes('soc') || titre.includes('sécurisées')) return 'cybersecurity'
    if (titre.includes('devops')) return 'devops'
    if (titre.includes('ai') || titre.includes('ml') || titre.includes('intelligence')) return 'ai'
    if (titre.includes('fullstack') || titre.includes('web') || titre.includes('developer')) return 'fullstack'
    if (titre.includes('technicien') || titre.includes('informatique')) return 'fullstack'
    // Règles spécifiques pour les nouveaux parcours
    if (titre.includes('télécommunications') || titre.includes('netops') || titre.includes('réseaux')) return 'cloud'
    return 'fullstack'
  }

  const extractNiveau = (parcours: Parcours): string => {
    // Si le parcours a des données RNCP, utiliser celles-ci en priorité
    if (parcours.rncp && parcours.rncp.niveau) {
      return parcours.rncp.niveau.toString()
    }
    
    // Sinon essayer d'extraire du titre
    const match = parcours.titre.match(/niveau\s+(\d+)|n(\d+)/i)
    return match ? (match[1] || match[2]) : '0'
  }


  const getDescription = (parcours: Parcours): string => {
    if (parcours.objectifs_et_metiers?.presentation) {
      return parcours.objectifs_et_metiers.presentation
    }
    return parcours.description || ''
  }

  const getDureeFormation = (parcours: Parcours): string => {
    if (parcours.details_de_la_formation?.duree_totale_heures) {
      const heures = parcours.details_de_la_formation.duree_totale_heures
      return `${heures}h (${Math.round(heures / 35)} semaines)`
    }
    return parcours.duree_formation || 'N/A'
  }

  const getSecteursActivite = (parcours: Parcours): string[] => {
    if (parcours.objectifs_et_metiers?.secteurs_activite) {
      return parcours.objectifs_et_metiers.secteurs_activite
    }
    return []
  }

  useEffect(() => {
    async function loadParcours() {
      try {
        const parcoursFiles = [
          'technicien-informatique-n4',
          'charge-etudes-reseaux-telecoms-n5',
          'grade-licence-cyber-reseaux-n6',
          'administrateur-systeme-devops-n6',
          'administrateur-reseau-netops-n6',
          'administrateur-infrastructures-securisees-n6'
        ]

        const parcoursData = await Promise.all(
          parcoursFiles.map(async (file) => {
            try {
              const response = await fetch(`/api/parcours/${file}`)
              if (response.ok) {
                return await response.json()
              }
            } catch (error) {
              console.warn(`Could not load parcours ${file} from API:`, error)
            }
            return null
          })
        )

        const validParcours = parcoursData.filter(Boolean) as Parcours[]
        // Filtrer uniquement les niveaux 4, 5, 6 et 7
        const parcoursRNCP = validParcours.filter(p => {
          const niveau = extractNiveau(p)
          return niveau === '4' || niveau === '5' || niveau === '6' || niveau === '7'
        })

        const categorized: ParcoursCategory = {
          cloud: [],
          data: [],
          cybersecurity: [],
          devops: [],
          ai: [],
          fullstack: []
        }

        parcoursRNCP.forEach(parcours => {
          const category = categorizeParcours(parcours)
          categorized[category].push(parcours)
        })

        setParcours(categorized)
      } catch (error) {
        console.error('Error loading parcours:', error)
      } finally {
        setLoading(false)
      }
    }

    loadParcours()
  }, [])

  const handleContact = (parcours: Parcours) => {
    setSelectedParcours(parcours)
    setIsModalOpen(true)
  }

  const handleDetailClick = (parcours: Parcours) => {
    setSelectedParcoursId(parcours.id)
    setIsDetailModalOpen(true)
  }

  const handleFilterClick = (categoryKey: string) => {
    setActiveFilter(categoryKey)
    setCurrentPage(1) // Reset pagination when changing filter
  }

  const getFilteredParcours = (): Parcours[] => {
    let allParcours: Parcours[] = []
    
    if (activeFilter === 'all') {
      allParcours = Object.values(parcours).flat()
    } else {
      allParcours = parcours[activeFilter as keyof ParcoursCategory] || []
    }

    // Apply search filter
    if (searchTerm) {
      allParcours = allParcours.filter(parcours => 
        parcours.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parcours.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (parcours.certifications_inclues || []).some(cert => {
          const certName = typeof cert === 'string' ? cert : cert.id
          return certName.toLowerCase().includes(searchTerm.toLowerCase())
        })
      )
    }

    // Apply duration filter
    if (durationFilter !== 'all') {
      allParcours = allParcours.filter(parcours => {
        const duree = parcours.duree_formation.toLowerCase()
        if (durationFilter === 'short') return duree.includes('mois') && parseInt(duree) <= 6
        if (durationFilter === 'medium') return duree.includes('mois') && parseInt(duree) > 6 && parseInt(duree) <= 12
        if (durationFilter === 'long') return duree.includes('mois') && parseInt(duree) > 12
        return true
      })
    }

    // Apply RNCP level filter
    if (rncpFilter !== 'all') {
      allParcours = allParcours.filter(parcours => {
        const niveau = extractNiveau(parcours)
        return niveau === rncpFilter
      })
    }

    return allParcours
  }

  // Pagination calculations
  const filteredParcours = getFilteredParcours()
  const totalItems = filteredParcours.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedParcours = filteredParcours.slice(startIndex, endIndex).map(parcours => {
    const category = Object.entries(categoryColors).find(([key]) => 
      categorizeParcours(parcours) === key
    )?.[0] || 'fullstack'
    return { ...parcours, categoryName: categoryLabels[category as keyof typeof categoryLabels], categoryConfig: categoryColors[category as keyof typeof categoryColors] }
  })

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, durationFilter, rncpFilter])

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-xl w-1/3 mx-auto mb-6"></div>
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-2/3 mx-auto mb-12"></div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-xl p-8 border">
                    <div className="h-8 bg-gray-200 rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
                    <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const totalParcours = Object.values(parcours).reduce((sum, arr) => sum + arr.length, 0)

  if (totalParcours === 0) {
    return null
  }

  return (
    <section id={id} className="py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-800 bg-clip-text text-transparent mb-6">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">{description}</p>
          <div className="mt-8 flex justify-center">
            <div className="h-1 w-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>
          </div>
        </div>

        {/* Navigation Layout with Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8 lg:items-stretch">
          {/* Sidebar Navigation - Desktop */}
          <div className="hidden lg:flex w-80 flex-shrink-0">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 flex flex-col w-full">
              {/* Navigation Title */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-4H3m16 8H7m12-4H3" />
                  </svg>
                  Domaines de reconversion
                </h3>
                <p className="text-xs text-gray-600">Choisissez votre parcours RNCP</p>
              </div>

              {/* All Parcours Option */}
              <button
                onClick={() => handleFilterClick('all')}
                className={`w-full p-3 rounded-xl font-medium transition-all duration-300 mb-2 ${
                  activeFilter === 'all'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-4H3m16 8H7m12-4H3" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-sm">Tous les parcours</div>
                      <div className="text-xs opacity-75">
                        {Object.values(parcours).reduce((total, arr) => total + arr.length, 0)} parcours
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              {/* Category Navigation */}
              <div className="space-y-2">
                {Object.entries(parcours).map(([categoryKey, parcourslist]) => {
                  if (parcourslist.length === 0) return null
                  const categoryStyle = categoryColors[categoryKey as keyof typeof categoryColors]
                  const isActive = activeFilter === categoryKey
                  
                  return (
                    <button
                      key={categoryKey}
                      onClick={() => handleFilterClick(categoryKey)}
                      className={`w-full p-3 rounded-xl font-medium transition-all duration-300 ${
                        isActive
                          ? `bg-gradient-to-r ${categoryStyle.gradient} text-white shadow-lg`
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 ${isActive ? 'bg-white/20' : categoryStyle.bg} rounded-lg flex items-center justify-center mr-3`}>
                            <span className="text-xl">{categoryStyle.icon}</span>
                          </div>
                          <div className="text-left">
                            <div className="font-semibold text-sm">{categoryLabels[categoryKey as keyof typeof categoryLabels]}</div>
                            <div className="text-xs opacity-75">
                              {parcourslist.length} parcours RNCP
                            </div>
                          </div>
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          isActive ? 'bg-white/20' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {parcourslist.length}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Advanced Filters */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-base font-bold text-gray-900 mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                  Filtres avancés
                </h4>

                {/* Search Bar */}
                <div className="mb-3">
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Duration Filter */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Durée</label>
                  <select
                    value={durationFilter}
                    onChange={(e) => setDurationFilter(e.target.value)}
                    className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="all">Toutes les durées</option>
                    <option value="short">Courte (≤ 6 mois)</option>
                    <option value="medium">Moyenne (7-12 mois)</option>
                    <option value="long">Longue (+ de 12 mois)</option>
                  </select>
                </div>

                {/* RNCP Level Filter */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Niveau RNCP</label>
                  <select
                    value={rncpFilter}
                    onChange={(e) => setRncpFilter(e.target.value)}
                    className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="all">Tous les niveaux</option>
                    <option value="4">Niveau 4 (Bac)</option>
                    <option value="5">Niveau 5 (Bac+2)</option>
                    <option value="6">Niveau 6 (Bac+3/4)</option>
                    <option value="7">Niveau 7 (Bac+5)</option>
                  </select>
                </div>

                {/* Clear Filters */}
                {(searchTerm || durationFilter !== 'all' || rncpFilter !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setDurationFilter('all')
                      setRncpFilter('all')
                      setCurrentPage(1)
                    }}
                    className="w-full py-2 px-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-xs font-medium"
                  >
                    <svg className="w-3 h-3 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Réinitialiser
                  </button>
                )}
              </div>

              {/* Spacer to push stats to bottom */}
              <div className="flex-grow"></div>

              {/* Quick Stats */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-xl font-bold text-indigo-600 mb-1">
                    {totalItems}
                  </div>
                  <div className="text-xs text-gray-600">
                    Parcours trouvé{totalItems > 1 ? 's' : ''}
                  </div>
                  {totalPages > 1 && (
                    <div className="text-xs text-gray-500 mt-1">
                      Page {currentPage} sur {totalPages}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-4">
              <div className="flex overflow-x-auto space-x-3 pb-2">
                <button
                  onClick={() => handleFilterClick('all')}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    activeFilter === 'all'
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Tous
                </button>

                {Object.entries(parcours).map(([categoryKey, parcourslist]) => {
                  if (parcourslist.length === 0) return null
                  const categoryStyle = categoryColors[categoryKey as keyof typeof categoryColors]
                  return (
                    <button
                      key={categoryKey}
                      onClick={() => handleFilterClick(categoryKey)}
                      className={`flex-shrink-0 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                        activeFilter === categoryKey
                          ? `bg-gradient-to-r ${categoryStyle.gradient} text-white shadow-lg`
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span className="flex items-center">
                        <span className="text-lg mr-2">{categoryStyle.icon}</span>
                        {categoryLabels[categoryKey as keyof typeof categoryLabels]}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {/* Results Summary */}
            {totalItems > 0 && (
              <div className="mb-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {totalItems} parcours RNCP trouvé{totalItems > 1 ? 's' : ''}
                </h3>
                {totalPages > 1 && (
                  <p className="text-gray-600">
                    Affichage de {startIndex + 1} à {Math.min(endIndex, totalItems)} sur {totalItems} parcours
                  </p>
                )}
              </div>
            )}

            {/* Parcours List - Paginated */}
            {paginatedParcours.length > 0 ? (
              <div className="space-y-6">
                {paginatedParcours.map((parcours, index) => (
                    <div
                      key={parcours.id}
                      className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:scale-[1.02] relative overflow-hidden animate-fadeIn"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Top gradient line */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${parcours.categoryConfig.gradient}`}></div>


                      <div className="p-6 lg:p-8 relative">
                        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                          
                          {/* Left Column - Main Info */}
                          <div className="flex-1">
                            <div className="mb-6">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                                <h4 className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-indigo-700 transition-colors">
                                  {parcours.titre}
                                </h4>
                                <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${parcours.categoryConfig.gradient} text-white shadow-sm flex-shrink-0`}>
                                  RNCP Niveau {extractNiveau(parcours)}
                                </span>
                              </div>
                              <p className="text-gray-600 text-lg leading-relaxed">{getDescription(parcours)}</p>
                            </div>

                            {/* Details Row */}
                            <div className="grid grid-cols-1 gap-4 mb-6">
                              <div className="flex items-center text-sm">
                                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-900">Durée</div>
                                  <div className="text-gray-600">{getDureeFormation(parcours)}</div>
                                </div>
                              </div>
                            </div>

                            {/* Secteurs d'activité */}
                            {getSecteursActivite(parcours).length > 0 && (
                              <div className="mb-6">
                                <div className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                  Secteurs d'activité
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {getSecteursActivite(parcours).slice(0, 4).map((secteur, index) => (
                                    <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full border border-blue-200">
                                      {secteur}
                                    </span>
                                  ))}
                                  {getSecteursActivite(parcours).length > 4 && (
                                    <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full border border-gray-200">
                                      +{getSecteursActivite(parcours).length - 4} autres
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Certifications ou titre */}
                            <div className="mb-6">
                              <div className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                                {parcours.certifications_inclues && parcours.certifications_inclues.length > 0 ? 'Certifications incluses' : 'Certification'}
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {parcours.certifications_inclues && parcours.certifications_inclues.length > 0 ? (
                                  <>
                                    {parcours.certifications_inclues.slice(0, 6).map((cert, index) => {
                                      const certName = typeof cert === 'string' 
                                        ? cert.replace('cert-', '').toUpperCase()
                                        : cert.id.replace('cert-', '').toUpperCase()
                                      return (
                                        <span key={index} className={`bg-gradient-to-r ${parcours.categoryConfig.gradient} text-white text-sm font-bold px-4 py-2 rounded-full shadow-sm`}>
                                          {certName}
                                        </span>
                                      )
                                    })}
                                    {parcours.certifications_inclues.length > 6 && (
                                      <span className="bg-gray-100 text-gray-600 text-sm font-medium px-4 py-2 rounded-full border border-gray-200">
                                        +{parcours.certifications_inclues.length - 6} autres
                                      </span>
                                    )}
                                  </>
                                ) : (
                                  <span className={`bg-gradient-to-r ${parcours.categoryConfig.gradient} text-white text-sm font-bold px-4 py-2 rounded-full shadow-sm`}>
                                    {parcours.certification?.intitule || 'Titre professionnel RNCP'}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Right Column - Actions */}
                          <div className="flex-shrink-0 lg:w-64">
                            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 h-full flex flex-col justify-center">
                              <div className="text-center mb-6">
                                {/* Photo d'étudiant au-dessus de l'icône */}
                                <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-white shadow-md mx-auto mb-3 group-hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                                  <div className="text-4xl">👩‍💼</div>
                                </div>
                                <div className={`w-16 h-16 bg-gradient-to-r ${parcours.categoryConfig.gradient} rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                                  <span className="text-3xl">{parcours.categoryConfig.icon}</span>
                                </div>
                                <div className="text-sm text-gray-600 mb-2">Parcours RNCP</div>
                                <div className="text-lg font-bold text-gray-900">
                                  {parcours.categoryName}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  Niveau {extractNiveau(parcours)} - Reconversion
                                </div>
                              </div>

                              {/* Buttons */}
                              <div className="space-y-3">
                                <button
                                  onClick={() => handleDetailClick(parcours)}
                                  className="w-full bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 flex items-center justify-center"
                                >
                                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                  Voir les détails
                                </button>
                                <button
                                  onClick={() => handleContact(parcours)}
                                  className={`w-full bg-gradient-to-r ${parcours.categoryConfig.gradient} hover:shadow-xl text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 relative overflow-hidden group`}
                                >
                                  <span className="relative z-10 flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    Démarrer ma reconversion
                                  </span>
                                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-3-8.944a9.002 9.002 0 018.944 8.944M12 12v.01M12 12V8" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun parcours trouvé</h3>
                <p className="text-gray-500">Essayez de modifier vos critères de recherche.</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                  <div className="flex items-center justify-center space-x-2">
                    {/* Previous Button */}
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                        currentPage === 1
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                          currentPage === pageNum
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}

                    {/* Next Button */}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                        currentPage === totalPages
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Page Info */}
                  <div className="text-center mt-4 text-sm text-gray-600">
                    Page {currentPage} sur {totalPages} • {totalItems} parcours
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Call to action spécifique reconversion */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 backdrop-blur-sm rounded-2xl p-8 border border-indigo-200 shadow-xl">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-900 to-purple-900 bg-clip-text text-transparent mb-4">
              Prêt pour votre reconversion ?
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              Nos conseillers spécialisés en reconversion vous accompagnent pour choisir le parcours RNCP qui transformera votre carrière
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-center p-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">94% d'insertion</h4>
                <p className="text-sm text-gray-600 text-center">Taux d'insertion professionnelle</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Financement</h4>
                <p className="text-sm text-gray-600 text-center">Pôle Emploi, OPCO</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Accompagnement</h4>
                <p className="text-sm text-gray-600 text-center">Coaching personnalisé</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="tel:0759565918" className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Appelez-nous : 07 59 56 59 18
              </a>
              <a href="mailto:contact@idcacademy.fr" className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Écrivez-nous
              </a>
            </div>
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formation={selectedParcours ? {
          titre: selectedParcours.titre,
          type: 'parcours'
        } : null}
      />

      <FormationDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        formationId={selectedParcoursId}
        formationType="parcours"
      />
    </section>
  )
}