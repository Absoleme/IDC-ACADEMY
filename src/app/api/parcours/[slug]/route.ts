import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    const filePath = path.join(process.cwd(), 'src', 'parcours', `${slug}.json`)
    
    const fileContent = await fs.readFile(filePath, 'utf8')
    const parcoursData = JSON.parse(fileContent)
    
    return NextResponse.json(parcoursData)
  } catch (error) {
    console.error('Error loading parcours:', error)
    return NextResponse.json(
      { error: 'Parcours not found' },
      { status: 404 }
    )
  }
}