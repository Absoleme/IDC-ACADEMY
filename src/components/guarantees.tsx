'use client'

// Déplace les données directement dans le composant
const guarantiesData = [
  {
    id: 1,
    titre: "Taux d'insertion",
    valeur: "94%",
    description: "Placement professionnel dans les 3 mois suivant la formation"
  },
  {
    id: 2,
    titre: "Augmentation salariale", 
    valeur: "+35%",
    description: "Augmentation moyenne constatée après reconversion"
  },
  {
    id: 3,
    titre: "Réussite certifications",
    valeur: "100%",
    description: "Formations alignées sur les exigences des certificateurs"
  },
  {
    id: 4,
    titre: "CDI après formation",
    valeur: "85%",
    description: "Stabilité professionnelle et sécurité de l'emploi"
  }
]

// Retire les props du composant
export default function Guarantees() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Nos Garanties Exceptionnelles
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            94% de taux d&#39;insertion • +35% d&#39;augmentation salariale • 100% de réussite aux certifications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {guarantiesData.map((garantie) => (
            <div
              key={garantie.id}
              className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {garantie.valeur}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {garantie.titre}
              </h3>
              <p className="text-gray-600 text-sm">
                {garantie.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
