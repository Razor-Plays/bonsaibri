import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const formData = await req.formData();
    
    // Extract blog post fields
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const content = formData.get('content') as string;
    const author = formData.get('author') as string;
    const published = formData.get('published') === 'true';

    // Update blog post
    const updatedBlogPost = await prisma.blogPost.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        author,
        published,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedBlogPost);
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({ error: 'Failed to update blog post.' }, { status: 500 });
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
    if (formData.has('content')) updateData.content = formData.get('content') as string;
    if (formData.has('author')) updateData.author = formData.get('author') as string;
    if (formData.has('published')) updateData.published = formData.get('published') === 'true';
    
    // Always update the updatedAt timestamp
    updateData.updatedAt = new Date();

    const updatedBlogPost = await prisma.blogPost.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedBlogPost);
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({ error: 'Failed to update blog post.' }, { status: 500 });
  }
}

// DELETE method to delete a blog post
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const deletedBlogPost = await prisma.blogPost.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Blog post deleted successfully', blogPost: deletedBlogPost });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ error: 'Failed to delete blog post.' }, { status: 500 });
  }
}

// GET method to fetch a single blog post by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const blogPost = await prisma.blogPost.findUnique({
      where: { id }
    });

    if (!blogPost) {
      return NextResponse.json({ error: 'Blog post not found.' }, { status: 404 });
    }

    return NextResponse.json(blogPost);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json({ error: 'Failed to fetch blog post.' }, { status: 500 });
  }
}
