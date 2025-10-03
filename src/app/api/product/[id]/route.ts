import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const formData = await req.formData();
    
    // Extract product fields
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const category = formData.get('category') as any;
    const description = formData.get('description') as string;
    const price = parseInt(formData.get('price') as string);
    const status = formData.get('status') as any;
    const isFeatured = formData.get('isFeatured') === 'true';
    const lengthCm = formData.get('lengthCm') ? parseFloat(formData.get('lengthCm') as string) : null;
    const widthCm = formData.get('widthCm') ? parseFloat(formData.get('widthCm') as string) : null;
    const heightCm = formData.get('heightCm') ? parseFloat(formData.get('heightCm') as string) : null;
    const weightG = formData.get('weightG') ? parseInt(formData.get('weightG') as string) : null;
    const material = formData.get('material') as string;
    const glaze = formData.get('glaze') as string;
    const color = formData.get('color') as string;
    const year = parseInt(formData.get('year') as string);

    // Update product
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        title,
        slug,
        category,
        description,
        price,
        status,
        isFeatured,
        lengthCm,
        widthCm,
        heightCm,
        weightG,
        material,
        glaze,
        color,
        year,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product.' }, { status: 500 });
  }
}

// Also support PATCH method for partial updates
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const formData = await req.formData();
    
    // Build update data dynamically based on provided fields
    const updateData: any = {};
    
    if (formData.has('title')) updateData.title = formData.get('title') as string;
    if (formData.has('slug')) updateData.slug = formData.get('slug') as string;
    if (formData.has('category')) updateData.category = formData.get('category') as any;
    if (formData.has('description')) updateData.description = formData.get('description') as string;
    if (formData.has('price')) updateData.price = parseInt(formData.get('price') as string);
    if (formData.has('status')) updateData.status = formData.get('status') as any;
    if (formData.has('isFeatured')) updateData.isFeatured = formData.get('isFeatured') === 'true';
    if (formData.has('lengthCm')) updateData.lengthCm = formData.get('lengthCm') ? parseFloat(formData.get('lengthCm') as string) : null;
    if (formData.has('widthCm')) updateData.widthCm = formData.get('widthCm') ? parseFloat(formData.get('widthCm') as string) : null;
    if (formData.has('heightCm')) updateData.heightCm = formData.get('heightCm') ? parseFloat(formData.get('heightCm') as string) : null;
    if (formData.has('weightG')) updateData.weightG = formData.get('weightG') ? parseInt(formData.get('weightG') as string) : null;
    if (formData.has('material')) updateData.material = formData.get('material') as string;
    if (formData.has('glaze')) updateData.glaze = formData.get('glaze') as string;
    if (formData.has('color')) updateData.color = formData.get('color') as string;
    if (formData.has('year')) updateData.year = parseInt(formData.get('year') as string);
    
    // Always update the updatedAt timestamp
    updateData.updatedAt = new Date();

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product.' }, { status: 500 });
  }
}

// DELETE method to delete a product
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // First delete associated images
    await prisma.image.deleteMany({
      where: { productId: id }
    });

    // Then delete the product
    const deletedProduct = await prisma.product.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product.' }, { status: 500 });
  }
}

// GET method to fetch a single product by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Failed to fetch product.' }, { status: 500 });
  }
}
