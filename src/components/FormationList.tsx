/*'use client'
import { useState } from 'react'
import data from '@/data/formations.json'
import ContactModal from './ContactModal'

interface FormationsListProps {
  categoryId: string
}

interface Formation {
  id: string
  titre: string
  duree: string
  niveau: string
  certifications: string[]
  technologies: string[]
  taux_insertion: string
  programme: Array<{
    module: string
    duree: string
    details: string[]
  }>
  profils_adaptes: string[]
  prerequis: string
  modalite: string
}

export default function FormationsList({ categoryId }: FormationsListProps) {
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null)
  const [showModal, setShowModal] = useState(false)

  const category = data.categories.find(cat => cat.id === categoryId)
  
  if (!category) return null

  const handleFormationSelect = (formation: Formation) => {
    setSelectedFormation(formation)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedFormation(null)
  }

  return (
    <>
      <section id="formations-section" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Formations {category.nom}
            </h2>
            <p className="text-xl text-gray-600">
              {category.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {category.formations.map((formation) => (
              <div
                key={formation.id}
                className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {formation.titre}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {formation.duree}
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {formation.niveau}
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                      {formation.taux_insertion} insertion
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-2">Certifications :</h4>
                  <div className="flex flex-wrap gap-2">
                    {formation.certifications.map((cert, index) => (
                      <span key={index} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-2">Technologies :</h4>
                  <div className="flex flex-wrap gap-2">
                    {formation.technologies.map((tech, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6 p-4 bg-green-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Taux d&apos;insertion :</div>
                    <div className="text-lg font-bold text-green-600">{formation.taux_insertion}</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-2">Profils adaptés :</h4>
                  <div className="text-sm text-gray-600">
                    {formation.profils_adaptes.join(" • ")}
                  </div>
                </div>

                <button
                  onClick={() => handleFormationSelect(formation)}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Demander des informations
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Correction ici : ajout de isOpen={showModal} *///}
     /* {selectedFormation && (
        <ContactModal 
          isOpen={showModal}
          formation={selectedFormation} 
          onClose={handleCloseModal} 
        />
      )}
    </>
  )
}
*/