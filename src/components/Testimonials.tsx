'use client'

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Martinez",
      role: "Administratrice Cloud",
      image: "/avatars/sarah.jpg",
      rating: 5,
      text: "La formation Fondamentaux Microsoft Azure m'a permis d'obtenir ma certification AZ-900 et de décrocher un poste dans le cloud. Les formateurs sont exceptionnels et l'accompagnement personnalisé fait toute la différence !",
      formation: "Fondamentaux Microsoft Azure"
    },
    {
      name: "Ahmed Benali",
      role: "Ingénieur DevOps",
      image: "/avatars/ahmed.jpg",
      rating: 5,
      text: "Excellente formation Kubernetes. Les travaux pratiques et l'approche hands-on m'ont vraiment préparé aux défis du terrain. J'ai passé ma certification CKA avec succès grâce à cette formation.",
      formation: "Kubernetes CKA"
    },
    {
      name: "Marie Dubois",
      role: "Analyste SOC",
      image: "/avatars/marie.jpg",
      rating: 5,
      text: "Formation en cybersécurité très complète. Le programme SOC Analyst m'a donné toutes les bases pour travailler en centre opérationnel de sécurité. L'équipe pédagogique est à l'écoute et experte dans son domaine.",
      formation: "SOC Analyst"
    },
    {
      name: "Lucas Moreau",
      role: "Consultant Cloud AWS",
      image: "/avatars/lucas.jpg",
      rating: 5,
      text: "Reconversion réussie grâce à IDC Academy ! La formation AWS Cloud Practitioner m'a ouvert les portes du cloud computing. Le contenu est structuré et les formateurs partagent leur expérience terrain.",
      formation: "AWS Cloud Practitioner"
    },
    {
      name: "Fatima El Mansouri",
      role: "Spécialiste Ethical Hacking",
      image: "/avatars/fatima.jpg",
      rating: 5,
      text: "Formation ethical hacking de haute qualité. Contenu technique pointu avec des labs pratiques en environnement sécurisé. J'ai acquis les compétences nécessaires pour faire du pentest de manière éthique.",
      formation: "Fondamentaux de l'Ethical Hacking"
    },
    {
      name: "Thomas Bernard",
      role: "Administrateur Systèmes Linux",
      image: "/avatars/thomas.jpg",
      rating: 5,
      text: "IDC Academy propose des formations pratiques et concrètes. La formation Linux m'a permis de maîtriser l'administration système et de progresser dans ma carrière. Équipe professionnelle et bienveillante.",
      formation: "Linux Fondamentaux"
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ce que disent nos apprenants
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez les témoignages de nos anciens stagiaires qui ont réussi leur transition professionnelle grâce à nos formations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Formation */}
              <div className="mb-4">
                <span className="inline-block bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
                  {testimonial.formation}
                </span>
              </div>

              {/* Author info */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-indigo-600 font-semibold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}