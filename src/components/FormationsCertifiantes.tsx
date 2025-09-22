'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import ContactModal from './ContactModal'
import FormationDetailModal from './FormationDetailModal'

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
  modalites: string[]
}

interface CategoryData {
  id: string
  nom: string
  formations: Formation[]
}

interface Props {
  title: string
  description: string
  id: string
}

export default function FormationsCertifiantes({ title, description, id }: Props) {
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedFormationId, setSelectedFormationId] = useState<string>('')
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [activeSubFilter, setActiveSubFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [durationFilter, setDurationFilter] = useState<string>('all')
  const [modalityFilter, setModalityFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage] = useState<number>(3)
  
  const getCategoryConfig = (categoryName: string) => {
    const name = categoryName.toLowerCase()
    
    if (name.includes('cloud')) 
      return { 
        icon: '☁️', 
        gradient: 'from-blue-500 to-cyan-500', 
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        textColor: 'text-blue-800'
      }
    if (name.includes('cyber') || name.includes('sécurité')) 
      return { 
        icon: '🔒', 
        gradient: 'from-red-500 to-pink-500', 
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        textColor: 'text-red-800'
      }
    if (name.includes('data')) 
      return { 
        icon: '📊', 
        gradient: 'from-green-500 to-emerald-500', 
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-800'
      }
    if (name.includes('devops')) 
      return { 
        icon: '⚙️', 
        gradient: 'from-purple-500 to-indigo-500', 
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200',
        textColor: 'text-purple-800'
      }
    if (name.includes('ia'))
      return {
        icon: '🤖',
        gradient: 'from-orange-500 to-yellow-500',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        textColor: 'text-orange-800'
      }
    if (name.includes('bureautique'))
      return {
        icon: '📄',
        gradient: 'from-amber-500 to-yellow-500',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        textColor: 'text-amber-800'
      }

    return {
      icon: '💻',
      gradient: 'from-gray-500 to-slate-500',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      textColor: 'text-gray-800'
    }
  }

  useEffect(() => {
    async function loadFormations() {
      try {
        const response = await fetch('/api/formations')
        if (response.ok) {
          const data = await response.json()
          // Filtrer pour ne garder que les formations avec certifications (but: obtenir une certification)
          const formationsAvecCertifications = data.categories.map((cat: CategoryData) => ({
            ...cat,
            formations: cat.formations.filter((f: Formation) => 
              f.certifications_visees && f.certifications_visees.length > 0
            )
          })).filter((cat: CategoryData) => cat.formations.length > 0)
          
          setCategories(formationsAvecCertifications)
        }
      } catch (error) {
        console.error('Error loading formations:', error)
      } finally {
        setLoading(false)
      }
    }
    loadFormations()
  }, [])

  const handleFormationClick = (formation: Formation) => {
    setSelectedFormation(formation)
    setIsModalOpen(true)
  }

  const handleDetailClick = (formation: Formation) => {
    setSelectedFormationId(formation.id)
    setIsDetailModalOpen(true)
  }

  const handleFilterClick = (categoryId: string) => {
    setActiveFilter(categoryId)
    setActiveSubFilter('all') // Reset sub-filter when changing main filter
    setCurrentPage(1) // Reset pagination when changing filter
  }

  const handleSubFilterClick = (subCategory: string) => {
    setActiveSubFilter(subCategory)
    setCurrentPage(1) // Reset pagination when changing sub-filter
  }

  const filteredCategories = activeFilter === 'all' 
    ? categories.map(cat => ({
        ...cat,
        formations: cat.formations.filter(formation => {
          // Search filter
          const matchesSearch = searchTerm === '' || 
            formation.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            formation.resume.toLowerCase().includes(searchTerm.toLowerCase()) ||
            formation.competences.some(comp => comp.toLowerCase().includes(searchTerm.toLowerCase())) ||
            formation.certifications_visees.some(cert => cert.toLowerCase().includes(searchTerm.toLowerCase()))

          // Duration filter
          const matchesDuration = durationFilter === 'all' || 
            (durationFilter === 'short' && (formation.duree_formation.includes('jour') && parseInt(formation.duree_formation) <= 3)) ||
            (durationFilter === 'medium' && (formation.duree_formation.includes('jour') && parseInt(formation.duree_formation) > 3 && parseInt(formation.duree_formation) <= 10)) ||
            (durationFilter === 'long' && (formation.duree_formation.includes('semaine') || formation.duree_formation.includes('mois') || (formation.duree_formation.includes('jour') && parseInt(formation.duree_formation) > 10)))

          // Modality filter
          const matchesModality = modalityFilter === 'all' ||
            formation.modalites.some(modalite => modalite.toLowerCase().includes(modalityFilter.toLowerCase()))

          return matchesSearch && matchesDuration && matchesModality
        })
      })).filter(cat => cat.formations.length > 0)
    : categories.filter(cat => cat.id === activeFilter).map(cat => {
        let filteredFormations = cat.formations

        // Apply sub-category filter for Cloud
        if (cat.nom.toLowerCase() === 'cloud' && activeSubFilter !== 'all') {
          filteredFormations = filteredFormations.filter(formation => 
            formation.sous_categorie === activeSubFilter
          )
        }

        // Apply other filters
        filteredFormations = filteredFormations.filter(formation => {
          const matchesSearch = searchTerm === '' || 
            formation.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            formation.resume.toLowerCase().includes(searchTerm.toLowerCase()) ||
            formation.competences.some(comp => comp.toLowerCase().includes(searchTerm.toLowerCase())) ||
            formation.certifications_visees.some(cert => cert.toLowerCase().includes(searchTerm.toLowerCase()))

          const matchesDuration = durationFilter === 'all' || 
            (durationFilter === 'short' && (formation.duree_formation.includes('jour') && parseInt(formation.duree_formation) <= 3)) ||
            (durationFilter === 'medium' && (formation.duree_formation.includes('jour') && parseInt(formation.duree_formation) > 3 && parseInt(formation.duree_formation) <= 10)) ||
            (durationFilter === 'long' && (formation.duree_formation.includes('semaine') || formation.duree_formation.includes('mois') || (formation.duree_formation.includes('jour') && parseInt(formation.duree_formation) > 10)))

          const matchesModality = modalityFilter === 'all' ||
            formation.modalites.some(modalite => modalite.toLowerCase().includes(modalityFilter.toLowerCase()))

          return matchesSearch && matchesDuration && matchesModality
        })

        return {
          ...cat,
          formations: filteredFormations
        }
      }).filter(cat => cat.formations.length > 0)

  // Flatten all formations for pagination
  const allFilteredFormations = filteredCategories.flatMap(cat => 
    cat.formations.map(formation => ({ ...formation, categoryName: cat.nom, categoryConfig: getCategoryConfig(cat.nom) }))
  )

  // Pagination calculations
  const totalItems = allFilteredFormations.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedFormations = allFilteredFormations.slice(startIndex, endIndex)

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, durationFilter, modalityFilter])

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-gradient-to-r from-blue-200 to-purple-200 rounded-xl w-1/3 mx-auto mb-6"></div>
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

  if (categories.length === 0) {
    return null
  }

  return (
    <section id={id} className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-indigo-400 to-pink-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-6">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">{description}</p>
          <div className="mt-8 flex justify-center">
            <div className="h-1 w-32 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"></div>
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
                  Domaines de formation
                </h3>
                <p className="text-xs text-gray-600">Choisissez votre spécialité</p>
              </div>

              {/* All Formations Option */}
              <button
                onClick={() => handleFilterClick('all')}
                className={`w-full p-3 rounded-xl font-medium transition-all duration-300 mb-2 ${
                  activeFilter === 'all'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
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
                      <div className="font-semibold text-sm">Toutes les formations</div>
                      <div className="text-xs opacity-75">
                        {categories.reduce((total, cat) => total + cat.formations.length, 0)} formations
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              {/* Category Navigation */}
              <div className="space-y-2">
                {categories.map((category) => {
                  const categoryConfig = getCategoryConfig(category.nom)
                  const isActive = activeFilter === category.id
                  
                  return (
                    <div key={category.id}>
                      <button
                        onClick={() => handleFilterClick(category.id)}
                        className={`w-full p-3 rounded-xl font-medium transition-all duration-300 ${
                          isActive
                            ? `bg-gradient-to-r ${categoryConfig.gradient} text-white shadow-lg`
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-10 h-10 ${isActive ? 'bg-white/20' : categoryConfig.bgColor} rounded-lg flex items-center justify-center mr-3`}>
                              <span className="text-xl">{categoryConfig.icon}</span>
                            </div>
                            <div className="text-left">
                              <div className="font-semibold text-sm">{category.nom}</div>
                              <div className="text-xs opacity-75">
                                {category.formations.length} formation{category.formations.length > 1 ? 's' : ''}
                              </div>
                            </div>
                          </div>
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            isActive ? 'bg-white/20' : 'bg-gray-200 text-gray-600'
                          }`}>
                            {category.formations.length}
                          </div>
                        </div>
                      </button>

                      {/* Sub-filters for Cloud category */}
                      {isActive && category.nom.toLowerCase() === 'cloud' && (
                        <div className="mt-3 ml-4 space-y-2 pl-4 border-l-2 border-blue-300">
                          <button
                            onClick={() => handleSubFilterClick('all')}
                            className={`w-full p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                              activeSubFilter === 'all'
                                ? 'bg-blue-100 text-blue-900 border border-blue-200'
                                : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                            }`}
                          >
                            <div className="flex items-center">
                              <span className="mr-2">🌐</span>
                              Toutes les formations Cloud
                            </div>
                          </button>
                          
                          <button
                            onClick={() => handleSubFilterClick('AWS')}
                            className={`w-full p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                              activeSubFilter === 'AWS'
                                ? 'bg-orange-100 text-orange-900 border border-orange-200'
                                : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-200'
                            }`}
                          >
                            <div className="flex items-center">
                              <span className="mr-2">🟠</span>
                              Amazon Web Services
                            </div>
                          </button>
                          
                          <button
                            onClick={() => handleSubFilterClick('Azure')}
                            className={`w-full p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                              activeSubFilter === 'Azure'
                                ? 'bg-blue-100 text-blue-900 border border-blue-200'
                                : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                            }`}
                          >
                            <div className="flex items-center">
                              <span className="mr-2">🔵</span>
                              Microsoft Azure
                            </div>
                          </button>
                        </div>
                      )}
                    </div>
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
                <div className="mb-3">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Durée</label>
                  <select
                    value={durationFilter}
                    onChange={(e) => setDurationFilter(e.target.value)}
                    className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="all">Toutes les durées</option>
                    <option value="short">Courte (1-3 jours)</option>
                    <option value="medium">Moyenne (4-10 jours)</option>
                    <option value="long">Longue (+ de 10 jours)</option>
                  </select>
                </div>

                {/* Modality Filter */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Modalité</label>
                  <select
                    value={modalityFilter}
                    onChange={(e) => setModalityFilter(e.target.value)}
                    className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="all">Toutes les modalités</option>
                    <option value="présentiel">Présentiel</option>
                    <option value="distanciel">Distanciel</option>
                    <option value="hybride">Hybride</option>
                  </select>
                </div>

                {/* Clear Filters */}
                {(searchTerm || durationFilter !== 'all' || modalityFilter !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setDurationFilter('all')
                      setModalityFilter('all')
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
                    Formation{totalItems > 1 ? 's' : ''} trouvée{totalItems > 1 ? 's' : ''}
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
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Toutes
                </button>

                {categories.map((category) => {
                  const categoryConfig = getCategoryConfig(category.nom)
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleFilterClick(category.id)}
                      className={`flex-shrink-0 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                        activeFilter === category.id
                          ? `bg-gradient-to-r ${categoryConfig.gradient} text-white shadow-lg`
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span className="flex items-center">
                        <span className="text-lg mr-2">{categoryConfig.icon}</span>
                        {category.nom}
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
                  {totalItems} formation{totalItems > 1 ? 's' : ''} trouvée{totalItems > 1 ? 's' : ''}
                </h3>
                {totalPages > 1 && (
                  <p className="text-gray-600">
                    Affichage de {startIndex + 1} à {Math.min(endIndex, totalItems)} sur {totalItems} formations
                  </p>
                )}
              </div>
            )}

            {/* Formations List - Paginated */}
            {paginatedFormations.length > 0 ? (
              <div className="space-y-6">
                {paginatedFormations.map((formation, index) => (
                    <div 
                      key={formation.id} 
                      className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:scale-[1.02] relative overflow-hidden animate-fadeIn"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Top gradient line */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${formation.categoryConfig.gradient}`}></div>
                      
                      <div className="p-6 lg:p-8">
                        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                          
                          {/* Left Column - Main Info */}
                          <div className="flex-1">
                            <div className="mb-6">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                                <h4 className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-indigo-700 transition-colors">
                                  {formation.titre}
                                </h4>
                                {formation.sous_categorie && (
                                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${formation.categoryConfig.gradient} text-white shadow-sm flex-shrink-0`}>
                                    {formation.sous_categorie}
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-600 text-lg leading-relaxed">{formation.resume}</p>
                            </div>

                            {/* Details Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                              <div className="flex items-center text-sm">
                                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-900">Durée</div>
                                  <div className="text-gray-600">{formation.duree_formation}</div>
                                </div>
                              </div>

                              <div className="flex items-center text-sm">
                                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-3">
                                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                  </svg>
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-900">Modalité</div>
                                  <div className="text-purple-600">{formation.modalites.join(' • ')}</div>
                                </div>
                              </div>
                            </div>

                            {/* Certifications */}
                            <div className="mb-6">
                              <div className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                                Certifications visées
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {formation.certifications_visees.map((cert, index) => (
                                  <span key={index} className={`bg-gradient-to-r ${formation.categoryConfig.gradient} text-white text-sm font-bold px-4 py-2 rounded-full shadow-sm`}>
                                    {cert.replace('cert-', '').toUpperCase()}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Compétences */}
                            <div className="mb-6">
                              <div className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                Compétences acquises
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {formation.competences.slice(0, 6).map((comp, index) => (
                                  <span key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 text-sm font-medium px-4 py-2 rounded-full border border-blue-200">
                                    {comp}
                                  </span>
                                ))}
                                {formation.competences.length > 6 && (
                                  <span className="bg-gray-100 text-gray-600 text-sm font-medium px-4 py-2 rounded-full border border-gray-200">
                                    +{formation.competences.length - 6} autres
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
                                <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-white shadow-md mx-auto mb-3 group-hover:scale-105 transition-transform duration-300">
                                  <Image
                                    src={`/photo-etudiant/image${['-4', '-3', '-2', '', '-5'][index % 5]}.png`}
                                    alt="Étudiant en formation"
                                    width={144}
                                    height={144}
                                    className="w-full h-full object-cover"
                                    unoptimized
                                  />
                                </div>
                                <div className="text-sm text-gray-600 mb-2">Formation</div>
                                <div className="text-lg font-bold text-gray-900">
                                  {formation.categoryName}
                                </div>
                              </div>

                              {/* Buttons */}
                              <div className="space-y-3">
                                <button
                                  onClick={() => handleDetailClick(formation)}
                                  className="w-full bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 flex items-center justify-center"
                                >
                                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                  Voir les détails
                                </button>
                                <button
                                  onClick={() => handleFormationClick(formation)}
                                  className={`w-full bg-gradient-to-r ${formation.categoryConfig.gradient} hover:shadow-xl text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 relative overflow-hidden group`}
                                >
                                  <span className="relative z-10 flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    Nous contacter
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
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucune formation trouvée</h3>
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
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
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
                    Page {currentPage} sur {totalPages} • {totalItems} formation{totalItems > 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formation={selectedFormation ? {
          id: selectedFormation.id,
          titre: selectedFormation.titre,
          duree: selectedFormation.duree_formation,
          type: 'formation'
        } : null}
      />

      <FormationDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        formationId={selectedFormationId}
        formationType="formation"
      />
    </section>
  )
}