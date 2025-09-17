export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white pt-20 pb-8 md:pt-24 md:pb-12 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 opacity-30">
        <img 
          src="/hero/hero-reconversion-background.png" 
          alt="Professional working environment" 
          className="w-full h-full object-cover object-center"
        />
      </div>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-blue-900/80 to-purple-900/80"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Text content */}
          <div className="text-left lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-black bg-opacity-20 border border-white border-opacity-20 mb-6">
            <span className="text-xs font-medium">🚀 Votre carrière tech commence ici</span>
          </div>

          {/* Main title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
            Devenez expert en
            <span className="block text-yellow-400">
              Technologies Numériques
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg mb-6 leading-relaxed text-gray-200">
            Titres RNCP reconnus par l'État en cours d'instruction et formations courtes certifiantes
            <span className="block mt-2 text-sm">
              Pour une reconversion réussie ou une montée en compétences
            </span>
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-3 mb-6 text-xs">
            <div className="flex items-center space-x-2 bg-black bg-opacity-20 px-2 py-1 rounded-full border border-white border-opacity-10">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
              <span>Suivi personnalisé</span>
            </div>
            <div className="flex items-center space-x-2 bg-black bg-opacity-20 px-2 py-1 rounded-full border border-white border-opacity-10">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
              <span>Formateurs experts</span>
            </div>
            <div className="flex items-center space-x-2 bg-black bg-opacity-20 px-2 py-1 rounded-full border border-white border-opacity-10">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
              <span>Pédagogie adaptée</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 items-start">
            <a 
              href="/formations" 
              className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium text-sm hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
            >
              Découvrir nos formations certifiantes
            </a>
            
            <a 
              href="/reconversion" 
              className="px-5 py-2.5 bg-transparent border-2 border-white border-opacity-30 rounded-lg font-medium text-sm hover:bg-white hover:text-gray-900 transition-all duration-200"
            >
              Découvrir nos parcours de reconversion professionnelle
            </a>
          </div>
          </div>

          {/* Right side - Visual or additional image */}
          <div className="hidden lg:block">
            <div className="bg-white bg-opacity-95 rounded-xl p-4 border border-white border-opacity-20 shadow-xl">
              <img
                src="/hero/image.png"
                alt="Formation en technologies numériques"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Formation types - moved below the grid */}
        <div className="mt-8 grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <div className="bg-black bg-opacity-20 rounded-xl p-4 border border-white border-opacity-10 hover:bg-opacity-30 transition-all duration-200">
            <h3 className="text-lg font-semibold mb-2 text-yellow-400">Titres RNCP</h3>
            <p className="text-gray-300 text-xs">
              Formations longues diplômantes reconnues par l'État pour une reconversion complète (en cours d'instruction)
            </p>
          </div>
          <div className="bg-black bg-opacity-20 rounded-xl p-4 border border-white border-opacity-10 hover:bg-opacity-30 transition-all duration-200">
            <h3 className="text-lg font-semibold mb-2 text-blue-400">Formations Courtes</h3>
            <p className="text-gray-300 text-xs">
              Modules spécialisés pour acquérir rapidement des compétences techniques précises
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
