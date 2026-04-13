import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { uploadToCloudinaryServer } from '@/lib/cloudinary'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' }
    })
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const excerptInput = formData.get('excerpt') as string
    const excerpt = excerptInput && excerptInput.trim()
      ? excerptInput.trim()
      : content.substring(0, 200) + '...'
    const author = formData.get('author') as string || 'Brian'

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') + '-' + Date.now()

    // Handle image upload
    let imageUrl: string | null = null
    const imageFile = formData.get('image')
    if (imageFile && imageFile instanceof File && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer())
      imageUrl = await uploadToCloudinaryServer(buffer, 'blog-' + Date.now())
    }

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        author,
        published: true,
        publishedAt: new Date(),
        image: imageUrl,
      }
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 })
  }
}
