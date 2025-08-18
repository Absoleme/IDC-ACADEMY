'use client'

export default function AboutUs() {
  return (
    <section id="a-propos" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-xl">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-6">
            À propos d&apos;IDC Academy
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Votre partenaire de confiance pour la transformation digitale et l&apos;excellence IT
          </p>
          <div className="mt-8 flex justify-center">
            <div className="h-1 w-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Notre Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                Accompagner les professionnels et les entreprises dans leur transformation digitale en proposant des formations IT de pointe, certifiantes et alignées sur les besoins du marché du travail.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Notre Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                Devenir la référence française en matière de formation IT, en démocratisant l&apos;accès aux compétences technologiques de demain pour tous les profils, du débutant à l&apos;expert.
              </p>
            </div>
          </div>

          {/* Right Column - Engagements & Highlights */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="text-lg font-bold mb-2">Parcours préparent à une certification</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="text-2xl font-bold mb-2">24h</div>
                <div className="text-purple-100">Délai de réponse</div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="text-2xl font-bold mb-2">Expert</div>
                <div className="text-green-100">Formateurs certifiés</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="text-2xl font-bold mb-2">Sur-mesure</div>
                <div className="text-orange-100">Accompagnement</div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Nos Domaines d&apos;Expertise</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">☁️</span>
                  <span className="font-medium text-gray-700">Cloud Computing</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🔒</span>
                  <span className="font-medium text-gray-700">Cybersécurité</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">📊</span>
                  <span className="font-medium text-gray-700">Data & IA</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">⚙️</span>
                  <span className="font-medium text-gray-700">DevOps</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Nos Valeurs
            </h3>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Des principes qui guident chacune de nos actions et façonnent l&apos;expérience de nos apprenants
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Excellence</h4>
              <p className="text-gray-600 leading-relaxed">
                Nous nous engageons à fournir des formations de la plus haute qualité, avec des contenus actualisés et des formateurs experts.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Accompagnement</h4>
              <p className="text-gray-600 leading-relaxed">
                Chaque apprenant bénéficie d&apos;un suivi personnalisé, de l&apos;inscription jusqu&apos;à l&apos;insertion professionnelle.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Innovation</h4>
              <p className="text-gray-600 leading-relaxed">
                Nous restons à la pointe des technologies émergentes pour proposer des formations toujours d&apos;actualité.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}