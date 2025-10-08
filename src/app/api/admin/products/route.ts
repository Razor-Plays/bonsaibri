import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Configure for static export
export const dynamic = 'force-static'

export async function GET() {
  try {
    console.log('=== ADMIN API PRODUCTS GET - Starting ===')
    
    // Get ALL products from database (including SOLD and CUSTOM)
    const products = await prisma.product.findMany({
      include: {
        images: {
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    
    console.log('=== ADMIN API PRODUCTS GET - Found', products.length, 'products ===')
    
    // If no products in database, return mock data
    if (products.length === 0) {
      console.log('=== ADMIN API PRODUCTS GET - No products in database, returning mock data ===')
      const { mockProducts } = await import('@/lib/mock-data')
      return NextResponse.json(mockProducts)
    }
    
    return NextResponse.json(products)
  } catch (error) {
    console.error('=== ADMIN API PRODUCTS GET - Error:', error, '===')
    // Return mock data on error
    const { mockProducts } = await import('@/lib/mock-data')
    return NextResponse.json(mockProducts)
  }
}
