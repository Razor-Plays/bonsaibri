// Mock data for development - will be replaced with real database data later
export const mockProducts = [
  {
    id: '1',
    title: 'Handcrafted Bonsai Pot - Round',
    slug: 'handcrafted-bonsai-pot-round',
    category: 'BONSAI_POTS',
    description: 'A beautifully handcrafted round bonsai pot, perfect for showcasing your miniature trees.',
    price: 4500,
    status: 'AVAILABLE',
    isFeatured: true,
    images: [
      { id: '1', url: 'bonsai-pot-1.jpg', alt: 'Handcrafted round bonsai pot', order: 0 }
    ],
    lengthCm: 15,
    widthCm: 10,
    heightCm: 5,
    weightG: 500,
    material: 'Stoneware clay',
    glaze: 'Celadon glaze',
    color: 'Green',
    year: 2024,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    title: 'Rectangular Bonsai Pot - Glazed',
    slug: 'rectangular-bonsai-pot-glazed',
    category: 'BONSAI_POTS',
    description: 'Elegant rectangular bonsai pot with a beautiful celadon glaze.',
    price: 5200,
    status: 'AVAILABLE',
    isFeatured: true,
    images: [
      { id: '2', url: 'bonsai-pot-2.jpg', alt: 'Rectangular bonsai pot with celadon glaze', order: 0 }
    ],
    lengthCm: 20,
    widthCm: 15,
    heightCm: 8,
    weightG: 750,
    material: 'Stoneware clay',
    glaze: 'Celadon glaze',
    color: 'Blue-green',
    year: 2024,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02')
  },
  {
    id: '3',
    title: 'Ceramic Christmas Ornament - Snowflake',
    slug: 'ceramic-christmas-ornament-snowflake',
    category: 'CHRISTMAS_ORNAMENTS',
    description: 'Hand-painted ceramic Christmas ornament featuring a delicate snowflake design.',
    price: 1500,
    status: 'AVAILABLE',
    isFeatured: true,
    images: [
      { id: '3', url: 'ornament-1.jpg', alt: 'Ceramic snowflake ornament', order: 0 }
    ],
    lengthCm: 8,
    widthCm: 8,
    heightCm: 1,
    weightG: 50,
    material: 'Earthenware',
    glaze: 'White glaze',
    color: 'White',
    year: 2024,
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03')
  },
  {
    id: '4',
    title: 'Christmas Tree Ornament - Handcrafted',
    slug: 'christmas-tree-ornament-handcrafted',
    category: 'CHRISTMAS_ORNAMENTS',
    description: 'Charming handcrafted Christmas tree ornament with a rustic finish.',
    price: 1200,
    status: 'AVAILABLE',
    isFeatured: false,
    images: [
      { id: '4', url: 'ornament-2.jpg', alt: 'Handcrafted Christmas tree ornament', order: 0 }
    ],
    lengthCm: 6,
    widthCm: 6,
    heightCm: 1,
    weightG: 40,
    material: 'Earthenware',
    glaze: 'Clear glaze',
    color: 'Natural',
    year: 2024,
    createdAt: new Date('2024-01-04'),
    updatedAt: new Date('2024-01-04')
  },
  {
    id: '5',
    title: 'Ceramic Smoking Pipe - Artisan',
    slug: 'ceramic-smoking-pipe-artisan',
    category: 'SMOKING_ACCESSORIES',
    description: 'Handcrafted ceramic smoking pipe with a unique glaze pattern.',
    price: 3500,
    status: 'AVAILABLE',
    isFeatured: true,
    images: [
      { id: '5', url: 'pipe-1.jpg', alt: 'Artisan ceramic smoking pipe', order: 0 }
    ],
    lengthCm: 12,
    widthCm: 3,
    heightCm: 3,
    weightG: 150,
    material: 'Stoneware clay',
    glaze: 'Artisan glaze',
    color: 'Brown',
    year: 2024,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05')
  },
  {
    id: '6',
    title: 'Ceramic Ashtray - Leaf Design',
    slug: 'ceramic-ashtray-leaf-design',
    category: 'SMOKING_ACCESSORIES',
    description: 'Decorative ceramic ashtray featuring a leaf design.',
    price: 2500,
    status: 'AVAILABLE',
    isFeatured: false,
    images: [
      { id: '6', url: 'ashtray-1.jpg', alt: 'Ceramic leaf design ashtray', order: 0 }
    ],
    lengthCm: 15,
    widthCm: 10,
    heightCm: 3,
    weightG: 200,
    material: 'Stoneware clay',
    glaze: 'Natural glaze',
    color: 'Green',
    year: 2024,
    createdAt: new Date('2024-01-06'),
    updatedAt: new Date('2024-01-06')
  }
]

export const mockBlogPosts = [
  {
    id: '1',
    title: 'The Art of Choosing the Perfect Bonsai Pot',
    slug: 'choosing-perfect-bonsai-pot',
    excerpt: 'Learn how to select the ideal pot for your bonsai tree...',
    author: 'Brian',
    date: '2024-01-15',
    category: 'Bonsai Care',
    tags: ['bonsai', 'pots', 'styling'],
    readTime: '3 min read',
    image: 'blog-bonsai-pot.jpg',
    content: 'Full blog post content here...',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Creating Handmade Christmas Ornaments: A Potter\'s Guide',
    slug: 'handmade-christmas-ornaments-guide',
    excerpt: 'Discover the process behind creating beautiful ceramic Christmas ornaments...',
    author: 'Brian',
    date: '2024-01-08',
    category: 'Techniques',
    tags: ['christmas', 'ornaments', 'handmade'],
    readTime: '3 min read',
    image: 'blog-christmas-ornaments.jpg',
    content: 'Full blog post content here...',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08')
  },
  {
    id: '3',
    title: 'Embracing Slow Living Through Pottery',
    slug: 'slow-living-through-pottery',
    excerpt: 'How the art of pottery teaches us to slow down and appreciate the moment...',
    author: 'Brian',
    date: '2024-01-01',
    category: 'Lifestyle',
    tags: ['slow living', 'mindfulness', 'craft'],
    readTime: '3 min read',
    image: 'blog-slow-living.jpg',
    content: 'Full blog post content here...',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
]
