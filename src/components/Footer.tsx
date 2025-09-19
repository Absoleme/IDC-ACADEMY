'use client'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Section Qualiopi mise en avant */}
        <div className="mb-12 text-center">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 border-2 border-green-200 shadow-xl max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="flex-shrink-0">
                <a 
                  href="/documents/certificat-qualiopi.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-48 h-32 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group"
                  title="Cliquez pour télécharger le certificat Qualiopi"
                >
                  <div className="w-full h-full flex items-center justify-center p-2 relative">
                    <img 
                      src="/logos/qualiopi.png" 
                      alt="Certification Qualiopi" 
                      className="w-full h-full object-contain rounded-xl"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).nextElementSibling!.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden w-full h-full bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                      QUALIOPI
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-xl flex items-center justify-center transition-all duration-300">
                      <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                </a>
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-green-800 mb-3">
                  Organisme Certifié Qualiopi
                </h3>
                <p className="text-green-700 leading-relaxed mb-3">
                  IDC Academy est certifié Qualiopi, gage de qualité et de conformité 
                  aux exigences du référentiel national qualité.
                </p>
                <div className="flex items-center text-green-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                  </svg>
                  <span className="font-medium">Formations éligibles aux financements publics</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Informations générales */}
        <div className="grid md:grid-cols-4 gap-8 border-t border-gray-700 pt-12">
          <div>
            <h3 className="text-xl font-bold mb-4">Nos Formations</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Développement Web</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cloud Computing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cybersécurité</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Data & IA</a></li>
              <li><a href="#" className="hover:text-white transition-colors">DevOps</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Liens Utiles</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#a-propos" className="hover:text-white transition-colors">À propos</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="/politique-confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</a></li>
              <li>
                <a
                  href="/documents/Règlement-intérieur.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z" clipRule="evenodd" fill="currentColor" fillRule="evenodd"/>
                  </svg>
                  Règlement intérieur
                </a>
              </li>
              <li>
                <a
                  href="/documents/SGV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z" clipRule="evenodd" fill="currentColor" fillRule="evenodd"/>
                  </svg>
                  Conditions générales d'utilisation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Accessibilité & Handicap</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Toutes les formations dispensées à IDC ACADEMY sont accessibles aux personnes en situation de handicap. Lors de l'inscription à nos formations, nous étudions avec le candidat en situation de handicap et à travers un questionnaire les actions que nous pouvons mettre en place pour favoriser son apprentissage.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:0759565918" className="hover:text-white transition-colors font-semibold">07 59 56 59 18</a>
              </div>
              <div className="flex items-center text-gray-300">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:contact@idcacademy.fr" className="hover:text-white transition-colors font-semibold">contact@idcacademy.fr</a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright et informations légales */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="text-center text-gray-400 text-sm">
            <div className="flex flex-wrap justify-center items-center gap-2 mb-2">
              <a href="/politique-confidentialite" className="hover:text-white transition-colors">Politique de Confidentialité</a>
              <span>•</span>
              <span>&copy; 2024 IDCACADEMY - Tous droits réservés</span>
              <span>•</span>
              <span>SIRET: 94054296200011</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}