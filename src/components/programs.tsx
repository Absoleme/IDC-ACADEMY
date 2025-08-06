import { Formation } from '@/types/formation'
import ProgramCard from './programCard'

interface ProgramsProps {
  formations: Formation[];
}

export default function Programs({ formations }: ProgramsProps) {
  return (
    <section id="formations" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nos Formations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des programmes complets pour votre reconversion professionnelle
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {formations.map((formation) => (
            <ProgramCard key={formation.id} formation={formation} />
          ))}
        </div>
      </div>
    </section>
  )
}
