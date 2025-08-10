import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

async function findFormationFile(formationId: string, dir: string): Promise<string | null> {
  async function traverse(currentDir: string): Promise<string | null> {
    const entries = await fs.readdir(currentDir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name)
      
      if (entry.isDirectory()) {
        const found = await traverse(fullPath)
        if (found) return found
      } else if (entry.isFile() && entry.name.endsWith('.json')) {
        try {
          const fileContent = await fs.readFile(fullPath, 'utf8')
          const formation = JSON.parse(fileContent)
          if (formation.id === formationId) {
            return fullPath
          }
        } catch (error) {
          // Skip invalid JSON files
        }
      }
    }
    
    return null
  }
  
  return await traverse(dir)
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const formationsDir = path.join(process.cwd(), 'src', 'formations')
    
    const filePath = await findFormationFile(id, formationsDir)
    
    if (!filePath) {
      return NextResponse.json(
        { error: 'Formation not found' },
        { status: 404 }
      )
    }
    
    const fileContent = await fs.readFile(filePath, 'utf8')
    const formation = JSON.parse(fileContent)
    
    return NextResponse.json(formation)
  } catch (error) {
    console.error('Error loading formation:', error)
    return NextResponse.json(
      { error: 'Formation not found' },
      { status: 404 }
    )
  }
}