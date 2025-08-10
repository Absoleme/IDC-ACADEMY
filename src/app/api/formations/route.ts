import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

interface FormationMetadata {
  id: string
  type: string
  titre: string
  categorie: string
  sous_categorie?: string
  duree_formation: string
  resume: string
  certifications_visees: string[]
  competences: string[]
  postes_accessibles: string[]
  salaire_moyen: string
  modalites: string[]
}

async function getAllFormationFiles(dir: string): Promise<string[]> {
  const files: string[] = []
  
  async function traverse(currentDir: string) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name)
      
      if (entry.isDirectory()) {
        await traverse(fullPath)
      } else if (entry.isFile() && entry.name.endsWith('.json') && entry.name !== 'formations.json') {
        files.push(fullPath)
      }
    }
  }
  
  await traverse(dir)
  return files
}

export async function GET() {
  try {
    const formationsDir = path.join(process.cwd(), 'src', 'formations')
    const formationFiles = await getAllFormationFiles(formationsDir)
    
    const formations: FormationMetadata[] = []
    
    for (const filePath of formationFiles) {
      try {
        const fileContent = await fs.readFile(filePath, 'utf8')
        const formation = JSON.parse(fileContent)
        
        // Extract metadata only
        const metadata: FormationMetadata = {
          id: formation.id,
          type: formation.type,
          titre: formation.titre,
          categorie: formation.categorie,
          sous_categorie: formation.sous_categorie || '',
          duree_formation: formation.duree_formation,
          resume: formation.resume,
          certifications_visees: formation.certifications_visees || [],
          competences: formation.competences || [],
          postes_accessibles: formation.postes_accessibles || [],
          salaire_moyen: formation.salaire_moyen || '',
          modalites: formation.modalites || []
        }
        
        formations.push(metadata)
      } catch (error) {
        console.warn(`Failed to parse formation file ${filePath}:`, error)
      }
    }
    
    // Group by category
    const groupedFormations = formations.reduce((acc, formation) => {
      const category = formation.categorie.toLowerCase()
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(formation)
      return acc
    }, {} as Record<string, FormationMetadata[]>)
    
    return NextResponse.json({
      categories: Object.keys(groupedFormations).map(categoryKey => ({
        id: categoryKey,
        nom: groupedFormations[categoryKey][0].categorie,
        formations: groupedFormations[categoryKey]
      }))
    })
  } catch (error) {
    console.error('Error loading formations:', error)
    return NextResponse.json(
      { error: 'Failed to load formations' },
      { status: 500 }
    )
  }
}