'use client'

export default function PolitiqueConfidentialite() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Politique de Confidentialité
          </h1>
          <p className="text-lg text-gray-600">
            IDCACADEMY s'engage à protéger vos données personnelles conformément au RGPD
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
          {/* Responsable du traitement */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Responsable du traitement
            </h2>
            <div className="bg-blue-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Le responsable du traitement de vos données personnelles est :
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Raison sociale :</strong> IDCACADEMY</p>
                <p><strong>SIRET :</strong> 94054296200011</p>
                <p><strong>Adresse :</strong> 58 RUE DE MONCEAU, CS 48756, 75380 PARIS CEDEX 08</p>
                <p><strong>Email de contact :</strong> <a href="mailto:contact@idcacademy.fr" className="text-blue-600 hover:text-blue-800 underline">contact@idcacademy.fr</a></p>
              </div>
            </div>
          </section>

          {/* Hébergeur */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Hébergeur du site
            </h2>
            <div className="bg-green-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Ce site web est hébergé par :
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Raison sociale :</strong> Vercel Inc.</p>
                <p><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
              </div>
            </div>
          </section>

          {/* Finalités */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Finalités des données collectées
            </h2>
            <div className="bg-purple-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Vos données personnelles sont collectées et traitées pour les finalités suivantes :
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Gestion administrative et pédagogique :</strong> Traitement de vos inscriptions, suivi de votre parcours de formation, émission des certificats</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Suivi de l'assiduité :</strong> Contrôle de la présence et de la participation aux formations conformément aux obligations légales</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Amélioration de nos services :</strong> Analyse de satisfaction, développement de nouveaux programmes, personnalisation de l'offre</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Réponse aux demandes :</strong> Traitement des demandes d'information via les formulaires de contact du site</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Base légale */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Base légale du traitement
            </h2>
            <div className="bg-orange-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed">
                Le traitement de vos données personnelles repose sur :
              </p>
              <ul className="mt-4 space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>L'exécution d'un contrat</strong> pour la gestion de vos formations</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Une obligation légale</strong> pour le suivi de l'assiduité et la conservation des dossiers de formation</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Votre consentement</strong> pour les demandes d'information via les formulaires de contact</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Durée de conservation */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Durée de conservation
            </h2>
            <div className="bg-indigo-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Vos données sont conservées pendant les durées suivantes :
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-indigo-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Prospects</h4>
                  <p className="text-gray-700 text-sm">
                    <strong>3 ans</strong> après le dernier contact ou la dernière demande d'information
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-indigo-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Stagiaires</h4>
                  <p className="text-gray-700 text-sm">
                    Conformément aux <strong>obligations légales</strong> (généralement 30 ans pour les dossiers de formation professionnelle)
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Destinataires */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Destinataires des données
            </h2>
            <div className="bg-red-50 rounded-lg p-6">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-red-600 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    <strong>Engagement de confidentialité :</strong> Vos données personnelles sont traitées uniquement par le personnel interne d'IDCACADEMY.
                  </p>
                  <p className="text-gray-700 leading-relaxed font-medium">
                    🔒 Nous ne vendons, ne louons, ni ne partageons jamais vos données avec des tiers à des fins commerciales.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Droits RGPD */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Vos droits selon le RGPD
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed mb-6">
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <h4 className="font-semibold text-gray-900">Droit d'accès</h4>
                  </div>
                  <p className="text-gray-600 text-sm">Connaître les données que nous détenons sur vous</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <h4 className="font-semibold text-gray-900">Droit de rectification</h4>
                  </div>
                  <p className="text-gray-600 text-sm">Corriger ou mettre à jour vos informations</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <h4 className="font-semibold text-gray-900">Droit d'effacement</h4>
                  </div>
                  <p className="text-gray-600 text-sm">Demander la suppression de vos données</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                    </svg>
                    <h4 className="font-semibold text-gray-900">Droit d'opposition</h4>
                  </div>
                  <p className="text-gray-600 text-sm">Vous opposer au traitement de vos données</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    <h4 className="font-semibold text-gray-900">Droit à la portabilité</h4>
                  </div>
                  <p className="text-gray-600 text-sm">Récupérer vos données dans un format utilisable</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9l3 3-3 3m0 0a9 9 0 010-6m0 6a9 9 0 000 6" />
                    </svg>
                    <h4 className="font-semibold text-gray-900">Droit à la limitation</h4>
                  </div>
                  <p className="text-gray-600 text-sm">Limiter le traitement de vos données</p>
                </div>
              </div>
            </div>
          </section>

          {/* Comment exercer ses droits */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Comment exercer vos droits
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
              <div className="flex items-start">
                <svg className="w-8 h-8 text-blue-600 mt-1 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Contact pour vos demandes</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Pour exercer l'un de ces droits ou pour toute question relative à la protection de vos données personnelles, 
                    vous pouvez nous contacter :
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <strong>Email :</strong> <a href="mailto:contact@idcacademy.fr" className="text-blue-600 hover:text-blue-800 underline">contact@idcacademy.fr</a>
                    </p>
                    <p className="text-gray-700">
                      <strong>Objet :</strong> "Demande RGPD - [Type de demande]"
                    </p>
                  </div>
                  <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-600">
                      <strong>💡 Délai de réponse :</strong> Nous nous engageons à répondre à votre demande dans un délai maximum d'un mois à compter de sa réception.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sécurité */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Sécurité des données
            </h2>
            <div className="bg-green-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                IDCACADEMY met en œuvre toutes les mesures techniques et organisationnelles appropriées pour assurer la sécurité de vos données personnelles :
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Chiffrement des données sensibles</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Accès sécurisé et limité aux personnels autorisés</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Sauvegardes régulières et sécurisées</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Formation du personnel à la protection des données</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. Cookies et technologies similaires
            </h2>
            <div className="bg-yellow-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Notre site utilise des cookies strictement nécessaires au fonctionnement du site et à la sécurité de vos données. 
                Aucun cookie de tracking ou publicitaire n'est utilisé sans votre consentement explicite.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela pourrait limiter certaines fonctionnalités du site.
              </p>
            </div>
          </section>

          {/* Réclamation */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              11. Droit de réclamation
            </h2>
            <div className="bg-red-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Si vous estimez que le traitement de vos données personnelles constitue une violation du RGPD, 
                vous avez le droit d'introduire une réclamation auprès de l'autorité de contrôle compétente :
              </p>
              <div className="bg-white rounded-lg p-4 border border-red-200">
                <p className="text-gray-700">
                  <strong>CNIL (Commission Nationale de l'Informatique et des Libertés)</strong><br/>
                  3 Place de Fontenoy - TSA 80715<br/>
                  75334 PARIS CEDEX 07<br/>
                  Téléphone : 01 53 73 22 22<br/>
                  <a href="https://www.cnil.fr" className="text-blue-600 hover:text-blue-800 underline">www.cnil.fr</a>
                </p>
              </div>
            </div>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              12. Modifications de cette politique
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed">
                Cette politique de confidentialité peut être mise à jour périodiquement pour refléter les changements 
                dans nos pratiques de traitement des données ou les évolutions légales. 
                La date de dernière mise à jour est indiquée en haut de cette page. 
                Nous vous encourageons à consulter régulièrement cette politique pour rester informé de la manière dont nous protégeons vos données.
              </p>
            </div>
          </section>
        </div>

        {/* Footer de la page */}
        <div className="text-center mt-12">
          <a 
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour à l'accueil
          </a>
        </div>
      </div>
    </main>
  )
}