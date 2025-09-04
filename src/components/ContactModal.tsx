'use client'
import { useState, useEffect } from 'react'
import { XMarkIcon, CheckCircleIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

interface Formation {
  id?: string | number
  titre: string
  duree?: string
  niveau?: string
  type?: string
}

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  formation?: Formation | null
}

export default function ContactModal({ isOpen, onClose, formation }: ContactModalProps) {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    situation: '',
    message: '',
    accepteRGPD: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [captchaReady, setCaptchaReady] = useState(false)
  const [captchaVerifying, setCaptchaVerifying] = useState(false)

  // Vérifier que reCAPTCHA est prêt
  useEffect(() => {
    if (executeRecaptcha) {
      setCaptchaReady(true)
    }
  }, [executeRecaptcha])

  if (!isOpen || !formation) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available')
      alert('Le système de sécurité n\'est pas encore prêt. Veuillez réessayer dans quelques secondes.')
      return
    }

    setIsSubmitting(true)
    setCaptchaVerifying(true)

    try {
      // Exécuter reCAPTCHA
      const token = await executeRecaptcha('contact_form')
      setCaptchaVerifying(false)
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          formation: formation.titre,
          formationId: formation.id,
          formationType: formation.type || 'formation',
          recaptchaToken: token
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        setTimeout(() => {
          onClose()
          setSubmitted(false)
          setFormData({
            nom: '',
            prenom: '',
            email: '',
            telephone: '',
            situation: '',
            message: '',
            accepteRGPD: false
          })
        }, 3000)
      } else {
        const result = await response.json()
        console.error('Erreur serveur:', result)
        if (result.error === 'Captcha verification failed') {
          alert('Vérification anti-robot échouée. Veuillez réessayer.')
        } else if (result.error === 'Captcha token missing') {
          alert('Token reCAPTCHA manquant. Veuillez rafraîchir la page.')
        } else {
          alert(`Erreur: ${result.error || 'Erreur inconnue'}`)
        }
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de l\'envoi du formulaire.')
    }

    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement
    const value = target.type === 'checkbox' ? target.checked : target.value
    setFormData({
      ...formData,
      [target.name]: value
    })
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 z-50 animate-fadeIn">
      <div className="bg-white rounded-none w-full h-full overflow-y-auto shadow-2xl border-0 animate-slideUp relative">
        {/* Bouton fermer fixe */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 z-10 bg-white/90 backdrop-blur-sm text-gray-700 hover:text-gray-900 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        
        <div className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex justify-between items-start">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 to-blue-800 bg-clip-text text-transparent">
                  Demande d&apos;information
                </h3>
                <p className="text-blue-700 font-semibold mt-1 text-sm sm:text-base">
                  {formation.titre}
                </p>
              </div>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-green-600 mb-4">
              Demande envoyée avec succès !
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Nous vous recontacterons dans les plus brefs délais pour discuter de votre projet de formation.
            </p>
            <div className="mt-8 p-4 bg-green-50 rounded-xl border border-green-200">
              <p className="text-green-700 font-medium">📞 Délai de réponse : sous 24h ouvrées</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Nom *
                </label>
                <input
                  type="text"
                  name="nom"
                  required
                  value={formData.nom}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Prénom *
                </label>
                <input
                  type="text"
                  name="prenom"
                  required
                  value={formData.prenom}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Votre prénom"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="06 12 34 56 78"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
                Situation actuelle
              </label>
              <select
                name="situation"
                value={formData.situation}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              >
                <option value="">Sélectionnez votre situation</option>
                <option value="emploi">En emploi</option>
                <option value="recherche">En recherche d&apos;emploi</option>
                <option value="reconversion">En reconversion</option>
                <option value="etudiant">Étudiant</option>
                <option value="freelance">Freelance/Indépendant</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                Message (optionnel)
              </label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Parlez-nous de votre projet, vos objectifs, vos questions..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
              ></textarea>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl mb-6 border border-blue-100">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-blue-800 mb-2 text-lg">
                    {formation.type === 'parcours' ? 'Parcours sélectionné' : 'Formation sélectionnée'}
                  </h4>
                  <p className="text-blue-700 font-semibold text-lg">{formation.titre}</p>
                  {(formation.duree || formation.niveau) && (
                    <div className="flex items-center space-x-4 mt-3">
                      {formation.duree && (
                        <span className="bg-white/70 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                          ⏱️ {formation.duree}
                        </span>
                      )}
                      {formation.niveau && (
                        <span className="bg-white/70 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                          🎯 {formation.niveau}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Case à cocher RGPD obligatoire */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl border border-gray-200">
              <div className="flex items-start space-x-3">
                <div className="flex items-center h-5">
                  <input
                    id="accepteRGPD"
                    name="accepteRGPD"
                    type="checkbox"
                    required
                    checked={formData.accepteRGPD}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                </div>
                <div className="text-sm">
                  <label htmlFor="accepteRGPD" className="font-medium text-gray-700 cursor-pointer">
                    <span className="text-red-500">*</span> J'accepte que mes données soient utilisées pour répondre à ma demande. 
                    Pour en savoir plus sur la gestion de vos données, consultez notre{' '}
                    <a 
                      href="/politique-confidentialite" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline font-semibold"
                    >
                      Politique de Confidentialité
                    </a>.
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !captchaReady || !formData.accepteRGPD}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-95"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  {captchaVerifying ? (
                    <>
                      <ShieldCheckIcon className="animate-pulse -ml-1 mr-3 h-5 w-5 text-white" />
                      Vérification de sécurité...
                    </>
                  ) : (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </>
                  )}
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Envoyer ma demande
                </span>
              )}
            </button>

            <div className="space-y-4">
              {/* Indicateur de statut reCAPTCHA */}
              <div className={`p-3 rounded-xl border transition-all duration-500 ${
                captchaReady 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-yellow-50 border-yellow-200 animate-pulse'
              }`}>
                <div className="flex items-center justify-center">
                  <div className="flex items-center space-x-2 text-sm">
                    {captchaReady ? (
                      <>
                        <CheckCircleIcon className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-700">
                          Protection reCAPTCHA active et fonctionnelle
                        </span>
                        <div className="ml-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-75"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-150"></div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <ShieldCheckIcon className="w-5 h-5 text-yellow-600 animate-spin" />
                        <span className="font-medium text-yellow-700">
                          Chargement de la protection reCAPTCHA...
                        </span>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Badge Google reCAPTCHA */}
                {captchaReady && (
                  <div className="mt-2 flex items-center justify-center text-xs text-gray-500">
                    <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    Protégé par Google reCAPTCHA v3
                  </div>
                )}
              </div>
              
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-sm text-gray-600 text-center flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  En envoyant ce formulaire, vous acceptez d&apos;être recontacté par IDC Academy concernant votre projet de formation.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
