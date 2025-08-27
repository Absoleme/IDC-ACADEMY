'use client'

export default function TechSalaryGrids() {
  const salaryData = [
    {
      job: "Développeur Full Stack",
      junior: "35 000€ - 45 000€",
      middle: "45 000€ - 65 000€",
      senior: "65 000€ - 90 000€",
      icon: "💻",
      color: "from-blue-500 to-indigo-500"
    },
    {
      job: "DevOps Engineer",
      junior: "40 000€ - 50 000€",
      middle: "50 000€ - 70 000€",
      senior: "70 000€ - 95 000€",
      icon: "⚙️",
      color: "from-purple-500 to-indigo-500"
    },
    {
      job: "Data Scientist",
      junior: "38 000€ - 48 000€",
      middle: "48 000€ - 68 000€",
      senior: "68 000€ - 100 000€",
      icon: "📊",
      color: "from-green-500 to-emerald-500"
    },
    {
      job: "Cloud Architect",
      junior: "45 000€ - 55 000€",
      middle: "55 000€ - 80 000€",
      senior: "80 000€ - 120 000€",
      icon: "☁️",
      color: "from-cyan-500 to-blue-500"
    },
    {
      job: "Cybersécurité Expert",
      junior: "42 000€ - 52 000€",
      middle: "52 000€ - 75 000€",
      senior: "75 000€ - 110 000€",
      icon: "🔒",
      color: "from-red-500 to-pink-500"
    },
    {
      job: "IA/ML Engineer",
      junior: "40 000€ - 50 000€",
      middle: "50 000€ - 75 000€",
      senior: "75 000€ - 120 000€",
      icon: "🤖",
      color: "from-orange-500 to-yellow-500"
    }
  ]

  const sources = [
    {
      name: "Glassdoor France",
      description: "Salaires déclarés par les employés en France",
      url: "https://www.glassdoor.fr"
    },
    {
      name: "APEC",
      description: "Association pour l'emploi des cadres - Études salaires IT",
      url: "https://www.apec.fr"
    },
    {
      name: "Stack Overflow Survey",
      description: "Enquête annuelle développeurs - Section France",
      url: "https://insights.stackoverflow.com/survey"
    },
    {
      name: "LinkedIn Salary Insights",
      description: "Données LinkedIn sur les salaires tech en France",
      url: "https://www.linkedin.com/salary"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-6">
            Grilles de Salaires Tech
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Découvrez les salaires pratiqués dans les métiers de la tech en France. 
            Des données actualisées pour vous aider à évaluer votre potentiel professionnel.
          </p>
          
          <div className="mt-8 flex justify-center">
            <div className="h-1 w-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>
          </div>
        </div>

        {/* Grille des salaires */}
        <div className="grid gap-6 mb-16">
          {salaryData.map((job, index) => (
            <div 
              key={job.job}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`bg-gradient-to-r ${job.color} p-6 text-white`}>
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl backdrop-blur-sm mr-6">
                    {job.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{job.job}</h3>
                    <p className="text-white/90">Salaires annuels bruts en France</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-green-700 mb-2 uppercase tracking-wider">
                        Junior (0-3 ans)
                      </h4>
                      <div className="text-2xl font-bold text-green-800">
                        {job.junior}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-blue-700 mb-2 uppercase tracking-wider">
                        Confirmé (4-7 ans)
                      </h4>
                      <div className="text-2xl font-bold text-blue-800">
                        {job.middle}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-purple-700 mb-2 uppercase tracking-wider">
                        Senior (5+ ans)
                      </h4>
                      <div className="text-2xl font-bold text-purple-800">
                        {job.senior}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note importante */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200 mb-12">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-900 mb-3">
                Informations importantes
              </h3>
              <div className="text-amber-800 space-y-2">
                <p>• Les salaires varient selon la région, la taille de l'entreprise et le secteur d'activité</p>
                <p>• Paris et région parisienne : +15 à +30% par rapport à la moyenne nationale</p>
                <p>• Les primes et avantages ne sont pas inclus dans ces fourchettes</p>
                <p>• Données actualisées en 2024 sur la base des études de marché</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sources des données */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Sources des Données Salariales
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sources.map((source, index) => (
              <div key={source.name} className="text-center group">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-300 group-hover:border-blue-300">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  
                  <h4 className="font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                    {source.name}
                  </h4>
                  
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    {source.description}
                  </p>
                  
                  <div className="text-xs text-blue-600 font-medium">
                    Consulter les données
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Données collectées et analysées en 2024 • Mise à jour trimestrielle
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-200">
            <h3 className="text-2xl font-bold text-indigo-900 mb-4">
              Atteignez Ces Salaires avec Nos Formations
            </h3>
            <p className="text-indigo-700 mb-6 max-w-3xl mx-auto">
              Nos formations certifiantes et parcours RNCP vous préparent aux métiers les mieux rémunérés de la tech. 
              Investissez dans votre avenir professionnel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/formations" className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-3 px-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
                Voir nos formations
              </a>
              <a href="/idc-university" className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-xl border border-indigo-200 hover:bg-indigo-50 transition-all duration-300">
                Parcours RNCP
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}