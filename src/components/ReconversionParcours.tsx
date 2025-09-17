'use client'
import React, { useState, useEffect } from 'react'
import ContactModal from './ContactModal'
import FormationDetailModal from './FormationDetailModal'

interface ParcoursReconversion {
  id: string
  type: string
  titre: string
  description: string
  public: string
  prerequis: string
  duree_formation: string
  modalites: string
  objectifs: string[]
  modules: Array<{
    module: string
    duree: string
    contenus: string[]
    activites: string[]
  }>
  stats: {
    insertion_professionnelle: string
    taux_cdi: string
  }
  prix: string
  contact: {
    email: string
    telephone: string
  }
  certifications_visees?: string[]
  competences?: string[]
  postes_accessibles?: string[]
}

export default function ReconversionParcours() {
  const [selectedFormation, setSelectedFormation] = useState<ParcoursReconversion | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedFormationId, setSelectedFormationId] = useState<string>('')
  const [parcours, setParcours] = useState<ParcoursReconversion[]>([])
  const [domains, setDomains] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [durationFilter, setDurationFilter] = useState<string>('all')
  const [modalityFilter, setModalityFilter] = useState<string>('all')
  const [domainFilter, setDomainFilter] = useState<string>('all')
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage] = useState<number>(3)

  const getCategoryConfig = () => {
    return {
      icon: '🔄',
      gradient: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-800'
    }
  }

  const getDomain = (titre: string): string => {
    const lowerTitle = titre.toLowerCase()
    if (lowerTitle.includes('devops') || lowerTitle.includes('cloud') || lowerTitle.includes('azure') || lowerTitle.includes('aws') || lowerTitle.includes('kubernetes')) {
      return 'cloud-devops'
    }
    if (lowerTitle.includes('cybersécurité') || lowerTitle.includes('cybersecurite') || lowerTitle.includes('sécurité') || lowerTitle.includes('securite')) {
      return 'cybersecurite'
    }
    if (lowerTitle.includes('data') || lowerTitle.includes('power bi') || lowerTitle.includes('analyst')) {
      return 'data'
    }
    if (lowerTitle.includes('m365') || lowerTitle.includes('microsoft') || lowerTitle.includes('enterprise')) {
      return 'microsoft'
    }
    if (lowerTitle.includes('infrastructure') || lowerTitle.includes('système') || lowerTitle.includes('system') || lowerTitle.includes('stockage')) {
      return 'infrastructure'
    }
    return 'autre'
  }

  const getDomainConfig = (domainKey: string) => {
    const domainConfigs = {
      'cloud-devops': {
        id: 'cloud-devops',
        nom: 'Cloud & DevOps',
        icon: '☁️',
        gradient: 'from-blue-500 to-cyan-500',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        textColor: 'text-blue-800'
      },
      'cybersecurite': {
        id: 'cybersecurite',
        nom: 'Cybersécurité',
        icon: '🔒',
        gradient: 'from-red-500 to-pink-500',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        textColor: 'text-red-800'
      },
      'data': {
        id: 'data',
        nom: 'Data & Analytics',
        icon: '📊',
        gradient: 'from-orange-500 to-yellow-500',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        textColor: 'text-orange-800'
      },
      'microsoft': {
        id: 'microsoft',
        nom: 'Microsoft 365',
        icon: '🏢',
        gradient: 'from-indigo-500 to-purple-500',
        bgColor: 'bg-indigo-50',
        borderColor: 'border-indigo-200',
        textColor: 'text-indigo-800'
      },
      'infrastructure': {
        id: 'infrastructure',
        nom: 'Infrastructure & Systèmes',
        icon: '🖥️',
        gradient: 'from-green-500 to-emerald-500',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-800'
      },
      'autre': {
        id: 'autre',
        nom: 'Autres',
        icon: '⚙️',
        gradient: 'from-gray-500 to-slate-500',
        bgColor: 'bg-gray-50',
        borderColor: 'border-gray-200',
        textColor: 'text-gray-800'
      }
    }
    return domainConfigs[domainKey as keyof typeof domainConfigs] || domainConfigs.autre
  }

  const handleFilterClick = (domainId: string) => {
    setActiveFilter(domainId)
    setCurrentPage(1) // Reset pagination when changing filter
  }

  useEffect(() => {
    const loadParcours = async () => {
      try {
        const parcoursData: ParcoursReconversion[] = []

        // Liste des fichiers de parcours de reconversion
        const parcoursFiles = [
          'devops-azure.json',
          'aws-solution-architect.json',
          'cloud-architect-multicloud.json',
          'cybersecurite-specialist.json',
          'm365-entreprise-admin.json',
          'azure-data-engineer.json',
          'data-analyst-power-bi.json',
          'kubernetes-administrator.json',
          'admin-system-stockage.json',
          'infrastructure-engineer.json'
        ]

        // Charger tous les parcours dynamiquement
        for (const file of parcoursFiles) {
          try {
            const module = await import(`../reconversion/${file}`)
            if (module.default && module.default.type === 'parcours_reconversion') {
              // Adapter les données pour être compatibles avec le format formations
              const originalParcours = module.default as ParcoursReconversion
              const adaptedParcours = {
                ...originalParcours,
                certifications_visees: originalParcours.objectifs || [],
                competences: originalParcours.modules?.map(m => m.module) || [],
                postes_accessibles: []
              }
              console.log('Loaded parcours:', adaptedParcours.titre)
              parcoursData.push(adaptedParcours)
            }
          } catch (error) {
            console.error(`Erreur lors du chargement de ${file}:`, error)
          }
        }

        // Organiser par domaines
        const domainsMap = new Map<string, ParcoursReconversion[]>()

        parcoursData.forEach(parcours => {
          const domainKey = getDomain(parcours.titre)
          if (!domainsMap.has(domainKey)) {
            domainsMap.set(domainKey, [])
          }
          domainsMap.get(domainKey)!.push(parcours)
        })

        // Convertir en tableau avec informations de domaine
        const domainsArray = Array.from(domainsMap.entries()).map(([key, parcours]) => {
          const domainConfig = getDomainConfig(key)
          return {
            ...domainConfig,
            parcours: parcours.sort((a, b) => a.titre.localeCompare(b.titre))
          }
        }).sort((a, b) => a.nom.localeCompare(b.nom))

        setDomains(domainsArray)
        setParcours(parcoursData)
      } catch (error) {
        console.error('Erreur lors du chargement des parcours:', error)
      } finally {
        setLoading(false)
      }
    }

    loadParcours()
  }, [])

  const handleFormationClick = (formation: ParcoursReconversion) => {
    setSelectedFormation(formation)
    setIsModalOpen(true)
  }

  const handleDetailClick = (formation: ParcoursReconversion) => {
    setSelectedFormationId(formation.id)
    setIsDetailModalOpen(true)
  }

  // Filter parcours based on search and filters - similar to FormationsCertifiantes
  const filteredDomains = activeFilter === 'all'
    ? domains.map(domain => ({
        ...domain,
        parcours: domain.parcours.filter((parcours: ParcoursReconversion) => {
          // Search filter
          const matchesSearch = searchTerm === '' ||
            parcours.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            parcours.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (parcours.competences || []).some(comp => comp.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (parcours.certifications_visees || []).some(cert => cert.toLowerCase().includes(searchTerm.toLowerCase()))

          // Duration filter - adapted for reconversion (generally longer)
          const matchesDuration = durationFilter === 'all' ||
            (durationFilter === 'short' && parcours.duree_formation.includes('mois') && parseInt(parcours.duree_formation) <= 6) ||
            (durationFilter === 'medium' && parcours.duree_formation.includes('mois') && parseInt(parcours.duree_formation) > 6 && parseInt(parcours.duree_formation) <= 12) ||
            (durationFilter === 'long' && (parcours.duree_formation.includes('mois') && parseInt(parcours.duree_formation) > 12) || parcours.duree_formation.includes('an'))

          // Modality filter
          const matchesModality = modalityFilter === 'all' ||
            parcours.modalites.toLowerCase().includes(modalityFilter.toLowerCase())

          return matchesSearch && matchesDuration && matchesModality
        })
      })).filter(domain => domain.parcours.length > 0)
    : domains.filter(domain => domain.id === activeFilter).map(domain => {
        let filteredParcours = domain.parcours.filter((parcours: ParcoursReconversion) => {
          const matchesSearch = searchTerm === '' ||
            parcours.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            parcours.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (parcours.competences || []).some(comp => comp.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (parcours.certifications_visees || []).some(cert => cert.toLowerCase().includes(searchTerm.toLowerCase()))

          const matchesDuration = durationFilter === 'all' ||
            (durationFilter === 'short' && parcours.duree_formation.includes('mois') && parseInt(parcours.duree_formation) <= 6) ||
            (durationFilter === 'medium' && parcours.duree_formation.includes('mois') && parseInt(parcours.duree_formation) > 6 && parseInt(parcours.duree_formation) <= 12) ||
            (durationFilter === 'long' && (parcours.duree_formation.includes('mois') && parseInt(parcours.duree_formation) > 12) || parcours.duree_formation.includes('an'))

          const matchesModality = modalityFilter === 'all' ||
            parcours.modalites.toLowerCase().includes(modalityFilter.toLowerCase())

          return matchesSearch && matchesDuration && matchesModality
        })

        return {
          ...domain,
          parcours: filteredParcours
        }
      }).filter(domain => domain.parcours.length > 0)

  // Flatten all parcours for pagination
  const allFilteredFormations = filteredDomains.flatMap(domain =>
    domain.parcours.map((parcours: ParcoursReconversion) => ({
      ...parcours,
      categoryName: 'Reconversion',
      categoryConfig: getCategoryConfig(),
      domainConfig: domain
    }))
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
  }, [searchTerm, durationFilter, modalityFilter, activeFilter])

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

  if (parcours.length === 0 && !loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-3-8.944a9.002 9.002 0 018.944 8.944M12 12v.01M12 12V8" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun parcours de reconversion disponible</h3>
            <p className="text-gray-500">Les parcours de reconversion seront bientôt disponibles.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-indigo-400 to-pink-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        

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
                <p className="text-xs text-gray-600">Choisissez votre spécialité</p>
              </div>

              {/* All Parcours Option */}
              <button
                onClick={() => handleFilterClick('all')}
                className={`w-full p-3 rounded-xl font-medium transition-all duration-300 mb-2 ${
                  activeFilter === 'all'
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
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
                        {domains.reduce((total, domain) => total + domain.parcours.length, 0)} parcours
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              {/* Domain Navigation */}
              <div className="space-y-2">
                {domains.map((domain) => {
                  const isActive = activeFilter === domain.id

                  return (
                    <div key={domain.id}>
                      <button
                        onClick={() => handleFilterClick(domain.id)}
                        className={`w-full p-3 rounded-xl font-medium transition-all duration-300 ${
                          isActive
                            ? `bg-gradient-to-r ${domain.gradient} text-white shadow-lg`
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-10 h-10 ${isActive ? 'bg-white/20' : domain.bgColor} rounded-lg flex items-center justify-center mr-3`}>
                              <span className="text-xl">{domain.icon}</span>
                            </div>
                            <div className="text-left">
                              <div className="font-semibold text-sm">{domain.nom}</div>
                              <div className="text-xs opacity-75">
                                {domain.parcours.length} parcours
                              </div>
                            </div>
                          </div>
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            isActive ? 'bg-white/20' : 'bg-gray-200 text-gray-600'
                          }`}>
                            {domain.parcours.length}
                          </div>
                        </div>
                      </button>
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
                    <option value="short">Courte (≤ 6 mois)</option>
                    <option value="medium">Moyenne (6-12 mois)</option>
                    <option value="long">Longue (+ de 12 mois)</option>
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
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-4 space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Rechercher un parcours..."
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

              {/* Mobile Filters Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Duration Filter Mobile */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Durée</label>
                  <select
                    value={durationFilter}
                    onChange={(e) => setDurationFilter(e.target.value)}
                    className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="all">Toutes</option>
                    <option value="short">≤ 6 mois</option>
                    <option value="medium">6-12 mois</option>
                    <option value="long">+ 12 mois</option>
                  </select>
                </div>

                {/* Modality Filter Mobile */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Modalité</label>
                  <select
                    value={modalityFilter}
                    onChange={(e) => setModalityFilter(e.target.value)}
                    className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="all">Toutes</option>
                    <option value="présentiel">Présentiel</option>
                    <option value="distanciel">Distanciel</option>
                    <option value="hybride">Hybride</option>
                  </select>
                </div>

                {/* Domain Filter Mobile */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Domaine</label>
                  <select
                    value={domainFilter}
                    onChange={(e) => setDomainFilter(e.target.value)}
                    className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="all">Tous</option>
                    <option value="cloud-devops">Cloud & DevOps</option>
                    <option value="cybersecurite">Cybersécurité</option>
                    <option value="data">Data & Analytics</option>
                    <option value="microsoft">Microsoft 365</option>
                    <option value="infrastructure">Infrastructure</option>
                    <option value="autre">Autres</option>
                  </select>
                </div>
              </div>

              {/* Clear Filters Mobile */}
              {(searchTerm || durationFilter !== 'all' || modalityFilter !== 'all' || domainFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setDurationFilter('all')
                    setModalityFilter('all')
                    setDomainFilter('all')
                    setCurrentPage(1)
                  }}
                  className="w-full py-2 px-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-all duration-200 text-xs font-medium"
                >
                  <svg className="w-3 h-3 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Réinitialiser tous les filtres
                </button>
              )}

              {/* Quick Stats Mobile */}
              <div className="text-center pt-2 border-t border-gray-200">
                <div className="text-sm font-bold text-indigo-600">
                  {totalItems} parcours trouvé{totalItems > 1 ? 's' : ''}
                </div>
                {totalPages > 1 && (
                  <div className="text-xs text-gray-500 mt-1">
                    Page {currentPage} sur {totalPages}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {/* Results Summary */}
            {totalItems > 0 && (
              <div className="mb-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {totalItems} parcours de reconversion trouvé{totalItems > 1 ? 's' : ''}
                </h3>
                {totalPages > 1 && (
                  <p className="text-gray-600">
                    Affichage de {startIndex + 1} à {Math.min(endIndex, totalItems)} sur {totalItems} parcours
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
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${formation.domainConfig.gradient}`}></div>

                    <div className="p-6 lg:p-8">
                      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

                        {/* Left Column - Main Info */}
                        <div className="flex-1">
                          <div className="mb-6">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                              <h4 className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-indigo-700 transition-colors">
                                {formation.titre}
                              </h4>
                            </div>
                            <p className="text-gray-600 text-lg leading-relaxed">{formation.description}</p>
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
                                <div className="text-purple-600">{formation.modalites}</div>
                              </div>
                            </div>
                          </div>

                          {/* Certifications */}
                          <div className="mb-6">
                            <div className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                              Objectifs principaux
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {(formation.certifications_visees || []).slice(0, 2).map((cert: string, index: number) => (
                                <span key={index} className={`bg-gradient-to-r ${formation.domainConfig.gradient} text-white text-sm font-bold px-4 py-2 rounded-full shadow-sm`}>
                                  {cert}
                                </span>
                              ))}
                              {(formation.certifications_visees || []).length > 2 && (
                                <span className="bg-gray-100 text-gray-600 text-sm font-medium px-4 py-2 rounded-full border border-gray-200">
                                  +{(formation.certifications_visees || []).length - 2} autres...
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Compétences */}
                          <div className="mb-6">
                            <div className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              Compétences acquises
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {(formation.competences || []).slice(0, 2).map((comp: string, index: number) => (
                                <span key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 text-sm font-medium px-4 py-2 rounded-full border border-blue-200">
                                  {comp}
                                </span>
                              ))}
                              {(formation.competences || []).length > 2 && (
                                <span className="bg-gray-100 text-gray-600 text-sm font-medium px-4 py-2 rounded-full border border-gray-200">
                                  +{(formation.competences || []).length - 2} autres...
                                </span>
                              )}
                            </div>
                          </div>

                        </div>

                        {/* Right Column - Actions */}
                        <div className="flex-shrink-0 lg:w-64">
                          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 h-full flex flex-col justify-center">
                            <div className="text-center mb-6">
                              <div className={`w-16 h-16 bg-gradient-to-r ${formation.domainConfig.gradient} rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                                <span className="text-3xl">{formation.domainConfig.icon}</span>
                              </div>
                              <div className="text-sm text-gray-600 mb-2">Parcours</div>
                              <div className="text-lg font-bold text-gray-900">
                                {formation.domainConfig.nom}
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
                                className={`w-full bg-gradient-to-r ${formation.domainConfig.gradient} hover:shadow-xl text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 relative overflow-hidden group`}
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
                          : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
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
                            ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
                            : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
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
                          : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
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
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formation={selectedFormation ? {
          id: selectedFormation.id,
          titre: selectedFormation.titre,
          duree: selectedFormation.duree_formation,
          type: 'reconversion'
        } : null}
      />

      <FormationDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        formationId={selectedFormationId}
        formationType="reconversion"
      />
    </section>
  )
}
