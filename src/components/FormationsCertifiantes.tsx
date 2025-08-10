'use client'
import { useState, useEffect } from 'react'
import ContactModal from './ContactModal'

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
  salaire_moyen: string
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
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [loading, setLoading] = useState(true)
  
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

        <div className="space-y-16">
          {categories.map((category) => {
            const categoryConfig = getCategoryConfig(category.nom)
            
            return (
              <div key={category.id} className="animate-slideUp">
                {/* Category Header */}
                <div className="flex items-center justify-center mb-12">
                  <div className={`flex items-center px-8 py-4 rounded-3xl ${categoryConfig.bgColor} border-2 ${categoryConfig.borderColor} shadow-lg`}>
                    <div className={`w-16 h-16 bg-gradient-to-r ${categoryConfig.gradient} rounded-2xl flex items-center justify-center mr-4 shadow-md`}>
                      <span className="text-3xl">{categoryConfig.icon}</span>
                    </div>
                    <div className="text-left">
                      <h3 className={`text-2xl font-bold ${categoryConfig.textColor}`}>
                        {category.nom}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {category.formations.length} formation{category.formations.length > 1 ? 's' : ''} disponible{category.formations.length > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Formations Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.formations.map((formation, index) => (
                    <div 
                      key={formation.id} 
                      className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 hover:scale-105 hover:-translate-y-3 relative overflow-hidden"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Top gradient line */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${categoryConfig.gradient}`}></div>
                      
                      {/* Content */}
                      <div className="mb-6">
                        <h4 className="text-xl font-bold text-gray-900 leading-tight mb-4 group-hover:text-indigo-700 transition-colors">
                          {formation.titre}
                        </h4>
                        <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">{formation.resume}</p>
                      </div>

                      {/* Details */}
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center text-sm">
                          <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">Durée: </span>
                            <span className="text-gray-600">{formation.duree_formation}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">Salaire: </span>
                            <span className="text-green-600 font-bold">{formation.salaire_moyen}</span>
                          </div>
                        </div>

                        <div className="flex items-center text-sm">
                          <div className="w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">Format: </span>
                            <span className="text-purple-600">{formation.modalites.join(' • ')}</span>
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
                            <span key={index} className={`bg-gradient-to-r ${categoryConfig.gradient} text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm`}>
                              {cert.replace('cert-', '').toUpperCase()}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Compétences */}
                      <div className="mb-8">
                        <div className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          Compétences acquises
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {formation.competences.slice(0, 3).map((comp, index) => (
                            <span key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 text-xs font-medium px-3 py-1 rounded-full border border-blue-200">
                              {comp}
                            </span>
                          ))}
                          {formation.competences.length > 3 && (
                            <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full border border-gray-200">
                              +{formation.competences.length - 3} autres
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Button */}
                      <button
                        onClick={() => handleFormationClick(formation)}
                        className={`w-full bg-gradient-to-r ${categoryConfig.gradient} hover:shadow-xl text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 relative overflow-hidden group`}
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

        {/* Call to action */}
        <div className="mt-20 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Besoin d'aide pour choisir votre certification ?</h3>
            <p className="text-gray-600 mb-6">Nos experts vous conseillent pour trouver la certification qui correspond à vos objectifs professionnels</p>
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
        } : null}
      />
    </section>
  )
}