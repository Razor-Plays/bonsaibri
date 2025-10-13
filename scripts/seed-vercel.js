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
    
    // Check if blog posts table exists first
    try {
      const existingPosts = await prisma.blogPost.count();
      console.log('=== Found', existingPosts, 'existing blog posts ===');
      if (existingPosts > 0) {
        console.log('=== Database already seeded, skipping ===');
        return;
      }
    } catch (tableError) {
      console.log('=== BlogPost table does not exist yet ===');
      console.log('=== Table error:', tableError.message, '===');
      // Table doesn't exist, proceed with seeding
    }

    // Create the 3 blog posts matching the actual schema
    const blogPosts = [
      {
        title: "The Art of Slow Living Through Pottery",
        slug: "art-of-slow-living-through-pottery",
        content: `# The Art of Slow Living Through Pottery

In our fast-paced world, finding moments of stillness becomes increasingly precious. Through my journey with clay, I've discovered that pottery offers more than just beautiful objects—it provides a pathway to mindful living.

Each morning, I begin by preparing my workspace. The simple act of wedging clay becomes a meditation, connecting me to centuries of artisans who came before. The rhythm of the wheel, the texture of the clay beneath my fingers—these sensations ground me in the present moment.

When I create a bonsai pot, I'm not just shaping clay. I'm crafting a home for a living artwork, a container that will nurture growth for years to come. This intentionality extends to every piece I make.

The firing process teaches patience like nothing else. You cannot rush the transformation that happens at 1,200 degrees Celsius. Just as clay needs time to become strong and beautiful, we too need time to develop and grow.

I invite you to explore my collection not just as objects, but as invitations to pause. Whether you're repotting a bonsai, decorating for the holidays, or enjoying a quiet moment, let these pieces remind you that the best things in life take time.

*Brian*`,
        author: "Brian",
        published: true,
        publishedAt: new Date('2024-01-15')
      },
      {
        title: "Christmas Ornaments: Crafting Holiday Memories",
        slug: "christmas-ornaments-crafting-holiday-memories",
        content: `# Christmas Ornaments: Crafting Holiday Memories

There's something magical about unpacking ornaments each December. Each piece holds memories of Christmases past, carrying the weight of tradition and the promise of new memories to come.

Growing up in Northern Ontario, Christmas was always special. The long winters gave us time to create, and my mother taught me that the best decorations are those made by hand. This philosophy guides my ornament creation today.

Each ornament begins as a simple ball of clay. Through careful shaping, texturing, and glazing, it transforms into something that will hang on your tree for decades. I think about the families who will gather around these pieces, the stories they'll tell, the photos they'll appear in.

When you hang one of my ornaments on your tree, you're not just decorating—you're starting a tradition. These pieces are designed to be passed down, to become part of your family's story.

These ornaments are made to last. Pack them carefully, handle them with love, and they'll serve your family for generations. Like the best traditions, they improve with age, developing a patina that speaks of Christmases well-celebrated.

*Brian*`,
        author: "Brian",
        published: true,
        publishedAt: new Date('2024-01-20')
      },
      {
        title: "Bonsai Pots: The Perfect Home for Your Miniature Trees",
        slug: "bonsai-pots-perfect-home-miniature-trees",
        content: `# Bonsai Pots: The Perfect Home for Your Miniature Trees

Bonsai is more than just growing small trees—it's an art form that captures the essence of nature in miniature. And every great bonsai needs the perfect pot to complete the composition.

The pot is not merely a container; it's an integral part of the artistic statement. The right pot enhances the tree's beauty, provides proper growing conditions, and creates visual harmony that speaks to centuries of Japanese aesthetic tradition.

When selecting a bonsai pot, consider proportion, color, texture, and drainage. The pot should complement your tree, with earth tones often working best to allow the tree to be the star.

Each pot I create is designed with both beauty and function in mind. The clay body is formulated for excellent drainage while retaining just enough moisture. The glazes are chosen to complement the tree's natural colors without overwhelming them.

I start by understanding the tree that will call this pot home. Upright trees need different proportions than cascade styles. The pot's walls are thrown to the perfect thickness—not too heavy, not too delicate. Drainage holes are carefully placed and sized.

Whether you're a seasoned bonsai artist or just beginning your journey, remember that the pot is your tree's home for years to come. Choose wisely, care for it properly, and watch as your miniature landscape flourishes.

*Brian*`,
        author: "Brian",
        published: true,
        publishedAt: new Date('2024-01-25')
      }
    ];

    console.log('=== Creating', blogPosts.length, 'blog posts ===');
    
    for (const post of blogPosts) {
      try {
        const created = await prisma.blogPost.create({
          data: post
        });
        console.log('=== Successfully created post:', created.title, 'with ID:', created.id, '===');
      } catch (createError) {
        console.error('=== Failed to create post:', post.title, 'Error:', createError.message, '===');
        throw createError;
      }
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
