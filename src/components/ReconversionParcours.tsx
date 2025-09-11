'use client'
import React, { useState, useEffect } from 'react'
import ContactModal from './ContactModal'

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
}

export default function ReconversionParcours() {
  const [parcours, setParcours] = useState<ParcoursReconversion[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedParcours, setSelectedParcours] = useState<ParcoursReconversion | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [expandedParcours, setExpandedParcours] = useState<string | null>(null)

  useEffect(() => {
    async function loadParcours() {
      try {
        // Import des fichiers JSON du dossier reconversion
        const modules = import.meta.glob('/src/reconversion/*.json')
        const parcoursData: ParcoursReconversion[] = []

        for (const path in modules) {
          const mod = await modules[path]() as any
          if (mod.default && mod.default.type === 'parcours_reconversion') {
            parcoursData.push(mod.default)
          }
        }

        setParcours(parcoursData)
      } catch (error) {
        console.error('Erreur lors du chargement des parcours:', error)
      } finally {
        setLoading(false)
      }
    }

    loadParcours()
  }, [])

  const handleContactClick = (parcours: ParcoursReconversion) => {
    setSelectedParcours(parcours)
    setIsModalOpen(true)
  }

  const toggleExpanded = (parcoursId: string) => {
    setExpandedParcours(expandedParcours === parcoursId ? null : parcoursId)
  }

  if (loading) {
    return (
      <div className="space-y-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse bg-white rounded-2xl p-8 shadow-xl">
            <div className="h-6 bg-gray-200 rounded w-2/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (parcours.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-3-8.944a9.002 9.002 0 018.944 8.944M12 12v.01M12 12V8" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun parcours disponible</h3>
        <p className="text-gray-500">Les parcours de reconversion seront bientôt disponibles.</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-8">
        {parcours.map((item, index) => (
          <div 
            key={item.id} 
            className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:scale-[1.01] relative overflow-hidden animate-fadeIn"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
            
            <div className="p-6 lg:p-8">
              <div className="grid lg:grid-cols-3 gap-8 items-start">
                
                {/* Left Column - Main Info */}
                <div className="lg:col-span-2">
                  <div className="mb-6">
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-indigo-700 transition-colors">
                      {item.titre}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <div className="text-sm text-gray-500">
                      <span className="font-semibold">Public cible:</span> {item.public}
                    </div>
                  </div>

                  {/* Key Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                      <div className="flex items-center mb-2">
                        <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-semibold text-blue-900">Durée</span>
                      </div>
                      <div className="text-blue-800">{item.duree_formation}</div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                      <div className="flex items-center mb-2">
                        <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-semibold text-green-900">Insertion</span>
                      </div>
                      <div className="text-green-800">{item.stats.insertion_professionnelle}</div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                      <div className="flex items-center mb-2">
                        <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="font-semibold text-purple-900">CDI</span>
                      </div>
                      <div className="text-purple-800">{item.stats.taux_cdi}</div>
                    </div>
                  </div>

                  {/* Objectifs Preview */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                      Objectifs principaux
                    </h4>
                    <div className="space-y-2">
                      {item.objectifs.slice(0, 3).map((objectif, idx) => (
                        <div key={idx} className="flex items-start">
                          <svg className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700 text-sm">{objectif}</span>
                        </div>
                      ))}
                      {item.objectifs.length > 3 && (
                        <button
                          onClick={() => toggleExpanded(item.id)}
                          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center mt-2"
                        >
                          {expandedParcours === item.id ? 'Voir moins' : `+${item.objectifs.length - 3} autres objectifs`}
                          <svg className={`w-4 h-4 ml-1 transform transition-transform ${expandedParcours === item.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedParcours === item.id && (
                    <div className="mt-6 space-y-6 border-t border-gray-200 pt-6">
                      {/* All Objectifs */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Tous les objectifs</h4>
                        <div className="space-y-2">
                          {item.objectifs.map((objectif, idx) => (
                            <div key={idx} className="flex items-start">
                              <svg className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-700 text-sm">{objectif}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Modules */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Programme détaillé</h4>
                        <div className="space-y-4">
                          {item.modules.map((module, idx) => (
                            <div key={idx} className="bg-gray-50 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-semibold text-gray-800">{module.module}</h5>
                                <span className="text-sm bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">{module.duree}</span>
                              </div>
                              <div className="text-sm text-gray-600 mb-2">
                                <strong>Contenus:</strong> {module.contenus.join(' • ')}
                              </div>
                              {module.activites.length > 0 && (
                                <div className="text-sm text-gray-600">
                                  <strong>Activités pratiques:</strong> {module.activites.join(' • ')}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Prerequisites */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Prérequis</h4>
                        <p className="text-gray-600 text-sm">{item.prerequis}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Action Card */}
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100 sticky top-4">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-lg text-gray-900 mb-2">Reconversion Professionnelle</h4>
                      <p className="text-sm text-gray-600 mb-4">Accompagnement complet pour changer de carrière</p>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Modalités:</span>
                        <span className="font-semibold text-gray-800">{item.modalites}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Prix:</span>
                        <span className="font-semibold text-indigo-600">{item.prix}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={() => toggleExpanded(item.id)}
                        className="w-full bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 flex items-center justify-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {expandedParcours === item.id ? 'Masquer les détails' : 'Voir les détails'}
                      </button>
                      
                      <button
                        onClick={() => handleContactClick(item)}
                        className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:shadow-xl text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 relative overflow-hidden group"
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

                    <div className="mt-4 pt-4 border-t border-indigo-200">
                      <div className="text-xs text-gray-500 text-center">
                        <div className="mb-1">
                          <strong>Contact:</strong>
                        </div>
                        <div>{item.contact.telephone}</div>
                        <div>{item.contact.email}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formation={selectedParcours ? {
          id: selectedParcours.id,
          titre: selectedParcours.titre,
          duree: selectedParcours.duree_formation,
          type: 'reconversion'
        } : null}
      />
    </>
  )
}