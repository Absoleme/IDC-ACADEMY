'use client'
import { useState, useEffect } from 'react'
import { Parcours } from '@/types/formation'
import ContactModal from './ContactModal'

interface ParcoursSectionProps {
  title: string;
  description: string;
  id: string;
  niveaux?: string[];
}

interface ParcoursCategory {
  cloud: Parcours[];
  data: Parcours[];
  cybersecurity: Parcours[];
  devops: Parcours[];
  ai: Parcours[];
  fullstack: Parcours[];
}

const categoryLabels = {
  cloud: 'Cloud',
  data: 'Data & Analytics',
  cybersecurity: 'Cybersécurité',
  devops: 'DevOps',
  ai: 'Intelligence Artificielle & ML',
  fullstack: 'Développement Web'
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

export default function ParcoursSection({ title, description, id, niveaux = [] }: ParcoursSectionProps) {
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

  const categorizeParcours = (parcours: Parcours): keyof ParcoursCategory => {
    const titre = parcours.titre.toLowerCase()
    if (titre.includes('cloud') || titre.includes('azure') || titre.includes('aws')) return 'cloud'
    if (titre.includes('data') || titre.includes('analyst')) return 'data'
    if (titre.includes('cyber') || titre.includes('security') || titre.includes('soc')) return 'cybersecurity'
    if (titre.includes('devops')) return 'devops'
    if (titre.includes('ai') || titre.includes('ml') || titre.includes('intelligence')) return 'ai'
    if (titre.includes('fullstack') || titre.includes('web') || titre.includes('developer')) return 'fullstack'
    return 'fullstack'
  }

  const extractNiveau = (titre: string): string => {
    const match = titre.match(/niveau\s+(\d+)|n(\d+)/i)
    return match ? (match[1] || match[2]) : '0'
  }

  useEffect(() => {
    async function loadParcours() {
      try {
        const parcoursFiles = [
          'ai-ml-engineer-n7',
          'cloud-architect-n7', 
          'cloud-sysadmin-azure-n6',
          'cybersecurity-architect-manager-n7',
          'cybersecurity-soc-analyst-n6',
          'data-analyst-n6',
          'devops-engineer-azure-n7',
          'fullstack-web-developer-n6'
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
        const filteredParcours = niveaux.length > 0 
          ? validParcours.filter(p => niveaux.includes(extractNiveau(p.titre)))
          : validParcours

        const categorized: ParcoursCategory = {
          cloud: [],
          data: [],
          cybersecurity: [],
          devops: [],
          ai: [],
          fullstack: []
        }

        filteredParcours.forEach(parcours => {
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
  }, [niveaux])

  const handleContact = (parcours: Parcours) => {
    setSelectedParcours(parcours)
    setIsModalOpen(true)
  }

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
    <section id={id} className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
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

        <div className="space-y-12">
          {Object.entries(parcours).map(([category, parcourslist]) => {
            if (parcourslist.length === 0) return null
            
            const categoryStyle = categoryColors[category as keyof typeof categoryColors]
            return (
              <div key={category}>
                <div className="flex items-center mb-8">
                  <div className={`flex items-center px-6 py-3 rounded-2xl border-2 ${categoryStyle.badge} shadow-lg`}>
                    <span className="text-2xl mr-3">{categoryStyle.icon}</span>
                    <span className="text-lg font-bold">
                      {categoryLabels[category as keyof typeof categoryLabels]}
                    </span>
                  </div>
                  <div className={`flex-1 h-1 bg-gradient-to-r ${categoryStyle.gradient} ml-6 rounded-full`}></div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {parcourslist.map((parcours: Parcours, index: number) => (
                    <div key={parcours.id} className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 hover:scale-105 hover:-translate-y-3 relative overflow-hidden">
                      {/* Top gradient line */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${categoryStyle.gradient}`}></div>
                      
                      {/* Floating badge */}
                      <div className={`absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-r ${categoryStyle.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                        <span className="text-white font-bold text-sm">N{extractNiveau(parcours.titre)}</span>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-indigo-700 transition-colors">
                          {parcours.titre}
                        </h3>
                      
                        <div className="inline-block px-3 py-1 bg-gradient-to-r ${categoryStyle.gradient} text-white text-xs font-bold rounded-full mb-4">
                          RNCP Niveau {extractNiveau(parcours.titre)}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">{parcours.description}</p>
                      
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center text-sm">
                          <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">Durée: </span>
                            <span className="text-gray-600">{parcours.duree_formation}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">Insertion: </span>
                            <span className="text-green-600 font-bold">{parcours.stats.insertion_professionnelle}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          <div className="w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">CDI: </span>
                            <span className="text-purple-600 font-bold">{parcours.stats.taux_cdi}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                          <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                          Certifications incluses
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {parcours.certifications_inclues.slice(0, 3).map((cert, index) => (
                            <span key={index} className={`bg-gradient-to-r ${categoryStyle.gradient} text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm`}>
                              {cert.replace('cert-', '').toUpperCase()}
                            </span>
                          ))}
                          {parcours.certifications_inclues.length > 3 && (
                            <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full border border-gray-200">
                              +{parcours.certifications_inclues.length - 3} autres
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => handleContact(parcours)}
                        className={`w-full bg-gradient-to-r ${categoryStyle.gradient} hover:shadow-xl text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 relative overflow-hidden group`}
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          <svg className="w-5 h-5 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          Demander des informations
                        </span>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formation={selectedParcours ? {
          titre: selectedParcours.titre,
          type: 'parcours'
        } : undefined}
      />
    </section>
  )
}