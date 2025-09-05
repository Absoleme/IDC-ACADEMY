'use client'

export default function Partners() {
  const partners = [
    {
      name: "OPCO",
      logo: "/logos/opco.png",
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


        {/* Grille des partenaires */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div 
              key={partner.name}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                  <img 
                    src={partner.logo} 
                    alt={`Logo ${partner.name}`}
                    className="w-16 h-16 object-contain"
                    onError={(e) => {
                      // Fallback si l'image n'existe pas
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).nextElementSibling!.classList.remove('hidden');
                    }}
                  />
                  {/* Fallback placeholder */}
                  <div className="hidden w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg items-center justify-center text-white text-xs font-bold">
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

       
      </div>
    </section>
  )
}