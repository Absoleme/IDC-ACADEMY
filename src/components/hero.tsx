export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Programme Reconversion
            <span className="block text-yellow-400">Professionnelle</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            94% de taux d&#39;insertion • +35% d&#39;augmentation salariale • 100% de réussite aux certifications
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#formations" className="btn-primary text-lg">
              Découvrir nos formations
            </a>
            <a href="#contact" className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
              Contactez-nous
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
