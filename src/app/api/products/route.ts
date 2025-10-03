import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    console.log('=== API PRODUCTS GET - Starting ===')
    
    // Try to get products from database
    const products = await prisma.product.findMany({
      where: { status: 'AVAILABLE' },
      include: {
        images: {
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    
    console.log('=== API PRODUCTS GET - Found', products.length, 'products ===')
    
    // If no products in database, return mock data
    if (products.length === 0) {
      console.log('=== API PRODUCTS GET - No products in database, returning mock data ===')
      const { mockProducts } = await import('@/lib/mock-data')
      return NextResponse.json(mockProducts)
    }
    
    return NextResponse.json(products)
  } catch (error) {
    console.error('=== API PRODUCTS GET - Error:', error, '===')
    // Return mock data on error
    const { mockProducts } = await import('@/lib/mock-data')
    return NextResponse.json(mockProducts)
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('=== API PRODUCTS POST - Starting ===')
    const body = await request.json()
    console.log('=== API PRODUCTS POST - Received data:', body, '===')

    const product = await prisma.product.create({
      data: {
        title: body.title,
        slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
        category: body.category,
        description: body.description || null,
        price: body.price,
        status: body.status || 'AVAILABLE',
        isFeatured: body.isFeatured || false,
        lengthCm: body.lengthCm || null,
        widthCm: body.widthCm || null,
        heightCm: body.heightCm || null,
        weightG: body.weightG || null,
        material: body.material || null,
        glaze: body.glaze || null,
        color: body.color || null,
        year: body.year || new Date().getFullYear(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      include: {
        images: true
      }
    })

    console.log('=== API PRODUCTS POST - Created product:', product, '===')
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('=== API PRODUCTS POST - Error:', error, '===')
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
