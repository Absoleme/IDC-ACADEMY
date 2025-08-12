'use client'
import { useState, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface Formation {
  id: string
  type: string
  titre: string
  categorie?: string
  sous_categorie?: string
  resume?: string
  description?: string
  public?: string
  prerequis?: string
  duree_formation: string
  objectifs?: string[]
  programme_detaille?: Array<{
    module: string
    duree: string
    contenus: string[]
    activites: string[]
    resultats_attendus: string[]
  }>
  modules?: Array<{
    module: string
    duree: string
    contenus: string[]
    activites: string[]
    resultats_attendus?: string[]
  }>
  competences?: string[]
  certifications_visees?: string[]
  certifications_inclues?: string[]
  postes_accessibles?: string[]
  modalites?: string[]
  prix?: string
  moyen_et_modalite?: string
  moyens_techniques?: string
  stats?: {
    insertion_professionnelle?: string
    taux_cdi?: string
  }
  structure?: {
    theorie_heures?: number
    stage_heures?: number
    coaching_duree?: string
  }
  meta?: {
    financement_eligibilite?: string[]
  }
  handicap?: {
    texte?: string
    partenaires?: {
      [key: string]: {
        contacts?: string[]
        email?: string
        canal?: string
        nom?: string
        adresse?: string
        telephone?: string
      }
    }
  }
}

interface FormationDetailModalProps {
  isOpen: boolean
  onClose: () => void
  formationId?: string
  formationType: 'formation' | 'parcours'
}

export default function FormationDetailModal({ isOpen, onClose, formationId, formationType }: FormationDetailModalProps) {
  const [formation, setFormation] = useState<Formation | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isOpen && formationId) {
      loadFormationDetails()
    }
  }, [isOpen, formationId])

  const loadFormationDetails = async () => {
    if (!formationId) return
    
    setLoading(true)
    try {
      const apiPath = formationType === 'formation' ? 'formations' : 'parcours'
      // Pour les parcours, enlever le préfixe "parcours-" de l'ID pour l'API
      const apiId = formationType === 'parcours' && formationId.startsWith('parcours-') 
        ? formationId.replace('parcours-', '') 
        : formationId
      
      const response = await fetch(`/api/${apiPath}/${apiId}`)
      if (response.ok) {
        const data = await response.json()
        setFormation(data)
      }
    } catch (error) {
      console.error('Error loading formation details:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  const getCategoryConfig = (categoryName?: string) => {
    if (!categoryName) return { icon: '💻', gradient: 'from-gray-500 to-slate-500' }
    
    const name = categoryName.toLowerCase()
    if (name.includes('cloud')) return { icon: '☁️', gradient: 'from-blue-500 to-cyan-500' }
    if (name.includes('cyber') || name.includes('sécurité')) return { icon: '🔒', gradient: 'from-red-500 to-pink-500' }
    if (name.includes('data')) return { icon: '📊', gradient: 'from-green-500 to-emerald-500' }
    if (name.includes('devops')) return { icon: '⚙️', gradient: 'from-purple-500 to-indigo-500' }
    if (name.includes('ia')) return { icon: '🤖', gradient: 'from-orange-500 to-yellow-500' }
    return { icon: '💻', gradient: 'from-indigo-500 to-purple-500' }
  }

  const categoryConfig = getCategoryConfig(formation?.categorie)

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start sm:items-center justify-center p-0 sm:p-4 z-50 animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-none sm:rounded-2xl max-w-full sm:max-w-2xl lg:max-w-4xl xl:max-w-6xl w-full h-full sm:max-h-[90vh] shadow-2xl border-0 sm:border border-gray-100 animate-slideUp flex flex-col">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6"></div>
            <p className="text-gray-600">Chargement des détails...</p>
          </div>
        ) : formation ? (
          <div className="flex flex-col h-full min-h-0 relative">
            {/* Bouton fermer mobile fixe */}
            <button
              onClick={onClose}
              className="sm:hidden fixed top-4 right-4 z-10 bg-white/90 backdrop-blur-sm text-gray-700 hover:text-gray-900 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            
            {/* Header - masqué sur mobile */}
            <div className={`hidden sm:block p-4 sm:p-8 lg:p-12 bg-gradient-to-r ${categoryConfig.gradient} text-white relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 flex-1">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white/20 rounded-3xl flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl backdrop-blur-sm shadow-lg flex-shrink-0">
                    {categoryConfig.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                      {formation.titre}
                    </h2>
                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
                      {formation.categorie && (
                        <span className="bg-white/20 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                          {formation.categorie}
                        </span>
                      )}
                      {formation.sous_categorie && (
                        <span className="bg-white/20 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                          {formation.sous_categorie}
                        </span>
                      )}
                      <span className="bg-white/20 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                        📅 {formation.duree_formation}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base lg:text-xl xl:text-2xl opacity-90 leading-relaxed">
                      {formation.resume || formation.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-white/80 hover:text-white hover:bg-white/10 rounded-xl p-2 sm:p-3 transition-all duration-200 self-start sm:self-auto"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto min-h-0">
              <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
                
                {/* Titre mobile simple */}
                <div className="sm:hidden pt-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                      {categoryConfig.icon}
                    </div>
                    <div className="flex-1">
                      <h1 className="text-xl font-bold text-gray-900 leading-tight">
                        {formation.titre}
                      </h1>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formation.categorie && (
                          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                            {formation.categorie}
                          </span>
                        )}
                        <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
                          📅 {formation.duree_formation}
                        </span>
                      </div>
                    </div>
                  </div>
                  {formation.resume || formation.description ? (
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {formation.resume || formation.description}
                    </p>
                  ) : null}
                </div>
                
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                  {/* Colonne gauche */}
                  <div className="space-y-6 lg:space-y-8">
                    
                    {/* Public cible */}
                    {formation.public && (
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                        <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                          <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          Public ciblé
                        </h3>
                        <p className="text-gray-700 leading-relaxed">{formation.public}</p>
                      </div>
                    )}

                    {/* Prérequis */}
                    {formation.prerequis && (
                      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-200">
                        <h3 className="text-xl font-bold text-orange-900 mb-4 flex items-center">
                          <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Prérequis
                        </h3>
                        <p className="text-gray-700 leading-relaxed">{formation.prerequis}</p>
                      </div>
                    )}

                    {/* Objectifs */}
                    {formation.objectifs && formation.objectifs.length > 0 && (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                        <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center">
                          <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                          Objectifs pédagogiques
                        </h3>
                        <ul className="space-y-3">
                          {formation.objectifs.map((objectif, index) => (
                            <li key={index} className="flex items-start">
                              <span className="w-6 h-6 bg-green-500 text-white text-sm rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                {index + 1}
                              </span>
                              <span className="text-gray-700 leading-relaxed">{objectif}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Colonne droite */}
                  <div className="space-y-6 lg:space-y-8">
                    
                    {/* Compétences */}
                    {formation.competences && formation.competences.length > 0 && (
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                        <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center">
                          <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          Compétences acquises
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {formation.competences.map((competence, index) => (
                            <span key={index} className={`bg-gradient-to-r ${categoryConfig.gradient} text-white text-sm font-semibold px-3 py-2 rounded-full shadow-sm`}>
                              {competence}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Certifications */}
                    {((formation.certifications_visees && formation.certifications_visees.length > 0) || 
                      (formation.certifications_inclues && formation.certifications_inclues.length > 0)) && (
                      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-200">
                        <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center">
                          <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                          Certifications
                        </h3>
                        <div className="space-y-3">
                          {formation.certifications_visees && formation.certifications_visees.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-2">Visées :</h4>
                              <div className="flex flex-wrap gap-2">
                                {formation.certifications_visees.map((cert, index) => (
                                  <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full border border-blue-200">
                                    {cert.replace('cert-', '').toUpperCase()}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          {formation.certifications_inclues && formation.certifications_inclues.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-2">Incluses :</h4>
                              <div className="flex flex-wrap gap-2">
                                {formation.certifications_inclues.map((cert, index) => (
                                  <span key={index} className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full border border-green-200">
                                    {cert.replace('cert-', '').toUpperCase()}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Postes accessibles */}
                    {formation.postes_accessibles && formation.postes_accessibles.length > 0 && (
                      <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                          <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                          </svg>
                          Postes accessibles
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {formation.postes_accessibles.map((poste, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-xl p-3 text-center font-medium text-gray-700">
                              {poste}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Modalités et financement */}
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
                      <h3 className="text-xl font-bold text-yellow-900 mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        Informations pratiques
                      </h3>
                      <div className="space-y-3">
                        {formation.modalites && formation.modalites.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-700 mb-2">Modalités :</h4>
                            <div className="flex flex-wrap gap-2">
                              {formation.modalites.map((modalite, index) => (
                                <span key={index} className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                                  {modalite}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {formation.prix && (
                          <div>
                            <h4 className="font-semibold text-gray-700 mb-2">Prix :</h4>
                            <span className="text-lg font-bold text-orange-600">{formation.prix}</span>
                          </div>
                        )}
                        {formation.meta?.financement_eligibilite && formation.meta.financement_eligibilite.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-700 mb-2">Financements éligibles :</h4>
                            <div className="flex flex-wrap gap-1">
                              {formation.meta.financement_eligibilite.map((financement, index) => (
                                <span key={index} className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                                  {financement}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Programme détaillé */}
                {((formation.programme_detaille && formation.programme_detaille.length > 0) || 
                  (formation.modules && formation.modules.length > 0)) && (
                  <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <svg className="w-8 h-8 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Programme détaillé
                    </h3>
                    <div className="space-y-6">
                      {(formation.programme_detaille || formation.modules || []).map((module, index) => (
                        <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-bold text-gray-900">{module.module}</h4>
                            <span className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full">
                              {module.duree}
                            </span>
                          </div>
                          <div className={`grid ${module.resultats_attendus && module.resultats_attendus.length > 0 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4`}>
                            <div>
                              <h5 className="font-semibold text-gray-700 mb-2">Contenus :</h5>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {(module.contenus || []).map((contenu, i) => (
                                  <li key={i} className="flex items-start">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                    {contenu}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-700 mb-2">Activités :</h5>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {(module.activites || []).map((activite, i) => (
                                  <li key={i} className="flex items-start">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                    {activite}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {(module.resultats_attendus && module.resultats_attendus.length > 0) && (
                              <div>
                                <h5 className="font-semibold text-gray-700 mb-2">Résultats attendus :</h5>
                                <ul className="text-sm text-gray-600 space-y-1">
                                  {(module.resultats_attendus || []).map((resultat, i) => (
                                    <li key={i} className="flex items-start">
                                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                      {resultat}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Moyens techniques et modalités */}
                {(formation.moyen_et_modalite || formation.moyens_techniques) && (
                  <div className="grid md:grid-cols-2 gap-6">
                    {formation.moyen_et_modalite && (
                      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-blue-900 mb-3">Moyens et modalités</h3>
                        <p className="text-gray-700 leading-relaxed">{formation.moyen_et_modalite}</p>
                      </div>
                    )}
                    {formation.moyens_techniques && (
                      <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-green-900 mb-3">Moyens techniques</h3>
                        <p className="text-gray-700 leading-relaxed">{formation.moyens_techniques}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Section Accessibilité Handicap */}
                {formation.handicap && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
                    <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
                      <svg className="w-8 h-8 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      Accessibilité & Handicap
                    </h3>
                    
                    {formation.handicap.texte && (
                      <div className="mb-6">
                        <p className="text-gray-700 leading-relaxed text-lg">
                          {formation.handicap.texte}
                        </p>
                      </div>
                    )}
                    
                    {formation.handicap.partenaires && Object.keys(formation.handicap.partenaires).length > 0 && (
                      <div>
                        <h4 className="text-xl font-bold text-blue-800 mb-4">Nos partenaires handicap :</h4>
                        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                          {Object.entries(formation.handicap.partenaires).map(([key, partenaire]) => (
                            <div key={key} className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm">
                              <h5 className="font-bold text-gray-900 mb-3">
                                {partenaire.nom || key.replace(/_/g, ' ').toUpperCase()}
                              </h5>
                              <div className="space-y-2 text-sm text-gray-600">
                                {partenaire.contacts && partenaire.contacts.length > 0 && (
                                  <div>
                                    <span className="font-semibold">Contacts: </span>
                                    {partenaire.contacts.join(', ')}
                                  </div>
                                )}
                                {partenaire.email && (
                                  <div>
                                    <span className="font-semibold">Email: </span>
                                    <a href={`mailto:${partenaire.email}`} className="text-blue-600 hover:text-blue-800">
                                      {partenaire.email}
                                    </a>
                                  </div>
                                )}
                                {partenaire.telephone && (
                                  <div>
                                    <span className="font-semibold">Téléphone: </span>
                                    <a href={`tel:${partenaire.telephone.replace(/\s/g, '')}`} className="text-blue-600 hover:text-blue-800">
                                      {partenaire.telephone}
                                    </a>
                                  </div>
                                )}
                                {partenaire.adresse && (
                                  <div>
                                    <span className="font-semibold">Adresse: </span>
                                    {partenaire.adresse}
                                  </div>
                                )}
                                {partenaire.canal && (
                                  <div>
                                    <span className="font-semibold">Contact: </span>
                                    {partenaire.canal}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Erreur de chargement</h3>
            <p className="text-gray-600 mb-6">Impossible de charger les détails de cette formation.</p>
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-6 py-2 rounded-xl hover:bg-gray-600 transition-colors"
            >
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  )
}