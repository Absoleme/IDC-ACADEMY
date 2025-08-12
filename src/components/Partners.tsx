'use client'

export default function Partners() {
  const partners = [
    {
      name: "Qualiopi",
      logo: "/logos/qualiopi.png", // Vous devrez ajouter ce logo
      description: "Certification qualité des organismes de formation",
      type: "certification"
    },
    {
      name: "OPCO",
      logo: "/logos/opco.png", // Logo générique OPCO
      description: "Opérateurs de Compétences",
      type: "financement"
    },
    {
      name: "Pôle Emploi",
      logo: "/logos/pole-emploi.png",
      description: "Service public de l'emploi",
      type: "financement"
    },
    {
      name: "Microsoft",
      logo: "/logos/microsoft.png",
      description: "Partenaire technologique Azure & 365",
      type: "technologie"
    },
    {
      name: "AWS",
      logo: "/logos/aws.png",
      description: "Amazon Web Services",
      type: "technologie"
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'certification':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'financement':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'technologie':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-6">
            Nos Partenaires
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            IDC Academy collabore avec des partenaires reconnus pour vous garantir 
            des formations de qualité, financables et certifiantes.
          </p>
          
          <div className="mt-8 flex justify-center">
            <div className="h-1 w-32 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"></div>
          </div>
        </div>

        {/* Mise en avant de Qualiopi */}
        <div className="mb-16 text-center">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-12 border-2 border-green-200 shadow-xl max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center p-4">
                  {/* Placeholder pour logo Qualiopi */}
                  <div className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    QUALIOPI
                  </div>
                </div>
              </div>
              <div className="text-left">
                <h3 className="text-3xl font-bold text-green-800 mb-4">
                  Organisme Certifié Qualiopi
                </h3>
                <p className="text-lg text-green-700 leading-relaxed mb-4">
                  IDC Academy est certifié Qualiopi, gage de qualité et de conformité 
                  aux exigences du référentiel national qualité.
                </p>
                <div className="flex items-center text-green-600">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span className="font-semibold">Formations éligibles aux financements publics</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grille des partenaires */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {partners.filter(p => p.name !== "Qualiopi").map((partner, index) => (
            <div 
              key={partner.name}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                  {/* Placeholder pour logos */}
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                    {partner.name.slice(0, 3).toUpperCase()}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {partner.name}
                </h3>
                
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                  {partner.description}
                </p>
                
                <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${getTypeColor(partner.type)}`}>
                  {partner.type}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 border border-indigo-200">
            <h3 className="text-2xl font-bold text-indigo-900 mb-4">
              Financements et Certifications
            </h3>
            <p className="text-indigo-700 mb-6 max-w-3xl mx-auto">
              Grâce à nos partenaires, bénéficiez de formations financées à 100% et 
              obtenez des certifications reconnues par les plus grandes entreprises tech.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center text-indigo-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <span className="font-semibold">100% finançable</span>
              </div>
              <div className="flex items-center text-indigo-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <span className="font-semibold">Certifications officielles</span>
              </div>
              <div className="flex items-center text-indigo-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="font-semibold">Qualité garantie</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}