import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    // Extract product fields
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
      const category = formData.get('category') as any;
    const description = formData.get('description') as string;
    const price = parseInt(formData.get('price') as string);
      const status = formData.get('status') as any;
    const isFeatured = formData.get('isFeatured') === 'true';
    const lengthCm = parseFloat(formData.get('lengthCm') as string);
    const widthCm = parseFloat(formData.get('widthCm') as string);
    const heightCm = parseFloat(formData.get('heightCm') as string);
    const weightG = parseInt(formData.get('weightG') as string);
    const material = formData.get('material') as string;
    const glaze = formData.get('glaze') as string;
    const color = formData.get('color') as string;
    const year = parseInt(formData.get('year') as string);

    // Create product
    const product = await prisma.product.create({
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
      },
    });

    // Handle images (not implemented: file upload)
    // You can extend this to save image URLs or handle file uploads

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product.' }, { status: 500 });
  }
}
