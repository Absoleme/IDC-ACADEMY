'use client'
import Header from '@/components/header'
import FormationsCertifiantes from '@/components/FormationsCertifiantes'
import Contact from '@/components/contact'
import Footer from '@/components/Footer'
import ReconversionParcours from '@/components/ReconversionParcours'

export default function ReconversionPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white pt-20 pb-8 md:pt-24 md:pb-12 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 opacity-60">
          <img
            src="/hero/hero-reconversion-background.png"
            alt="Reconversion professionnelle technologies numériques"
            className="w-full h-full object-cover object-center"
          />
        </div>
        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-blue-900/60 to-purple-900/60"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Text content */}
            <div className="text-left lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-black bg-opacity-20 border border-white border-opacity-20 mb-6">
                <span className="text-xs font-medium">🔄 Reconversion professionnelle</span>
              </div>

              {/* Main title */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                Changez de carrière avec
                <span className="block text-yellow-400">
                  Les Technologies Numériques
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base md:text-lg mb-6 leading-relaxed text-gray-200">
Accompagnement personnalisé de votre projet professionnel                <span className="block mt-2 text-sm">
                  
                </span>
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-3 mb-6 text-xs">
                
                <div className="flex items-center space-x-2 bg-black bg-opacity-20 px-2 py-1 rounded-full border border-white border-opacity-10">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                  <span>Accompagnement carrière</span>
                </div>
               
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 items-start">
                <a 
                  href="#parcours" 
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium text-sm hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
                >
                  Découvrir nos parcours
                </a>
                
                
              </div>
            </div>

            {/* Right side - Visual */}
            <div className="hidden lg:block">
              <div className="bg-black bg-opacity-20 rounded-xl p-4 border border-white border-opacity-10 w-fit mx-auto">
                <img
                  src="/hero/hero-side-image.png"
                  alt="Parcours de reconversion professionnelle"
                  className="w-80 h-auto rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Parcours types - moved below the grid */}
          <div className="mt-8 grid md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            <div className="bg-black bg-opacity-20 rounded-xl p-4 border border-white border-opacity-10 hover:bg-opacity-30 transition-all duration-200">
              <h3 className="text-lg font-semibold mb-2 text-blue-400">Développeur Full Stack</h3>
              <p className="text-gray-300 text-xs">
                De zéro à développeur web en 6-12 mois
              </p>
            </div>
            <div className="bg-black bg-opacity-20 rounded-xl p-4 border border-white border-opacity-10 hover:bg-opacity-30 transition-all duration-200">
              <h3 className="text-lg font-semibold mb-2 text-green-400">Data Analyst</h3>
              <p className="text-gray-300 text-xs">
                Maîtrisez l'analyse de données et la Business Intelligence
              </p>
            </div>
            <div className="bg-black bg-opacity-20 rounded-xl p-4 border border-white border-opacity-10 hover:bg-opacity-30 transition-all duration-200">
              <h3 className="text-lg font-semibold mb-2 text-purple-400">DevOps Engineer</h3>
              <p className="text-gray-300 text-xs">
                Infrastructure cloud et automatisation - Métier d'avenir
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Parcours Section */}
      <section id="parcours" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-indigo-400 to-pink-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl mb-6 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-6">
              Nos Parcours de Reconversion
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">Des programmes complets de 6 à 18 mois pour changer de carrière en toute sérénité. Chaque parcours combine théorie, pratique et accompagnement personnalisé pour garantir votre réussite professionnelle.</p>
            <div className="mt-8 flex justify-center">
              <div className="h-1 w-32 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"></div>
            </div>
          </div>

          <ReconversionParcours />
        </div>
      </section>
      
      <Footer />
    </main>
  )
}