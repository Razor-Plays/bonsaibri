import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Configure for static export
export const dynamic = 'force-static'

export async function GET() {
  try {
    console.log('=== API BLOG GET - Starting ===')
    
    // Try to get blog posts from database
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' }
    });
    
    console.log('=== API BLOG GET - Found', posts.length, 'posts ===')
    
    // If no posts in database, try without published filter
    if (posts.length === 0) {
      console.log('=== API BLOG GET - No published posts, trying all posts ===')
      const allPosts = await prisma.blogPost.findMany({
        orderBy: { publishedAt: 'desc' }
      });
      console.log('=== API BLOG GET - Found', allPosts.length, 'total posts ===')
      
      if (allPosts.length === 0) {
        console.log('=== API BLOG GET - Still no posts, returning empty array ===')
        return NextResponse.json([]);
      }
      
      return NextResponse.json(allPosts);
    }
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error('=== API BLOG GET - Error:', error, '===')
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
