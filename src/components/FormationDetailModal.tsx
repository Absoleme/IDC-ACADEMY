'use client'
import { useState, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface CertificationInclue {
  id: string
  titre: string
  organisme: string
  description: string
}

interface Formation {
  id: string
  type: string
  titre: string
  categorie?: string
  sous_categorie?: string
  resume?: string
  description?: string
  public?: string
  prerequis?: string | string[]
  duree_formation: string
  objectifs?: string[]
  objectifs_et_metiers?: {
    presentation: string;
    activites_visees: string[];
    types_emplois_accessibles: string[];
    secteurs_activite: string[];
  }
  publics_et_prerequis?: {
    publics: string[];
    prerequis_entree_formation: string;
    prerequis_pour_la_validation: string | null;
  }
  programme_et_contenus?: {
    blocs_de_competences: {
      code: string;
      intitule: string;
      competences: string[];
    }[];
    parcours_transverses: string[];
  }
  modalites_evaluation?: {
    epreuves: {
      type: string;
      duree: string;
      description: string;
    }[];
    duree_totale_epreuves: string;
    capitalisation: string;
  }
  details_de_la_formation?: {
    duree_totale_heures: number;
    duree_centre_heures: number;
    duree_entreprise_heures: number;
    stage_en_entreprise: string;
    dates_previsionnelles: string;
    tarifs: string;
    financements_possibles: string[];
    lieu: string;
  }
  accessibilite?: string;
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
  certifications_inclues?: string[] | CertificationInclue[]
  postes_accessibles?: string[]
  modalites?: string[]
  prix?: string | {
    tarif_individuel?: string
    tarif_entreprise?: string
    aides?: string[]
  }
  moyen_et_modalite?: string | {
    pedagogie?: string[]
    modalites?: string[]
  }
  moyens_techniques?: string | {
    materiels?: string[]
    logiciels?: string[]
    plateformes?: string[]
  }
  stats?: {
    insertion_professionnelle?: string
    taux_cdi?: string
    taux_reussite?: string
    satisfaction?: string
  }
  structure?: {
    theorie_heures?: number
    pratique_heures?: number
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
    amenagements_possibles?: string[]
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 z-50 animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-none w-full h-full shadow-2xl border-0 animate-slideUp flex flex-col">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6"></div>
            <p className="text-gray-600">Chargement des détails...</p>
          </div>
        ) : formation ? (
          <div className="flex flex-col h-full min-h-0 relative">
            {/* Bouton fermer fixe */}
            <button
              onClick={onClose}
              className="fixed top-4 right-4 z-10 bg-white/90 backdrop-blur-sm text-gray-700 hover:text-gray-900 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            
            {/* Header */}
            <div className={`p-4 sm:p-6 bg-gradient-to-r ${categoryConfig.gradient} text-white relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative flex flex-col sm:flex-row justify-between items-start gap-3">
                <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4 flex-1">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl backdrop-blur-sm shadow-lg flex-shrink-0">
                    {categoryConfig.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 leading-tight">
                      {formation.titre}
                    </h2>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formation.categorie && (
                        <span className="bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-xs font-semibold">
                          {formation.categorie}
                        </span>
                      )}
                      {formation.sous_categorie && (
                        <span className="bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-xs font-semibold">
                          {formation.sous_categorie}
                        </span>
                      )}
                      <span className="bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-xs font-semibold">
                        📅 {formation.duree_formation}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base opacity-90 leading-relaxed">
                      {formation.resume || formation.objectifs_et_metiers?.presentation || formation.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto min-h-0">
              <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
                
                
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                  {/* Colonne gauche */}
                  <div className="space-y-6 lg:space-y-8">

                    {/* Activités visées - Spécifique au JSON technicien */}
                    {formation.objectifs_et_metiers?.activites_visees && (
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200">
                        <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center">
                          <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                          </svg>
                          Activités visées
                        </h3>
                        <ul className="space-y-3">
                          {formation.objectifs_et_metiers.activites_visees.map((activite, index) => (
                            <li key={index} className="flex items-start">
                              <span className="w-6 h-6 bg-purple-500 text-white text-sm rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                {index + 1}
                              </span>
                              <span className="text-gray-700 leading-relaxed">{activite}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Secteurs d'activité */}
                    {formation.objectifs_et_metiers?.secteurs_activite && (
                      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-200">
                        <h3 className="text-xl font-bold text-cyan-900 mb-4 flex items-center">
                          <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          Secteurs d'activité
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {formation.objectifs_et_metiers.secteurs_activite.map((secteur, index) => (
                            <span key={index} className="bg-cyan-100 text-cyan-800 text-sm font-medium px-3 py-2 rounded-full border border-cyan-200">
                              {secteur}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Public cible */}
                    {(formation.public || formation.publics_et_prerequis?.publics) && (
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                        <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                          <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          Public ciblé
                        </h3>
                        {formation.publics_et_prerequis?.publics ? (
                          <ul className="space-y-2">
                            {formation.publics_et_prerequis.publics.map((publicCible, index) => (
                              <li key={index} className="flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                <span className="text-gray-700">{publicCible}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-700 leading-relaxed">{formation.public}</p>
                        )}
                      </div>
                    )}

                    {/* Prérequis */}
                    {(formation.prerequis || formation.publics_et_prerequis?.prerequis_entree_formation) && (
                      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-200">
                        <h3 className="text-xl font-bold text-orange-900 mb-4 flex items-center">
                          <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Prérequis
                        </h3>
                        {formation.publics_et_prerequis?.prerequis_entree_formation ? (
                          <p className="text-gray-700 leading-relaxed">{formation.publics_et_prerequis.prerequis_entree_formation}</p>
                        ) : Array.isArray(formation.prerequis) ? (
                          <ul className="text-gray-700 leading-relaxed space-y-2">
                            {formation.prerequis.map((req, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-orange-600 mr-2">•</span>
                                {req}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-700 leading-relaxed">{formation.prerequis}</p>
                        )}
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
                                {formation.certifications_inclues.map((cert, index) => {
                                  const certName = typeof cert === 'string' 
                                    ? cert.replace('cert-', '').toUpperCase()
                                    : cert.id.replace('cert-', '').toUpperCase()
                                  return (
                                    <span key={index} className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full border border-green-200">
                                      {certName}
                                    </span>
                                  )
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Postes accessibles */}
                    {((formation.postes_accessibles && formation.postes_accessibles.length > 0) || (formation.objectifs_et_metiers?.types_emplois_accessibles && formation.objectifs_et_metiers.types_emplois_accessibles.length > 0)) && (
                      <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                          <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                          </svg>
                          Postes accessibles
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {(formation.objectifs_et_metiers?.types_emplois_accessibles || formation.postes_accessibles || []).map((poste, index) => (
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
                        {(formation.prix || formation.details_de_la_formation?.tarifs) && (
                          <div>
                            <h4 className="font-semibold text-gray-700 mb-2">Prix :</h4>
                            {formation.details_de_la_formation?.tarifs ? (
                              <span className="text-lg font-bold text-orange-600">{formation.details_de_la_formation.tarifs}</span>
                            ) : typeof formation.prix === 'string' ? (
                              <span className="text-lg font-bold text-orange-600">{formation.prix}</span>
                            ) : formation.prix && (
                              <div className="space-y-2">
                                {formation.prix.tarif_individuel && (
                                  <div>
                                    <span className="text-sm font-semibold text-gray-700">Particulier : </span>
                                    <span className="text-orange-600 font-bold">{formation.prix.tarif_individuel}</span>
                                  </div>
                                )}
                                {formation.prix.tarif_entreprise && (
                                  <div>
                                    <span className="text-sm font-semibold text-gray-700">Entreprise : </span>
                                    <span className="text-orange-600 font-bold">{formation.prix.tarif_entreprise}</span>
                                  </div>
                                )}
                                {formation.prix.aides && formation.prix.aides.length > 0 && (
                                  <div>
                                    <span className="text-sm font-semibold text-gray-700">Aides : </span>
                                    <div className="text-sm text-gray-600">
                                      {formation.prix.aides.map((aide, i) => (
                                        <div key={i}>• {aide}</div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
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

                {/* Blocs de compétences - Spécifique technicien */}
                {formation.programme_et_contenus?.blocs_de_competences && (
                  <div className="bg-white border-2 border-indigo-200 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-indigo-900 mb-6 flex items-center">
                      <svg className="w-8 h-8 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-4H3m16 8H7m12-4H3" />
                      </svg>
                      Blocs de compétences RNCP
                    </h3>
                    <div className="space-y-6">
                      {formation.programme_et_contenus.blocs_de_competences.map((bloc, index) => (
                        <div key={index} className="border border-indigo-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-bold text-gray-900">{bloc.intitule}</h4>
                            <span className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full">
                              {bloc.code}
                            </span>
                          </div>
                          <div className="space-y-3">
                            <h5 className="font-semibold text-gray-700 mb-2">Compétences :</h5>
                            <ul className="space-y-2">
                              {bloc.competences.map((competence, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                  <span className="text-gray-600">{competence}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Parcours transverses */}
                    {formation.programme_et_contenus.parcours_transverses && formation.programme_et_contenus.parcours_transverses.length > 0 && (
                      <div className="mt-6 bg-indigo-50 border border-indigo-200 rounded-xl p-6">
                        <h4 className="text-lg font-bold text-indigo-900 mb-3">Parcours transverses</h4>
                        <div className="flex flex-wrap gap-2">
                          {formation.programme_et_contenus.parcours_transverses.map((parcours, index) => (
                            <span key={index} className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-2 rounded-full">
                              {parcours}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

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
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                      <p className="text-sm text-amber-800 font-medium flex items-center">
                        <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Ce programme peut être adapté selon vos besoins spécifiques
                      </p>
                    </div>
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
                        {typeof formation.moyen_et_modalite === 'string' ? (
                          <p className="text-gray-700 leading-relaxed">{formation.moyen_et_modalite}</p>
                        ) : (
                          <div className="space-y-4">
                            {formation.moyen_et_modalite.pedagogie && (
                              <div>
                                <h4 className="font-semibold text-gray-700 mb-2">Pédagogie :</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                  {formation.moyen_et_modalite.pedagogie.map((item, i) => (
                                    <li key={i} className="flex items-start">
                                      <span className="text-blue-600 mr-2">•</span>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {formation.moyen_et_modalite.modalites && (
                              <div>
                                <h4 className="font-semibold text-gray-700 mb-2">Modalités :</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                  {formation.moyen_et_modalite.modalites.map((item, i) => (
                                    <li key={i} className="flex items-start">
                                      <span className="text-blue-600 mr-2">•</span>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    {formation.moyens_techniques && (
                      <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-green-900 mb-3">Moyens techniques</h3>
                        {typeof formation.moyens_techniques === 'string' ? (
                          <p className="text-gray-700 leading-relaxed">{formation.moyens_techniques}</p>
                        ) : (
                          <div className="space-y-4">
                            {formation.moyens_techniques.materiels && (
                              <div>
                                <h4 className="font-semibold text-gray-700 mb-2">Matériels :</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                  {formation.moyens_techniques.materiels.map((item, i) => (
                                    <li key={i} className="flex items-start">
                                      <span className="text-green-600 mr-2">•</span>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {formation.moyens_techniques.logiciels && (
                              <div>
                                <h4 className="font-semibold text-gray-700 mb-2">Logiciels :</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                  {formation.moyens_techniques.logiciels.map((item, i) => (
                                    <li key={i} className="flex items-start">
                                      <span className="text-green-600 mr-2">•</span>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {formation.moyens_techniques.plateformes && (
                              <div>
                                <h4 className="font-semibold text-gray-700 mb-2">Plateformes :</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                  {formation.moyens_techniques.plateformes.map((item, i) => (
                                    <li key={i} className="flex items-start">
                                      <span className="text-green-600 mr-2">•</span>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Modalités d'évaluation - Spécifique technicien */}
                {formation.modalites_evaluation && (
                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-8 border border-yellow-200">
                    <h3 className="text-2xl font-bold text-yellow-900 mb-6 flex items-center">
                      <svg className="w-8 h-8 mr-3 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                      Modalités d'évaluation
                    </h3>
                    
                    {formation.modalites_evaluation.epreuves && (
                      <div className="mb-6">
                        <h4 className="text-lg font-bold text-yellow-800 mb-4">Épreuves :</h4>
                        <div className="space-y-4">
                          {formation.modalites_evaluation.epreuves.map((epreuve, index) => (
                            <div key={index} className="bg-white rounded-xl p-4 border border-yellow-200">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-bold text-gray-900">{epreuve.type}</h5>
                                <span className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-2 py-1 rounded">
                                  {epreuve.duree}
                                </span>
                              </div>
                              <p className="text-gray-700 text-sm">{epreuve.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4">
                      {formation.modalites_evaluation.duree_totale_epreuves && (
                        <div className="bg-white rounded-xl p-4 border border-yellow-200">
                          <h5 className="font-bold text-gray-900 mb-2">Durée totale</h5>
                          <p className="text-yellow-700 font-semibold">{formation.modalites_evaluation.duree_totale_epreuves}</p>
                        </div>
                      )}
                      {formation.modalites_evaluation.capitalisation && (
                        <div className="bg-white rounded-xl p-4 border border-yellow-200">
                          <h5 className="font-bold text-gray-900 mb-2">Capitalisation</h5>
                          <p className="text-gray-700 text-sm">{formation.modalites_evaluation.capitalisation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Détails formation - Spécifique technicien */}
                {formation.details_de_la_formation && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
                    <h3 className="text-2xl font-bold text-green-900 mb-6 flex items-center">
                      <svg className="w-8 h-8 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Détails de la formation
                    </h3>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      {formation.details_de_la_formation.duree_totale_heures && (
                        <div className="bg-white rounded-xl p-4 border border-green-200 text-center">
                          <h5 className="font-bold text-gray-900 mb-1">Durée totale</h5>
                          <p className="text-2xl font-bold text-green-600">{formation.details_de_la_formation.duree_totale_heures}h</p>
                        </div>
                      )}
                      {formation.details_de_la_formation.duree_centre_heures && (
                        <div className="bg-white rounded-xl p-4 border border-green-200 text-center">
                          <h5 className="font-bold text-gray-900 mb-1">En centre</h5>
                          <p className="text-2xl font-bold text-blue-600">{formation.details_de_la_formation.duree_centre_heures}h</p>
                        </div>
                      )}
                      {formation.details_de_la_formation.duree_entreprise_heures && (
                        <div className="bg-white rounded-xl p-4 border border-green-200 text-center">
                          <h5 className="font-bold text-gray-900 mb-1">En entreprise</h5>
                          <p className="text-2xl font-bold text-purple-600">{formation.details_de_la_formation.duree_entreprise_heures}h</p>
                        </div>
                      )}
                    </div>

                    {formation.details_de_la_formation.stage_en_entreprise && (
                      <div className="bg-white rounded-xl p-4 border border-green-200 mb-4">
                        <h5 className="font-bold text-gray-900 mb-2">Stage en entreprise</h5>
                        <p className="text-gray-700">{formation.details_de_la_formation.stage_en_entreprise}</p>
                      </div>
                    )}

                    {formation.details_de_la_formation.financements_possibles && (
                      <div className="bg-white rounded-xl p-4 border border-green-200">
                        <h5 className="font-bold text-gray-900 mb-3">Financements possibles</h5>
                        <div className="flex flex-wrap gap-2">
                          {formation.details_de_la_formation.financements_possibles.map((financement, index) => (
                            <span key={index} className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                              {financement}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Section Accessibilité */}
                {formation.accessibilite && (
                  <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-8 border border-green-200">
                    <h3 className="text-2xl font-bold text-green-900 mb-6 flex items-center">
                      <svg className="w-8 h-8 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      Accessibilité
                    </h3>
                    <div className="bg-white rounded-xl p-6 border border-green-200">
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {formation.accessibilite}
                      </p>
                    </div>
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