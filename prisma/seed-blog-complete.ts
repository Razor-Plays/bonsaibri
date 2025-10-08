import { PrismaClient } from '@prisma/client'
import { mockBlogPosts } from '@/lib/mock-data'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting comprehensive blog post seeding...')
  console.log(`Found ${mockBlogPosts.length} blog posts to seed`)
  
  // Clear existing blog posts first (optional)
  const deleteResult = await prisma.blogPost.deleteMany({})
  console.log(`Cleared ${deleteResult.count} existing blog posts`)
  
  // Create blog posts with ALL fields from mock data
  for (const mockPost of mockBlogPosts) {
    console.log(`\nProcessing blog post: ${mockPost.title}`)
    console.log(`  - Image: ${mockPost.image}`)
    console.log(`  - Category: ${mockPost.category}`)
    console.log(`  - Tags: ${mockPost.tags}`)
    console.log(`  - Date: ${mockPost.date}`)
    console.log(`  - Content length: ${mockPost.content?.length || 0} characters`)
    console.log(`  - Excerpt: ${mockPost.excerpt}`)
    
    const blogPost = await prisma.blogPost.create({
      data: {
        // Core content fields - these exist in the schema
        title: mockPost.title,
        slug: mockPost.slug,
        content: `# ${mockPost.title}\n\n${mockPost.excerpt}\n\n${mockPost.content || 'Full blog post content from mock data.'}`,
        author: mockPost.author,
        published: true,
        publishedAt: new Date(mockPost.date),
        
        // Timestamps
        createdAt: mockPost.createdAt,
        updatedAt: mockPost.updatedAt
      }
    })
    
    console.log(`✓ Created blog post: ${blogPost.title} (ID: ${blogPost.id})`)
    console.log(`  ✓ Content length: ${blogPost.content.length} characters`)
    console.log(`  ✓ Published at: ${blogPost.publishedAt}`)
  }

  console.log('\n✅ Blog seed data created successfully!')
  console.log(`Total blog posts created: ${mockBlogPosts.length}`)
  
  // Verify the data was created properly
  const allPosts = await prisma.blogPost.findMany()
  console.log('\n📋 Verification - All blog posts in database:')
  allPosts.forEach((post: any) => {
    console.log(`- ${post.title}`)
    console.log(`  Author: ${post.author}`)
    console.log(`  Content length: ${post.content.length} chars`)
    console.log(`  Published: ${post.published} at ${post.publishedAt}`)
    console.log(`  Created: ${post.createdAt}`)
  })
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
