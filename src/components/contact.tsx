export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Prêt à changer votre carrière ?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Contactez-nous dès aujourd&#39;hui pour un bilan gratuit et découvrez comment nous pouvons vous accompagner dans votre reconversion.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-8">
          <a 
            href="tel:0659565918"
            className="flex items-center justify-center p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
            </svg>
            <span>06 59 56 59 18</span>
          </a>
          
          <a 
            href="mailto:contact@idcacademy.fr"
            className="flex items-center justify-center p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
            </svg>
            <span>contact@idcacademy.fr</span>
          </a>
        </div>
        
        <div className="text-center">
          <p className="text-blue-100 text-sm">
            Notre Engagement : Coach dédié • Suivi Individuel • Réseau d&#39;Entreprises Partenaires
          </p>
        </div>
      </div>
    </section>
  )
}
