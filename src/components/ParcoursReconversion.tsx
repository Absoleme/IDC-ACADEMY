'use client'
import { useState, useEffect } from 'react'
import { Parcours } from '@/types/formation'
import ContactModal from './ContactModal'

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
        // Filtrer uniquement les niveaux 6 et 7
        const parcoursRNCP = validParcours.filter(p => {
          const niveau = extractNiveau(p.titre)
          return niveau === '6' || niveau === '7'
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

        <div className="space-y-16">
          {Object.entries(parcours).map(([category, parcourslist]) => {
            if (parcourslist.length === 0) return null
            
            const categoryStyle = categoryColors[category as keyof typeof categoryColors]
            return (
              <div key={category} className="animate-slideUp">
                {/* Category Header */}
                <div className="flex items-center justify-center mb-12">
                  <div className={`flex items-center px-8 py-4 rounded-3xl border-2 ${categoryStyle.badge} shadow-lg`}>
                    <div className={`w-16 h-16 bg-gradient-to-r ${categoryStyle.gradient} rounded-2xl flex items-center justify-center mr-4 shadow-md`}>
                      <span className="text-3xl">{categoryStyle.icon}</span>
                    </div>
                    <div className="text-left">
                      <h3 className={`text-2xl font-bold ${categoryStyle.badge.split(' ')[2]}`}>
                        {categoryLabels[category as keyof typeof categoryLabels]}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {parcourslist.length} parcours RNCP niveau{parcourslist.length > 1 ? 'x' : ''} 6-7
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Parcours Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {parcourslist.map((parcours, index) => (
                    <div 
                      key={parcours.id} 
                      className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 hover:scale-105 hover:-translate-y-3 relative overflow-hidden"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      {/* Top gradient line */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${categoryStyle.gradient}`}></div>
                      
                      {/* Floating RNCP badge */}
                      <div className={`absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-r ${categoryStyle.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                        <span className="text-white font-bold text-sm">N{extractNiveau(parcours.titre)}</span>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-indigo-700 transition-colors">
                          {parcours.titre}
                        </h3>
                        <div className={`inline-block px-3 py-1 bg-gradient-to-r ${categoryStyle.gradient} text-white text-xs font-bold rounded-full mb-4`}>
                          RNCP Niveau {extractNiveau(parcours.titre)} - Reconversion Professionnelle
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
                            <span className="font-semibold text-gray-900">Insertion pro: </span>
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
                            <span className="font-semibold text-gray-900">Taux CDI: </span>
                            <span className="text-purple-600 font-bold">{parcours.stats.taux_cdi}</span>
                          </div>
                        </div>
                      </div>

                      {/* Certifications incluses */}
                      <div className="mb-8">
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

                      {/* Button */}
                      <button
                        onClick={() => handleContact(parcours)}
                        className={`w-full bg-gradient-to-r ${categoryStyle.gradient} hover:shadow-xl text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 relative overflow-hidden group`}
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
                  ))}
                </div>
              </div>
            )
          })}
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
                <p className="text-sm text-gray-600 text-center">CPF, Pôle Emploi, OPCO</p>
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
        } : undefined}
      />
    </section>
  )
}