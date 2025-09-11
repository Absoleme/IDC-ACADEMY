'use client'
import Header from '@/components/header'
import FormationsCertifiantes from '@/components/FormationsCertifiantes'
import Contact from '@/components/contact'
import Footer from '@/components/Footer'

export default function FormationsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white pt-20 pb-8 md:pt-24 md:pb-12 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 opacity-30">
          <img 
            src="/hero/hero-background.jpg" 
            alt="Formation technologies numériques" 
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
                <span className="text-xs font-medium">🎓 Formations certifiantes</span>
              </div>

              {/* Main title */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                Développez vos compétences
                <span className="block text-yellow-400">
                  Technologies IT
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base md:text-lg mb-6 leading-relaxed text-gray-200">
                Formations courtes intensives et certifications officielles
                <span className="block mt-2 text-sm">
                  Cloud, Cybersécurité, Data, DevOps, IA - Tous domaines couverts
                </span>
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-3 mb-6 text-xs">
                <div className="flex items-center space-x-2 bg-black bg-opacity-20 px-2 py-1 rounded-full border border-white border-opacity-10">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                  <span>Formations intensives</span>
                </div>
                <div className="flex items-center space-x-2 bg-black bg-opacity-20 px-2 py-1 rounded-full border border-white border-opacity-10">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                  <span>Certifications officielles</span>
                </div>
                <div className="flex items-center space-x-2 bg-black bg-opacity-20 px-2 py-1 rounded-full border border-white border-opacity-10">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                  <span>Financement OPCO</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 items-start">
                <a 
                  href="#formations" 
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium text-sm hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
                >
                  Voir nos formations
                </a>
                
                <a 
                  href="#contact" 
                  className="px-5 py-2.5 bg-transparent border-2 border-white border-opacity-30 rounded-lg font-medium text-sm hover:bg-white hover:text-gray-900 transition-all duration-200"
                >
                  Demander conseil
                </a>
              </div>
            </div>

            {/* Right side - Visual */}
            <div className="hidden lg:block">
              <div className="bg-black bg-opacity-20 rounded-xl p-1 border border-white border-opacity-10">
                <img 
                  src="/hero/hero-side-image.jpg" 
                  alt="Formation certifiante technologies IT" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Specialization areas - moved below the grid */}
          <div className="mt-8 grid md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            <div className="bg-black bg-opacity-20 rounded-xl p-4 border border-white border-opacity-10 hover:bg-opacity-30 transition-all duration-200">
              <h3 className="text-lg font-semibold mb-2 text-blue-400">Cloud & DevOps</h3>
              <p className="text-gray-300 text-xs">
                AWS, Azure, Kubernetes, Terraform - Maîtrisez les technologies cloud
              </p>
            </div>
            <div className="bg-black bg-opacity-20 rounded-xl p-4 border border-white border-opacity-10 hover:bg-opacity-30 transition-all duration-200">
              <h3 className="text-lg font-semibold mb-2 text-red-400">Cybersécurité</h3>
              <p className="text-gray-300 text-xs">
                CISSP, CEH, Security+ - Protégez les infrastructures numériques
              </p>
            </div>
            <div className="bg-black bg-opacity-20 rounded-xl p-4 border border-white border-opacity-10 hover:bg-opacity-30 transition-all duration-200">
              <h3 className="text-lg font-semibold mb-2 text-green-400">Data & IA</h3>
              <p className="text-gray-300 text-xs">
                Power BI, Azure Data, Machine Learning - Exploitez la puissance des données
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Formations Section */}
      <FormationsCertifiantes 
        title="Nos Formations par Spécialité"
        description="Découvrez notre catalogue de formations courtes et intensives, conçues pour vous préparer aux certifications IT les plus demandées. Chaque formation est adaptée aux exigences du marché et encadrée par des experts reconnus."
        id="formations"
      />
      
      <Footer />
    </main>
  )
}