'use client'

export default function TechSalaryGrids() {
  const salaryData = [
    {
      domain: "Logiciel Embarqué\nHardware - IA",
      junior: 39000,
      middle: 47000,
      senior: 55000,
      maxSalary: 70000,
      color: {
        junior: "#6366F1",
        middle: "#10B981", 
        senior: "#EF4444"
      }
    },
    {
      domain: "ERP - BI - CRM",
      junior: 37500,
      middle: 48000,
      senior: 54000,
      maxSalary: 70000,
      color: {
        junior: "#6366F1",
        middle: "#10B981",
        senior: "#EF4444"
      }
    },
    {
      domain: "Dev. Logiciel\n& Big Data", 
      junior: 38000,
      middle: 47500,
      senior: 56750,
      maxSalary: 70000,
      color: {
        junior: "#6366F1",
        middle: "#10B981",
        senior: "#EF4444"
      }
    },
    {
      domain: "Web & Mobile",
      junior: 37500,
      middle: 45000,
      senior: 57500,
      maxSalary: 70000,
      color: {
        junior: "#6366F1",
        middle: "#10B981",
        senior: "#EF4444"
      }
    },
    {
      domain: "Infrastructure\nCloud - DevOps",
      junior: 44500,
      middle: 54500,
      senior: 70000,
      maxSalary: 70000,
      color: {
        junior: "#6366F1",
        middle: "#10B981",
        senior: "#EF4444"
      }
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Salaires médians par domaine
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mx-auto"></div>
        </div>

        {/* Graphique en barres */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Grandes Villes</h3>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-indigo-500 rounded"></div>
                  <span>0-3 ans</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>4-7 ans</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>8+ ans</span>
                </div>
              </div>
            </div>
            
            {/* Axe Y */}
            <div className="relative">
              <div className="absolute left-0 h-80 flex flex-col justify-between text-sm text-gray-600 pr-4">
                <span>70 000 €</span>
                <span>60 000 €</span>
                <span>50 000 €</span>
                <span>40 000 €</span>
                <span>30 000 €</span>
                <span>20 000 €</span>
                <span>10 000 €</span>
                <span>0 €</span>
              </div>
              
              {/* Grille horizontale */}
              <div className="ml-16 h-80 relative border-l border-b border-gray-200">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="absolute w-full border-t border-gray-100" style={{ bottom: `${i * 12.5}%` }}></div>
                ))}
                
                {/* Barres */}
                <div className="flex items-end justify-around h-full px-4">
                  {salaryData.map((item, index) => {
                    const containerHeight = 320; // 80 * 4 (h-80 = 20rem = 320px)
                    const maxScale = 70000;
                    const juniorHeight = Math.max((item.junior / maxScale) * containerHeight, 20);
                    const middleHeight = Math.max((item.middle / maxScale) * containerHeight, 20);
                    const seniorHeight = Math.max((item.senior / maxScale) * containerHeight, 20);
                    
                    return (
                      <div key={index} className="flex items-end space-x-1">
                        {/* Barre Junior */}
                        <div 
                          className="bg-indigo-500 rounded-t relative group cursor-pointer hover:opacity-80 transition-opacity"
                          style={{ 
                            height: `${juniorHeight}px`,
                            width: '24px'
                          }}
                        >
                          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {item.junior.toLocaleString()} €
                          </div>
                        </div>
                        
                        {/* Barre Middle */}
                        <div 
                          className="bg-green-500 rounded-t relative group cursor-pointer hover:opacity-80 transition-opacity"
                          style={{ 
                            height: `${middleHeight}px`,
                            width: '24px'
                          }}
                        >
                          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {item.middle.toLocaleString()} €
                          </div>
                        </div>
                        
                        {/* Barre Senior */}
                        <div 
                          className="bg-red-500 rounded-t relative group cursor-pointer hover:opacity-80 transition-opacity"
                          style={{ 
                            height: `${seniorHeight}px`,
                            width: '24px'
                          }}
                        >
                          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {item.senior.toLocaleString()} €
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Labels des domaines */}
              <div className="flex justify-around mt-4 ml-16 px-4">
                {salaryData.map((item, index) => (
                  <div key={index} className="text-center text-sm text-gray-700">
                    <div className="whitespace-pre-line leading-tight">
                      {item.domain}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
            <h3 className="text-xl font-bold text-indigo-900 mb-3">
              Atteignez Ces Salaires avec Nos Formations
            </h3>
            <p className="text-indigo-700 mb-4 max-w-2xl mx-auto">
              Nos formations certifiantes vous préparent aux métiers les mieux rémunérés de la tech.
            </p>
            <a href="/formations" className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-2 px-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
              Voir nos formations
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}