export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <span className="text-sm font-medium">🚀 Votre carrière tech commence ici</span>
          </div>

          {/* Main title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Devenez expert en
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Technologies Digitales
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed text-gray-200">
            Titres RNCP reconnus par l'État et formations courtes certifiantes
            <span className="block mt-3 text-lg">
              Pour une reconversion réussie ou une montée en compétences
            </span>
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm md:text-base">
            <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>Suivi personnalisé</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span>Formateurs experts</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              <span>Pédagogie adaptée</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              <span>Certifications reconnues</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#formations" 
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
            >
              <span className="relative z-10">Découvrir nos formations</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </a>
            
            <a 
              href="#contact" 
              className="group px-8 py-4 bg-transparent border-2 border-white/30 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-200 backdrop-blur-sm"
            >
              Parler à un conseiller
            </a>
          </div>

          {/* Formation types */}
          <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-200">
              <h3 className="text-xl font-semibold mb-2 text-yellow-400">Titres RNCP</h3>
              <p className="text-gray-300 text-sm">
                Formations longues diplômantes reconnues par l'État pour une reconversion complète
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-200">
              <h3 className="text-xl font-semibold mb-2 text-blue-400">Formations Courtes</h3>
              <p className="text-gray-300 text-sm">
                Modules spécialisés pour acquérir rapidement des compétences techniques précises
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
