'use client'
import { useState, useEffect, useRef } from 'react'

interface ParcoursReconversion {
  id: string
  type: string
  titre: string
  description: string
  duree_formation: string
  modalites: string
  objectifs: string[]
  modules: Array<{
    module: string
    duree: string
    contenus: string[]
    activites: string[]
  }>
}

interface Domain {
  id: string
  nom: string
  icon: string
  parcours: ParcoursReconversion[]
}

interface DropdownReconversionProps {
  onParcoursClick: (parcours: ParcoursReconversion) => void
}

export default function DropdownReconversion({ onParcoursClick }: DropdownReconversionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [domains, setDomains] = useState<Domain[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSelectedDomain(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Charger les parcours quand le dropdown s'ouvre
  useEffect(() => {
    if (isOpen && domains.length === 0) {
      loadParcours()
    }
  }, [isOpen, domains.length])

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

  const getDomainInfo = (domainKey: string) => {
    const domainMap = {
      'cloud-devops': { nom: 'Cloud & DevOps', icon: '☁️' },
      'cybersecurite': { nom: 'Cybersécurité', icon: '🔒' },
      'data': { nom: 'Data & Analytics', icon: '📊' },
      'microsoft': { nom: 'Microsoft 365', icon: '🏢' },
      'infrastructure': { nom: 'Infrastructure & Systèmes', icon: '🖥️' },
      'autre': { nom: 'Autres', icon: '⚙️' }
    }
    return domainMap[domainKey as keyof typeof domainMap] || { nom: 'Autres', icon: '⚙️' }
  }

  const loadParcours = async () => {
    setLoading(true)
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
            parcoursData.push(module.default as ParcoursReconversion)
          }
        } catch (error) {
          console.warn(`Impossible de charger ${file}:`, error)
        }
      }

      // Organiser par domaine
      const domainsMap = new Map<string, ParcoursReconversion[]>()

      parcoursData.forEach(parcours => {
        const domainKey = getDomain(parcours.titre)
        if (!domainsMap.has(domainKey)) {
          domainsMap.set(domainKey, [])
        }
        domainsMap.get(domainKey)!.push(parcours)
      })

      // Convertir en tableau de domaines
      const domainsArray: Domain[] = Array.from(domainsMap.entries()).map(([key, parcours]) => {
        const domainInfo = getDomainInfo(key)
        return {
          id: key,
          nom: domainInfo.nom,
          icon: domainInfo.icon,
          parcours: parcours.sort((a, b) => a.titre.localeCompare(b.titre))
        }
      }).sort((a, b) => a.nom.localeCompare(b.nom))

      setDomains(domainsArray)
    } catch (error) {
      console.error('Erreur lors du chargement des parcours:', error)
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
      setSelectedDomain(null)
    }, 300) // Délai de 300ms pour permettre de naviguer dans le menu
  }

  const handleParcoursClick = (parcours: ParcoursReconversion) => {
    setIsOpen(false)
    setSelectedDomain(null)
    onParcoursClick(parcours)
  }

  const handleDomainClick = (domainId: string) => {
    setSelectedDomain(selectedDomain === domainId ? null : domainId)
  }

  // Fonction pour obtenir la couleur du domaine
  const getDomainColor = (domainName: string) => {
    const colors = {
      'cloud & devops': 'text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100',
      'cybersécurité': 'text-red-600 bg-red-50 border-red-200 hover:bg-red-100',
      'data & analytics': 'text-orange-600 bg-orange-50 border-orange-200 hover:bg-orange-100',
      'microsoft 365': 'text-indigo-600 bg-indigo-50 border-indigo-200 hover:bg-indigo-100',
      'infrastructure & systèmes': 'text-green-600 bg-green-50 border-green-200 hover:bg-green-100',
      'autres': 'text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100'
    }
    const key = domainName.toLowerCase()
    return colors[key as keyof typeof colors] || 'text-purple-600 bg-purple-50 border-purple-200 hover:bg-purple-100'
  }

  const selectedDomainData = domains.find(domain => domain.id === selectedDomain)

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Lien Reconversion */}
      <button className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 relative group flex items-center">
        Reconversion
        <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        <span className={`absolute -bottom-1 left-0 h-0.5 bg-indigo-600 transition-all duration-200 ${isOpen ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 animate-fadeIn flex"
          style={{ minWidth: selectedDomain ? '700px' : '300px' }}
        >
          {loading ? (
            <div className="px-4 py-8 text-center w-full">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
              <p className="text-gray-500 text-sm mt-2">Chargement des parcours...</p>
            </div>
          ) : (
            <>
              {/* Colonne des domaines */}
              <div className="py-4" style={{ minWidth: '300px' }}>
                <div className="px-4 mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Domaines</h3>
                  <p className="text-sm text-gray-500">Cliquez pour voir les parcours</p>
                </div>

                <div className="space-y-1">
                  {domains.map((domain) => (
                    <button
                      key={domain.id}
                      onClick={() => handleDomainClick(domain.id)}
                      className={`w-full px-4 py-3 text-left transition-all duration-200 border-l-4 ${
                        selectedDomain === domain.id
                          ? `${getDomainColor(domain.nom)} border-opacity-100`
                          : `hover:${getDomainColor(domain.nom)} border-transparent`
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-lg mr-3">{domain.icon}</span>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {domain.nom}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {domain.parcours.length} parcours
                            </div>
                          </div>
                        </div>
                        <svg
                          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                            selectedDomain === domain.id ? 'rotate-90' : ''
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

                {/* Lien vers tous les parcours */}
                <div className="border-t border-gray-100 mt-4 pt-4 px-4">
                  <a
                    href="/reconversion"
                    className="flex items-center justify-center w-full py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-150"
                  >
                    Voir tous nos parcours
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Colonne des parcours (affichée seulement si un domaine est sélectionné) */}
              {selectedDomain && selectedDomainData && (
                <div className="border-l border-gray-200 py-4 max-h-96 overflow-y-auto" style={{ minWidth: '400px' }}>
                  <div className="px-4 mb-4">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center">
                      <span className="text-xl mr-2">{selectedDomainData.icon}</span>
                      {selectedDomainData.nom}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedDomainData.parcours.length} parcours disponible{selectedDomainData.parcours.length > 1 ? 's' : ''}
                    </p>
                  </div>

                  <div className="space-y-1">
                    {selectedDomainData.parcours.map((parcours) => (
                      <button
                        key={parcours.id}
                        onClick={() => handleParcoursClick(parcours)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 border-l-2 border-transparent hover:border-indigo-500"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 mb-1">
                              {parcours.titre}
                            </h4>
                            <div className="flex items-center space-x-3 mb-1">
                              <span className="text-xs text-gray-500 flex items-center">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {parcours.duree_formation}
                              </span>
                              <span className="text-xs text-purple-600 font-medium bg-purple-50 px-2 py-0.5 rounded">
                                🔄 Reconversion
                              </span>
                            </div>
                            {parcours.description && (
                              <p className="text-xs text-gray-600 line-clamp-2">
                                {parcours.description.substring(0, 120)}...
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