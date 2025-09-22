'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import ContactModal from './ContactModal'

interface FormationsSectionProps {
  type: 'courtes' | 'reconversion' | 'rncp'
  title: string
  description: string
  id: string
}

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

export default function FormationsSection({ type, title, description, id }: FormationsSectionProps) {
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [loading, setLoading] = useState(true)
  
  const getCategoryIcon = (categoryName: string): { icon: string, gradient: string, bgColor: string } => {
    const name = categoryName.toLowerCase()
    if (name.includes('cloud'))
      return { icon: '☁️', gradient: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-50' }
    if (name.includes('cyber') || name.includes('sécurité'))
      return { icon: '🔒', gradient: 'from-red-500 to-pink-500', bgColor: 'bg-red-50' }
    if (name.includes('data'))
      return { icon: '📊', gradient: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50' }
    if (name.includes('devops'))
      return { icon: '⚙️', gradient: 'from-purple-500 to-indigo-500', bgColor: 'bg-purple-50' }
    if (name.includes('ia'))
      return { icon: '🤖', gradient: 'from-orange-500 to-yellow-500', bgColor: 'bg-orange-50' }
    if (name.includes('bureautique'))
      return { icon: '📄', gradient: 'from-amber-500 to-yellow-500', bgColor: 'bg-amber-50' }
    return { icon: '💻', gradient: 'from-gray-500 to-slate-500', bgColor: 'bg-gray-50' }
  }

  const getFormationsForType = (categories: CategoryData[]) => {
    switch (type) {
      case 'courtes':
        // Formations courtes : formations de 1 à 5 jours
        return categories.map(cat => ({
          ...cat,
          formations: cat.formations.filter(f => 
            f.duree_formation.includes('jour') && 
            parseInt(f.duree_formation) <= 5
          )
        })).filter(cat => cat.formations.length > 0)
      case 'reconversion':
        // Formations en reconversion : formations longues avec débouchés professionnels
        return categories.map(cat => ({
          ...cat,
          formations: cat.formations.filter(f => 
            (f.duree_formation.includes('semaine') || 
             f.duree_formation.includes('mois') ||
             f.postes_accessibles.length > 2) && // Formations avec plusieurs débouchés
            (cat.nom.toLowerCase().includes('data') || 
             cat.nom.toLowerCase().includes('cloud') ||
             cat.nom.toLowerCase().includes('cybersécurité') ||
             cat.nom.toLowerCase().includes('devops'))
          )
        })).filter(cat => cat.formations.length > 0)
      case 'rncp':
        // Formations RNCP : toutes les formations certifiantes
        return categories.map(cat => ({
          ...cat,
          formations: cat.formations.filter(f => 
            f.certifications_visees.length > 0 && // Formations avec certifications
            (cat.nom.toLowerCase().includes('cloud') ||
             cat.nom.toLowerCase().includes('devops') ||
             cat.nom.toLowerCase().includes('cybersécurité') ||
             cat.nom.toLowerCase().includes('ia'))
          )
        })).filter(cat => cat.formations.length > 0)
      default:
        return categories
    }
  }

  useEffect(() => {
    async function loadFormations() {
      try {
        const response = await fetch('/api/formations')
        if (response.ok) {
          const data = await response.json()
          const filteredCategories = getFormationsForType(data.categories)
          setCategories(filteredCategories)
        }
      } catch (error) {
        console.error('Error loading formations:', error)
      } finally {
        setLoading(false)
      }
    }
    loadFormations()
  }, [type])

  const getRNCP = (formation: Formation) => {
    // Déterminer le niveau RNCP selon les certifications
    const certs = formation.certifications_visees.join(' ').toLowerCase()
    if (certs.includes('az-305') || certs.includes('architect') || certs.includes('expert')) {
      return 'RNCP 7'
    } else if (certs.includes('az-104') || certs.includes('associate') || certs.includes('specialist')) {
      return 'RNCP 6'
    } else if (certs.includes('fundamentals') || certs.includes('900')) {
      return 'RNCP 4'
    }
    return 'RNCP 5'
  }

  const handleFormationClick = (formation: Formation) => {
    setSelectedFormation(formation)
    setIsModalOpen(true)
  }

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-1/3 mx-auto mb-6"></div>
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-2/3 mx-auto mb-8"></div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-lg p-6 border">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
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
    <section id={id} className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">{description}</p>
          <div className="mt-8 flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const categoryStyle = getCategoryIcon(category.nom)
            return (
              <div key={category.id} className="group bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-500 hover:-translate-y-2">
              {/* Header with gradient */}
              <div className={`h-2 bg-gradient-to-r ${categoryStyle.gradient}`}></div>

              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="flex flex-col items-center mr-4">
                    {/* Photo d'étudiant au-dessus de l'icône */}
                    <div className="w-64 h-64 rounded-full overflow-hidden border-2 border-white shadow-md mb-2 group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src="/photo-etudiant/image.png"
                        alt="Étudiant en formation"
                        width={256}
                        height={256}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">{category.nom}</h3>
                </div>
                
                <div className="space-y-6">
                  {category.formations.map((formation, index) => (
                    <div
                      key={formation.id}
                      className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:scale-[1.02] relative overflow-hidden animate-fadeIn"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Top gradient line */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${categoryStyle.gradient}`}></div>

                      <div className="p-6 lg:p-8 relative">
                        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

                          {/* Left Column - Main Info */}
                          <div className="flex-1">
                            <div className="mb-6">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                                <h4 className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-indigo-700 transition-colors">
                                  {formation.titre}
                                </h4>
                                {type === 'rncp' && (
                                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${categoryStyle.gradient} text-white shadow-sm flex-shrink-0`}>
                                    {getRNCP(formation)}
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

                            {/* Compétences */}
                            <div className="mb-6">
                              <div className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                Compétences acquises
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {formation.competences.slice(0, 2).map((comp: string) => (
                                  <span key={comp} className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 text-sm font-medium px-4 py-2 rounded-full border border-blue-200">
                                    {comp}
                                  </span>
                                ))}
                                {formation.competences.length > 2 && (
                                  <span className="bg-gray-100 text-gray-600 text-sm font-medium px-4 py-2 rounded-full border border-gray-200">
                                    +{formation.competences.length - 2} autres...
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Certifications */}
                            <div className="mb-6">
                              <div className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                                Certifications
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {formation.certifications_visees.slice(0, 2).map((cert: string) => (
                                  <span key={cert} className={`bg-gradient-to-r ${categoryStyle.gradient} text-white text-sm font-bold px-4 py-2 rounded-full shadow-sm`}>
                                    {cert.replace('cert-', '').toUpperCase()}
                                  </span>
                                ))}
                                {formation.certifications_visees.length > 2 && (
                                  <span className="bg-gray-100 text-gray-600 text-sm font-medium px-4 py-2 rounded-full border border-gray-200">
                                    +{formation.certifications_visees.length - 2} autres...
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
                                <div className="w-64 h-64 rounded-full border-2 border-red-500 shadow-md mx-auto mb-3 bg-red-500 flex items-center justify-center">
                                  <div className="text-white font-bold">TEST</div>
                                </div>
                                <div className="text-sm text-gray-600 mb-2">Formation</div>
                                <div className="text-lg font-bold text-gray-900">
                                  {category.nom}
                                </div>
                              </div>

                              {/* Buttons */}
                              <div className="space-y-3">
                                <button
                                  onClick={() => handleFormationClick(formation)}
                                  className={`w-full bg-gradient-to-r ${categoryStyle.gradient} hover:shadow-xl text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 relative overflow-hidden group`}
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            )
          })}
        </div>
        
        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Besoin d'aide pour choisir ?</h3>
            <p className="text-gray-600 mb-6">Nos conseillers sont là pour vous accompagner dans votre choix de formation</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="tel:0759565918" className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 px-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                07 59 56 59 18
              </a>
              <a href="mailto:contact@idcacademy.fr" className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold py-3 px-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                contact@idcacademy.fr
              </a>
            </div>
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
        } : undefined}
      />
    </section>
  )
}