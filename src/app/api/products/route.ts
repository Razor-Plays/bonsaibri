import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { uploadToCloudinaryServer } from '@/lib/cloudinary'

export const dynamic = 'force-dynamic'

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
    
    // Return all products from database (don't filter by status for now)
    if (products.length === 0) {
      console.log('=== API PRODUCTS GET - No products found, trying without status filter ===')
      // Try again without status filter to debug
      const allProducts = await prisma.product.findMany({
        include: {
          images: {
            orderBy: { order: 'asc' }
          }
        },
        orderBy: { createdAt: 'desc' }
      })
      console.log('=== API PRODUCTS GET - Found', allProducts.length, 'total products ===')
      
      if (allProducts.length === 0) {
        console.log('=== API PRODUCTS GET - Still no products, returning empty array ===')
        return NextResponse.json([])
      }
      
      // Return all products with absolute image URLs for Vercel
      const productsWithAbsoluteUrls = allProducts.map(product => ({
        ...product,
        images: product.images.map(image => ({
          ...image,
          // Only prepend / for relative paths, not full URLs (e.g. Cloudinary)
          url: image.url.startsWith('http') || image.url.startsWith('/') ? image.url : '/' + image.url
        }))
      }))
      
      return NextResponse.json(productsWithAbsoluteUrls)
    }
    
    // Return products with absolute image URLs for Vercel
    const productsWithAbsoluteUrls = products.map(product => ({
      ...product,
      images: product.images.map(image => ({
        ...image,
        // Only prepend / for relative paths, not full URLs (e.g. Cloudinary)
        url: image.url.startsWith('http') || image.url.startsWith('/') ? image.url : '/' + image.url
      }))
    }))
    
    return NextResponse.json(productsWithAbsoluteUrls)
  } catch (error) {
    console.error('=== API PRODUCTS GET - Error:', error, '===')
    // Return empty array on error
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('=== API PRODUCTS POST - Starting ===')
    const formData = await request.formData()

    const title = formData.get('title') as string
    const category = formData.get('category') as string
    const description = (formData.get('description') as string) || null
    const priceRaw = formData.get('price') as string
    const price = priceRaw ? parseInt(priceRaw, 10) : null
    const status = (formData.get('status') as string) || 'AVAILABLE'
    const isFeatured = formData.get('isFeatured') === 'true'
    const material = (formData.get('material') as string) || null
    const glaze = (formData.get('glaze') as string) || null
    const color = (formData.get('color') as string) || null
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

    console.log('=== API PRODUCTS POST - Parsed fields:', { title, category, status }, '===')

    // Upload images to Cloudinary
    const imageFiles = formData.getAll('images') as File[]
    const imageUrls: string[] = []

    for (const file of imageFiles) {
      if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const url = await uploadToCloudinaryServer(buffer, file.name)
        imageUrls.push(url)
        console.log('=== API PRODUCTS POST - Uploaded image to Cloudinary:', url, '===')
      }
    }

    const product = await prisma.product.create({
      data: {
        title,
        slug,
        category,
        description,
        price,
        status,
        isFeatured,
        material,
        glaze,
        color,
        year: new Date().getFullYear(),
        createdAt: new Date(),
        updatedAt: new Date(),
        images: {
          create: imageUrls.map((url, index) => ({
            url,
            order: index,
          })),
        },
      },
      include: {
        images: true,
      },
    })

    console.log('=== API PRODUCTS POST - Created product:', product.id, '===')
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('=== API PRODUCTS POST - Error:', error, '===')
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
