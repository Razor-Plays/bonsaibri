import { PrismaClient } from '@prisma/client'
import { mockBlogPosts } from '@/lib/mock-data'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting to seed blog posts...')
  
  // Create blog posts from mock data
  for (const mockPost of mockBlogPosts) {
    const blogPost = await prisma.blogPost.create({
      data: {
        title: mockPost.title,
        slug: mockPost.slug,
        content: mockPost.content || `# ${mockPost.title}\n\n${mockPost.excerpt}\n\nThis is the full content of the blog post. In a real implementation, this would contain the complete article content.`,
        author: mockPost.author,
        published: true,
        publishedAt: new Date(mockPost.date),
        createdAt: mockPost.createdAt,
        updatedAt: mockPost.updatedAt
      }
    })
    console.log(`Created blog post: ${blogPost.title}`)
  }

  console.log('Blog seed data created successfully!')
  console.log(`Total blog posts created: ${mockBlogPosts.length}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
