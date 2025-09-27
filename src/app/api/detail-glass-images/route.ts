import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const detailGlassPath = path.join(process.cwd(), 'public', 'detail-glass')
    
    // Check if directory exists
    if (!fs.existsSync(detailGlassPath)) {
      return NextResponse.json([])
    }
    
    // Read directory contents
    const files = fs.readdirSync(detailGlassPath)
    
    // Filter only PNG files and exclude system files
    const imageFiles = files.filter(file => 
      file.toLowerCase().endsWith('.png') && 
      !file.startsWith('.') &&
      !file.startsWith('_')
    )
    
    return NextResponse.json(imageFiles)
  } catch (error) {
    console.error('Error reading detail-glass directory:', error)
    return NextResponse.json([])
  }
}
