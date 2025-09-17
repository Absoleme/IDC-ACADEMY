import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    const filePath = path.join(process.cwd(), 'src', 'reconversion', `${slug}.json`)

    const fileContent = await fs.readFile(filePath, 'utf8')
    const parcoursData = JSON.parse(fileContent)

    // Adapter les données pour être compatibles avec le FormationDetailModal
    const adaptedData = {
      ...parcoursData,
      // S'assurer que les champs attendus par le modal sont des arrays
      objectifs: Array.isArray(parcoursData.objectifs) ? parcoursData.objectifs : (parcoursData.objectifs ? [parcoursData.objectifs] : []),
      competences: parcoursData.modules?.map((module: any) => module.module) || [],
      certifications_visees: Array.isArray(parcoursData.objectifs) ? parcoursData.objectifs : [],
      modalites: parcoursData.modalites ? [parcoursData.modalites] : [],
      prerequis: parcoursData.prerequis || '',
      // Ajouter des champs manquants pour éviter les erreurs
      certifications_inclues: [],
      postes_accessibles: [],
      // Adapter le programme si nécessaire
      modules: parcoursData.modules || []
    }

    return NextResponse.json(adaptedData)
  } catch (error) {
    console.error('Error loading reconversion parcours:', error)
    return NextResponse.json(
      { error: 'Parcours de reconversion not found' },
      { status: 404 }
    )
  }
}