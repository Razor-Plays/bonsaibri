import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { uploadToCloudinaryServer } from '@/lib/cloudinary'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        images: {
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const title = formData.get('title') as string
    const category = formData.get('category') as string
    const description = formData.get('description') as string
    const price = formData.get('price') ? parseInt(formData.get('price') as string) : null
    const status = (formData.get('status') as string) || 'AVAILABLE'
    const isFeatured = formData.get('isFeatured') === 'true'
    const material = formData.get('material') as string || null
    const glaze = formData.get('glaze') as string || null
    const color = formData.get('color') as string || null
    const lengthCm = formData.get('lengthCm') ? parseFloat(formData.get('lengthCm') as string) : null
    const widthCm = formData.get('widthCm') ? parseFloat(formData.get('widthCm') as string) : null
    const heightCm = formData.get('heightCm') ? parseFloat(formData.get('heightCm') as string) : null
    const weightG = formData.get('weightG') ? parseInt(formData.get('weightG') as string) : null
    const year = formData.get('year') ? parseInt(formData.get('year') as string) : new Date().getFullYear()

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') + '-' + Date.now()

    const product = await prisma.product.create({
      data: {
        title, slug, category, description, price,
        status, isFeatured, material, glaze, color,
        lengthCm, widthCm, heightCm, weightG, year,
      }
    })

    const imageFiles = formData.getAll('images') as File[]
    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i]
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer())
        const url = await uploadToCloudinaryServer(buffer, `product-${product.id}-${i}`)
        await prisma.image.create({
          data: { url, alt: title, order: i, productId: product.id }
        })
      }
    }

    const productWithImages = await prisma.product.findUnique({
      where: { id: product.id },
      include: { images: { orderBy: { order: 'asc' } } }
    })

    return NextResponse.json(productWithImages, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
