// Set up database URL for Vercel environment
const path = require('path');
const databaseUrl = process.env.DATABASE_URL || `file:${path.join(process.cwd(), 'dev.db')}`;
process.env.DATABASE_URL = databaseUrl;

console.log('=== DATABASE URL SET TO:', databaseUrl, '===');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedVercelDatabase() {
  console.log('=== SEEDING VERCEL DATABASE ===');
  
  try {
    // First, ensure database tables exist by running a simple query
    try {
      await prisma.$queryRaw`SELECT 1`;
      console.log('=== Database connection successful ===');
    } catch (dbError) {
      console.log('=== Database may not exist or tables not created yet ===');
      console.log('=== Attempting to create database structure ===');
      
      // Try to run migrations or create tables
      try {
        const { execSync } = require('child_process');
        execSync('npx prisma migrate deploy', { stdio: 'inherit' });
        console.log('=== Database migrations applied successfully ===');
      } catch (migrateError) {
        console.log('=== Migration failed, trying to create tables manually ===');
        // Create tables manually if migrations fail
        await createTablesManually();
      }
    }
    
    // Check if blog posts already exist
    const existingPosts = await prisma.blogPost.count();
    if (existingPosts > 0) {
      console.log('=== Database already seeded, skipping ===');
      return;
    }

    // Create the 3 blog posts you mentioned
    const blogPosts = [
      {
        title: "The Art of Slow Living Through Pottery",
        slug: "art-of-slow-living-through-pottery",
        excerpt: "Discover how the ancient craft of pottery can transform your modern life into a more mindful, intentional journey.",
        content: `# The Art of Slow Living Through Pottery

In our fast-paced world, finding moments of stillness becomes increasingly precious. Through my journey with clay, I've discovered that pottery offers more than just beautiful objects—it provides a pathway to mindful living.

## Finding Peace in the Process

Each morning, I begin by preparing my workspace. The simple act of wedging clay becomes a meditation, connecting me to centuries of artisans who came before. The rhythm of the wheel, the texture of the clay beneath my fingers—these sensations ground me in the present moment.

## The Philosophy Behind Each Piece

When I create a bonsai pot, I'm not just shaping clay. I'm crafting a home for a living artwork, a container that will nurture growth for years to come. This intentionality extends to every piece I make, from Christmas ornaments that will become family heirlooms to smoking accessories designed for mindful relaxation.

## Lessons from the Kiln

The firing process teaches patience like nothing else. You cannot rush the transformation that happens at 1,200 degrees Celsius. Just as clay needs time to become strong and beautiful, we too need time to develop and grow.

## Your Invitation to Slow Down

I invite you to explore my collection not just as objects, but as invitations to pause. Whether you're repotting a bonsai, decorating for the holidays, or enjoying a quiet moment, let these pieces remind you that the best things in life take time.

*Brian*`,
        author: "Brian",
        published: true,
        publishedAt: new Date('2024-01-15'),
        category: "Philosophy",
        tags: "slow living, pottery, mindfulness",
        readTime: "5 min read",
        image: "blog-slow-living.jpg",
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      {
        title: "Christmas Ornaments: Crafting Holiday Memories",
        slug: "christmas-ornaments-crafting-holiday-memories",
        excerpt: "Each ornament tells a story. Learn about the tradition and care that goes into creating these festive treasures.",
        content: `# Christmas Ornaments: Crafting Holiday Memories

There's something magical about unpacking ornaments each December. Each piece holds memories of Christmases past, carrying the weight of tradition and the promise of new memories to come.

## The Tradition of Handmade Ornaments

Growing up in Northern Ontario, Christmas was always special. The long winters gave us time to create, and my mother taught me that the best decorations are those made by hand. This philosophy guides my ornament creation today.

## From Clay to Celebration

Each ornament begins as a simple ball of clay. Through careful shaping, texturing, and glazing, it transforms into something that will hang on your tree for decades. I think about the families who will gather around these pieces, the stories they'll tell, the photos they'll appear in.

## The Glazing Process

Christmas colors require special attention. The deep reds must be rich but not overwhelming. The greens should evoke pine forests. Golds and silvers need to catch the light just right. Each glaze is mixed with care, tested, and perfected.

## Creating New Traditions

When you hang one of my ornaments on your tree, you're not just decorating—you're starting a tradition. These pieces are designed to be passed down, to become part of your family's story.

## Care and Keeping

These ornaments are made to last. Pack them carefully, handle them with love, and they'll serve your family for generations. Like the best traditions, they improve with age, developing a patina that speaks of Christmases well-celebrated.

*Brian*`,
        author: "Brian",
        published: true,
        publishedAt: new Date('2024-01-20'),
        category: "Holidays",
        tags: "christmas, ornaments, tradition",
        readTime: "4 min read",
        image: "blog-christmas-ornaments.jpg",
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20')
      },
      {
        title: "Bonsai Pots: The Perfect Home for Your Miniature Trees",
        slug: "bonsai-pots-perfect-home-miniature-trees",
        excerpt: "Discover what makes a great bonsai pot and how to choose the right one for your miniature masterpiece.",
        content: `# Bonsai Pots: The Perfect Home for Your Miniature Trees

Bonsai is more than just growing small trees—it's an art form that captures the essence of nature in miniature. And every great bonsai needs the perfect pot to complete the composition.

## Understanding Bonsai Aesthetics

The pot is not merely a container; it's an integral part of the artistic statement. The right pot enhances the tree's beauty, provides proper growing conditions, and creates visual harmony that speaks to centuries of Japanese aesthetic tradition.

## Choosing the Right Pot

When selecting a bonsai pot, consider:
- **Proportion**: The pot should complement, not compete with, your tree
- **Color**: Earth tones often work best, allowing the tree to be the star
- **Texture**: Smooth vs. textured surfaces create different moods
- **Drainage**: Essential for healthy root development

## My Approach to Bonsai Pottery

Each pot I create is designed with both beauty and function in mind. The clay body is formulated for excellent drainage while retaining just enough moisture. The glazes are chosen to complement the tree's natural colors without overwhelming them.

## The Making Process

I start by understanding the tree that will call this pot home. Upright trees need different proportions than cascade styles. The pot's walls are thrown to the perfect thickness—not too heavy, not too delicate. Drainage holes are carefully placed and sized.

## Seasonal Considerations

Different seasons call for different approaches. Winter pots need to withstand freezing temperatures. Summer pots must breathe in the heat. Each season brings its own challenges and opportunities for growth.

## Your Bonsai Journey

Whether you're a seasoned bonsai artist or just beginning your journey, remember that the pot is your tree's home for years to come. Choose wisely, care for it properly, and watch as your miniature landscape flourishes.

*Brian*`,
        author: "Brian",
        published: true,
        publishedAt: new Date('2024-01-25'),
        category: "Bonsai",
        tags: "bonsai, pottery, japanese aesthetics",
        readTime: "6 min read",
        image: "blog-bonsai-pot.jpg",
        createdAt: new Date('2024-01-25'),
        updatedAt: new Date('2024-01-25')
      }
    ];

    console.log('=== Creating', blogPosts.length, 'blog posts ===');
    
    for (const post of blogPosts) {
      await prisma.blogPost.create({
        data: post
      });
      console.log('=== Created post:', post.title, '===');
    }

    console.log('=== DATABASE SEEDING COMPLETE ===');
  } catch (error) {
    console.error('=== SEEDING ERROR:', error, '===');
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding if this script is executed directly
if (require.main === module) {
  seedVercelDatabase()
    .then(() => {
      console.log('=== SEEDING SCRIPT COMPLETED SUCCESSFULLY ===');
      process.exit(0);
    })
    .catch((error) => {
      console.error('=== SEEDING SCRIPT FAILED:', error, '===');
      process.exit(1);
    });
}

module.exports = { seedVercelDatabase };
