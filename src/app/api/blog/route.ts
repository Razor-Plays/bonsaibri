import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

// Configure for static export
export const dynamic = 'force-static'

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { publishedAt: 'desc' }
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog posts.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    // Extract blog post fields
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const content = formData.get('content') as string;
    const author = formData.get('author') as string;
    const published = formData.get('published') === 'true';
    const publishedAt = formData.get('publishedAt') ? new Date(formData.get('publishedAt') as string) : null;

    // Create blog post
    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        content,
        author,
        published,
        publishedAt,
      },
    });

    // Handle images (not implemented: file upload)
    // You can extend this to save image URLs or handle file uploads

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create blog post.' }, { status: 500 });
  }
}
