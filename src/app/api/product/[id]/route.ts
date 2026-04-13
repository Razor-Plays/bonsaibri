import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { uploadToCloudinaryServer } from '@/lib/cloudinary'

export const dynamic = 'force-dynamic'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
      },
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const formData = await request.formData()

    const title = formData.get('title') as string
    const slug = formData.get('slug') as string | null
    const category = formData.get('category') as string
    const description = formData.get('description') as string
    const price = formData.get('price') ? parseInt(formData.get('price') as string) : null
    const status = (formData.get('status') as string) || 'AVAILABLE'
    const isFeatured = formData.get('isFeatured') === 'true'
    const material = (formData.get('material') as string) || null
    const glaze = (formData.get('glaze') as string) || null
    const color = (formData.get('color') as string) || null
    const lengthCm = formData.get('lengthCm') ? parseFloat(formData.get('lengthCm') as string) : null
    const widthCm = formData.get('widthCm') ? parseFloat(formData.get('widthCm') as string) : null
    const heightCm = formData.get('heightCm') ? parseFloat(formData.get('heightCm') as string) : null
    const weightG = formData.get('weightG') ? parseInt(formData.get('weightG') as string) : null
    const year = formData.get('year') ? parseInt(formData.get('year') as string) : null

    // Delete images marked for removal
    const deleteImageIdsRaw = formData.get('deleteImageIds') as string | null
    if (deleteImageIdsRaw) {
      const deleteIds = deleteImageIdsRaw.split(',').map((s) => s.trim()).filter(Boolean)
      if (deleteIds.length > 0) {
        await prisma.image.deleteMany({
          where: { id: { in: deleteIds }, productId: id },
        })
      }
    }

    // Update per-image position values
    const existingImages = await prisma.image.findMany({
      where: { productId: id },
    })
    for (const image of existingImages) {
      const positionValue = formData.get(`imagePosition_${image.id}`) as string | null
      if (positionValue !== null) {
        await prisma.image.update({
          where: { id: image.id },
          data: { position: positionValue },
        })
      }
    }

    // Upload new images
    const imageFiles = formData.getAll('images') as File[]
    const currentImageCount = await prisma.image.count({ where: { productId: id } })

    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i]
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer())
        const url = await uploadToCloudinaryServer(buffer, `product-${id}-new-${Date.now()}-${i}`)
        await prisma.image.create({
          data: { url, alt: title, order: currentImageCount + i, productId: id },
        })
      }
    }

    const updateData: Record<string, unknown> = {
      title, category, description, price,
      status, isFeatured, material, glaze, color,
      lengthCm, widthCm, heightCm, weightG, year,
    }
    if (slug) {
      updateData.slug = slug
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
      },
    })

    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    await prisma.product.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
