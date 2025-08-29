import { Formation } from '@/types/formation'

interface ProgramCardProps {
  formation: Formation;
}

export default function ProgramCard({ formation }: ProgramCardProps) {
  return (
    <div className="card">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{formation.titre}</h3>
      
      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <span className="text-sm text-gray-600">Durée</span>
            <p className="font-semibold">{formation.duree}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">Prix</span>
            <p className="font-semibold">{formation.prix}</p>
          </div>
        </div>
        
        {formation.tauxInsertion && (
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
              {formation.tauxInsertion} insertion
            </span>
            {formation.augmentationSalariale && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {formation.augmentationSalariale} salaire
              </span>
            )}
            {formation.tauxCDI && (
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                {formation.tauxCDI} CDI
              </span>
            )}
          </div>
        )}
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-2">Public cible :</h4>
        <p className="text-gray-600 text-sm">{formation.public}</p>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-2">Prérequis :</h4>
        <p className="text-gray-600 text-sm">{formation.prerequis}</p>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-3">Programme :</h4>
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-3">
          <p className="text-sm text-amber-800 font-medium">
            ℹ️ Ce programme peut être adapté selon vos besoins spécifiques
          </p>
        </div>
        <div className="space-y-3">
          {formation.programme.map((module, index) => (
            <details key={index} className="group">
              <summary className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-700 list-none flex items-center">
                <svg className="w-4 h-4 mr-2 transform group-open:rotate-90 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                {module.module}
              </summary>
              <div className="mt-2 ml-6">
                <ul className="text-xs text-gray-600 space-y-1">
                  {module.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <a 
          href={`tel:${formation.contact.telephone}`}
          className="btn-primary text-center text-sm"
        >
          Appeler {formation.contact.telephone}
        </a>
        <a 
          href={`mailto:${formation.contact.email}`}
          className="btn-secondary text-center text-sm"
        >
          Envoyer un email
        </a>
      </div>
    </div>
  )
}
