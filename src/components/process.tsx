export default function Process() {
  const steps = [
    {
      number: "1",
      title: "Bilan & Orientation",
      description: "Évaluation des compétences et définition d'objectifs professionnels personnalisés",
      duration: "2 semaines"
    },
    {
      number: "2",
      title: "Formation Intensive",
      description: "Acquisition des compétences techniques et préparation aux certifications",
      duration: "400 heures"
    },
    {
      number: "3",
      title: "Stage Pratique",
      description: "Mise en application des compétences en environnement professionnel réel",
      duration: "80 heures"
    },
    {
      number: "4",
      title: "Coaching Emploi",
      description: "Préparation aux entretiens et accompagnement vers l'emploi",
      duration: "2 mois"
    }
  ];

  return (
    <section id="processus" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Notre Processus de Reconversion en 4 Étapes
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="card text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {step.description}
                </p>
                <span className="inline-block bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
                  {step.duration}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-blue-600 transform -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
