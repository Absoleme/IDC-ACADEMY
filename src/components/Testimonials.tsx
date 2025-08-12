'use client'

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Martinez",
      role: "Développeuse Full Stack",
      company: "TechCorp",
      image: "/avatars/sarah.jpg",
      rating: 5,
      text: "La formation Python/Django m'a permis de décrocher mon premier poste de développeuse. Les formateurs sont exceptionnels et l'accompagnement personnalisé fait toute la différence. Je recommande vivement !",
      formation: "Formation Python/Django"
    },
    {
      name: "Ahmed Benali",
      role: "Data Scientist",
      company: "DataLab",
      image: "/avatars/ahmed.jpg",
      rating: 5,
      text: "Excellent programme de formation en Data Science. Les projets concrets et l'accès aux outils professionnels m'ont préparé au marché du travail. J'ai trouvé un emploi 2 semaines après la fin de la formation.",
      formation: "Formation Data Science"
    },
    {
      name: "Marie Dubois",
      role: "DevOps Engineer",
      company: "CloudTech",
      image: "/avatars/marie.jpg",
      rating: 5,
      text: "Formation DevOps très complète avec des cas d'usage réels. L'équipe pédagogique est à l'écoute et les certifications incluses sont un vrai plus pour le CV. Formation que je recommande sans hésitation.",
      formation: "Formation DevOps"
    },
    {
      name: "Lucas Moreau",
      role: "Développeur React",
      company: "WebStudio",
      image: "/avatars/lucas.jpg",
      rating: 5,
      text: "Reconversion réussie grâce à IDC Academy ! La formation JavaScript/React est bien structurée et les formateurs partagent leur expérience terrain. Le suivi post-formation pour l'emploi est excellent.",
      formation: "Formation JavaScript/React"
    },
    {
      name: "Fatima El Mansouri",
      role: "Analyste Cybersécurité",
      company: "SecureIT",
      image: "/avatars/fatima.jpg",
      rating: 5,
      text: "Formation cybersécurité de haute qualité. Contenu technique pointu, exercices pratiques et formateurs experts. J'ai acquis les compétences nécessaires pour évoluer dans ce domaine passionnant.",
      formation: "Formation Cybersécurité"
    },
    {
      name: "Thomas Bernard",
      role: "Cloud Architect",
      company: "InnovCloud",
      image: "/avatars/thomas.jpg",
      rating: 5,
      text: "IDC Academy propose des formations à la pointe de la technologie. La formation AWS m'a permis d'obtenir mes certifications et de progresser rapidement dans ma carrière. Équipe professionnelle et bienveillante.",
      formation: "Formation AWS"
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
                  <p className="text-sm text-indigo-600">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}