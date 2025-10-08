import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Sample products data
  const products = [
    {
      title: 'Handcrafted Bonsai Pot - Round',
      slug: 'handcrafted-bonsai-pot-round',
      category: 'BONSAI_POTS',
      description: `A beautifully handcrafted round bonsai pot, perfect for showcasing your miniature trees. Made from high-quality clay with a natural finish that complements any bonsai specimen.

**Features:**
- Hand-thrown on the potter's wheel
- Drainage holes for proper water management
- Natural clay finish
- Suitable for indoor and outdoor use`,
      lengthCm: 15.0,
      widthCm: 15.0,
      heightCm: 5.0,
      weightG: 450,
      material: 'Stoneware clay',
      glaze: 'Unglazed natural finish',
      color: 'Natural clay',
      year: 2024,
      price: 4500, // $45.00 in cents
      status: 'AVAILABLE',
      isFeatured: true,
      images: [
        { url: '/bonsai-pot-1.jpg', alt: 'Handcrafted round bonsai pot', order: 0 },
        { url: '/bonsai-pot-2.jpg', alt: 'Detail view of bonsai pot', order: 1 }
      ]
    },
    {
      title: 'Rectangular Bonsai Pot - Glazed',
      slug: 'rectangular-bonsai-pot-glazed',
      category: 'BONSAI_POTS',
      description: `Elegant rectangular bonsai pot with a beautiful celadon glaze. Perfect for formal upright bonsai styles. The clean lines and subtle glaze make this a timeless piece.

**Features:**
- Rectangular design ideal for formal styles
- Celadon glaze with subtle crackle
- Multiple drainage holes
- Frost-resistant`,
      lengthCm: 20.0,
      widthCm: 12.0,
      heightCm: 6.0,
      weightG: 650,
      material: 'Porcelain clay',
      glaze: 'Celadon',
      color: 'Light green',
      year: 2024,
      price: 6500, // $65.00 in cents
      status: 'AVAILABLE',
      isFeatured: true,
      images: [
        { url: '/bonsai-pot-2.jpg', alt: 'Rectangular bonsai pot with celadon glaze', order: 0 }
      ]
    },
    {
      title: 'Oval Bonsai Pot - Traditional',
      slug: 'oval-bonsai-pot-traditional',
      category: 'BONSAI_POTS',
      description: `Traditional oval bonsai pot with feet, featuring a rich brown glaze. This classic design has been used for centuries in bonsai cultivation.

**Features:**
- Traditional oval shape with feet
- Rich brown glaze
- Perfect for informal upright styles
- High-quality craftsmanship`,
      lengthCm: 18.0,
      widthCm: 13.0,
      heightCm: 4.5,
      weightG: 520,
      material: 'Stoneware clay',
      glaze: 'Brown glaze',
      color: 'Brown',
      year: 2023,
      price: 5500, // $55.00 in cents
      status: 'SOLD',
      isFeatured: false,
      images: [
        { url: '/bonsai-pot-1.jpg', alt: 'Traditional oval bonsai pot', order: 0 }
      ]
    },
    {
      title: 'Ceramic Christmas Ornament - Snowflake',
      slug: 'ceramic-christmas-ornament-snowflake',
      category: 'CHRISTMAS_ORNAMENTS',
      description: `Hand-painted ceramic Christmas ornament featuring a delicate snowflake design. Each piece is unique and makes a perfect gift or addition to your holiday decor.

**Features:**
- Hand-painted snowflake design
- Glazed ceramic construction
- Includes ribbon for hanging
- Packaged in gift box`,
      lengthCm: 8.0,
      widthCm: 8.0,
      heightCm: 0.5,
      weightG: 45,
      material: 'Ceramic',
      glaze: 'Clear glaze',
      color: 'White and blue',
      year: 2024,
      price: 1500, // $15.00 in cents
      status: 'AVAILABLE',
      isFeatured: true,
      images: [
        { url: '/ornament-1.jpg', alt: 'Ceramic snowflake Christmas ornament', order: 0 }
      ]
    },
    {
      title: 'Christmas Tree Ornament - Handcrafted',
      slug: 'christmas-tree-ornament-handcrafted',
      category: 'CHRISTMAS_ORNAMENTS',
      description: `Charming handcrafted Christmas tree ornament with a rustic finish. Each piece is individually shaped and painted, making every ornament unique.

**Features:**
- Hand-shaped tree design
- Rustic glaze finish
- Natural twine hanger
- Perfect for rustic or traditional decor`,
      lengthCm: 7.5,
      widthCm: 5.0,
      heightCm: 0.8,
      weightG: 35,
      material: 'Earthenware',
      glaze: 'Rustic matte glaze',
      color: 'Green and brown',
      year: 2024,
      price: 1200, // $12.00 in cents
      status: 'AVAILABLE',
      isFeatured: false,
      images: [
        { url: '/ornament-2.jpg', alt: 'Handcrafted Christmas tree ornament', order: 0 }
      ]
    },
    {
      title: 'Angel Ornament - Ceramic',
      slug: 'angel-ornament-ceramic',
      category: 'CHRISTMAS_ORNAMENTS',
      description: `Beautiful ceramic angel ornament with intricate details. This elegant piece adds a touch of serenity to your Christmas tree.

**Features:**
- Detailed angel design
- Smooth ceramic finish
- Gold accent details
- Comes with decorative ribbon`,
      lengthCm: 9.0,
      widthCm: 6.0,
      heightCm: 0.6,
      weightG: 40,
      material: 'Ceramic',
      glaze: 'White glaze',
      color: 'White with gold accents',
      year: 2023,
      price: 1800, // $18.00 in cents
      status: 'CUSTOM',
      isFeatured: false,
      images: [
        { url: '/ornament-1.jpg', alt: 'Ceramic angel Christmas ornament', order: 0 }
      ]
    },
    {
      title: 'Ceramic Smoking Pipe - Artisan',
      slug: 'ceramic-smoking-pipe-artisan',
      category: 'SMOKING_ACCESSORIES',
      description: `Handcrafted ceramic smoking pipe with a unique glaze pattern. Each pipe is individually crafted and fired to perfection.

**Features:**
- Hand-thrown ceramic construction
- Unique glaze pattern
- Comfortable mouthpiece
- Easy to clean`,
      lengthCm: 12.0,
      widthCm: 4.0,
      heightCm: 3.0,
      weightG: 85,
      material: 'Stoneware clay',
      glaze: 'Variegated glaze',
      color: 'Blue and brown',
      year: 2024,
      price: 3500, // $35.00 in cents
      status: 'AVAILABLE',
      isFeatured: true,
      images: [
        { url: '/pipe-1.jpg', alt: 'Artisan ceramic smoking pipe', order: 0 }
      ]
    },
    {
      title: 'Ceramic Water Pipe - Small',
      slug: 'ceramic-water-pipe-small',
      category: 'SMOKING_ACCESSORIES',
      description: `Compact ceramic water pipe perfect for personal use. Features a simple design with effective water filtration.

**Features:**
- Compact size for portability
- Effective water filtration
- Easy to disassemble for cleaning
- Stable base design`,
      lengthCm: 15.0,
      widthCm: 8.0,
      heightCm: 20.0,
      weightG: 450,
      material: 'Ceramic',
      glaze: 'Clear glaze',
      color: 'White',
      year: 2024,
      price: 8500, // $85.00 in cents
      status: 'AVAILABLE',
      isFeatured: false,
      images: [
        { url: '/ashtray-1.jpg', alt: 'Small ceramic water pipe', order: 0 }
      ]
    },
    {
      title: 'Ceramic Ashtray - Leaf Design',
      slug: 'ceramic-ashtray-leaf-design',
      category: 'SMOKING_ACCESSORIES',
      description: `Decorative ceramic ashtray featuring a leaf design. Functional and beautiful, perfect for outdoor or indoor use.

**Features:**
- Leaf-shaped design
- Multiple cigarette rests
- Easy to clean ceramic
- Weather-resistant glaze`,
      lengthCm: 15.0,
      widthCm: 12.0,
      heightCm: 3.0,
      weightG: 320,
      material: 'Ceramic',
      glaze: 'Weather-resistant glaze',
      color: 'Green and brown',
      year: 2024,
      price: 2500, // $25.00 in cents
      status: 'AVAILABLE',
      isFeatured: false,
      images: [
        { url: '/ashtray-1.jpg', alt: 'Ceramic leaf design ashtray', order: 0 }
      ]
    }
  ]

  // Create products with images
  for (const productData of products) {
    const { images, ...productInfo } = productData
    
    const product = await prisma.product.create({
      data: productInfo as any
    })

    // Create images for the product
    for (const imageData of images) {
      await prisma.image.create({
        data: {
          ...imageData,
          productId: product.id
        }
      })
    }

    console.log(`Created product: ${product.title}`)
  }

  console.log('Seed data created successfully!')

  // Create blog posts
  const blogPosts = [
    {
      title: 'The Art of Choosing the Perfect Bonsai Pot',
      slug: 'choosing-perfect-bonsai-pot',
      content: `# The Art of Choosing the Perfect Bonsai Pot

Selecting the right pot for your bonsai is both an art and a science. The pot should complement your tree without overshadowing it, creating a harmonious composition that tells a story.

## Understanding Proportions

The general rule is that the pot should be approximately 2/3 the height of your tree. However, this can vary depending on the style:

- **Formal upright**: Pot width should equal the trunk diameter at the base × 6
- **Informal upright**: Slightly wider pots work well
- **Cascade**: Deeper pots provide stability for the hanging branches

## Color Considerations

The pot color should complement but not compete with your tree:

- **Evergreens**: Earth tones, browns, and unglazed pots
- **Deciduous**: Can handle more colorful glazes
- **Flowering trees**: Consider pots that complement bloom colors

## Material Matters

Each material has its own character:

- **Unglazed clay**: Natural, traditional appearance
- **Glazed ceramic**: More colorful options, weather-resistant
- **Porcelain**: Elegant, refined look

Remember, the pot is the frame for your living artwork. Take time to find the perfect match!`,
      author: 'Brian',
      published: true,
    },
    {
      title: 'Winter Care for Your Bonsai Collection',
      slug: 'winter-care-bonsai-collection',
      content: `# Winter Care for Your Bonsai Collection

Winter can be challenging for bonsai enthusiasts, but with proper care, your trees will emerge stronger in spring.

## Protection Strategies

**Cold Climate Considerations:**
- Insulate pots with mulch or straw
- Use cold frames or unheated garages
- Water sparingly - roots can freeze

**Temperate Climate Care:**
- Reduce watering frequency
- Protect from strong winds
- Monitor for temperature fluctuations

## Watering Wisdom

Winter watering is crucial but often misunderstood:
- Check soil moisture weekly
- Water on warmer days when soil isn't frozen
- Morning watering allows excess to drain before night freeze

## Indoor vs Outdoor

Some species need winter protection:
- **Tropical species**: Must come indoors
- **Temperate species**: Usually benefit from winter dormancy
- **Young trees**: May need extra protection

## Signs of Trouble

Watch for:
- Desiccation (drying out)
- Frost damage on branches
- Heaving from freeze-thaw cycles

With patience and observation, your bonsai will weather the winter beautifully.`,
      author: 'Brian',
      published: true,
    },
    {
      title: 'The Philosophy of Slow Living Through Pottery',
      slug: 'philosophy-slow-living-pottery',
      content: `# The Philosophy of Slow Living Through Pottery

In our fast-paced world, the pottery wheel offers a sanctuary of slowness, patience, and mindfulness.

## Finding the Center

Like bonsai cultivation, pottery teaches us to slow down and be present. Each piece requires:

- **Patience**: Waiting for clay to reach the right consistency
- **Attention**: Feeling the subtle changes under your fingers
- **Acceptance**: Embracing the natural variations in each piece

## The Meditation of Making

When I'm at the wheel, time disappears. The rhythmic motion, the feel of clay transforming beneath my hands, the focus required - it's a moving meditation that grounds me in the present moment.

## Imperfection as Beauty

Japanese aesthetics teach us to find beauty in imperfection (wabi-sabi). Each handmade piece carries the marks of its creation - slight asymmetries, finger impressions, glaze variations that make it unique.

## Connecting with Nature

Working with clay connects us to the earth. The material itself comes from the ground, and the firing process transforms it through the ancient elements of earth, water, air, and fire.

## The Gift of Time

In a world of instant everything, pottery reminds us that some things can't be rushed. Good work takes time, patience, and presence. This is the gift that pottery gives us - the permission to slow down and create something meaningful.

Take time to create. The world needs more handmade beauty.`,
      author: 'Brian',
      published: true,
    }
  ]

  // Create blog posts
  for (const blogPost of blogPosts) {
    await prisma.blogPost.create({
      data: blogPost
    })
    console.log(`Created blog post: ${blogPost.title}`)
  }

  console.log('Blog seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
