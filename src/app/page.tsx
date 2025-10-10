import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/product-card'
import { ArrowRight, Sparkles, Gift, Leaf } from 'lucide-react'
import { prisma } from '@/lib/db'

// Get featured products from database
async function getFeaturedProducts() {
  try {
    const products = await prisma.product.findMany({
      where: {
        isFeatured: true,
        status: 'AVAILABLE'
      },
      include: {
        images: {
          orderBy: { order: 'asc' },
          take: 1
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 3
    })
    return products
  } catch (error) {
    console.error('Error fetching featured products:', error)
    // Return empty array instead of mock data - we want real data only
    return []
  }
}

// Get categories
const categories = [
  {
    name: 'Bonsai Pots',
    description: 'Handcrafted pots for your miniature trees',
    icon: Leaf,
    href: '/products?category=BONSAI_POTS',
    image: '/category-bonsai.jpg'
  },
  {
    name: 'Christmas Ornaments',
    description: 'Festive decorations for the holidays',
    icon: Gift,
    href: '/products?category=CHRISTMAS_ORNAMENTS',
    image: '/category-christmas.jpg'
  },
  {
    name: 'Smoking Accessories',
    description: 'Artisan pipes, bongs, and ashtrays',
    icon: Sparkles,
    href: '/products?category=SMOKING_ACCESSORIES',
    image: '/category-smoking.jpg'
  }
]

export default async function HomePage() {
  // Fetch real data from database
  const featuredProducts = await getFeaturedProducts()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
          <div className="absolute inset-0">
            <Image
              src="banner.jpg"
              alt="Bonsai Bri Lifestyle Banner"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40 dark:bg-black/50" />
          </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <div className="relative w-128 h-64 mx-auto mb-6">
                <Image
                  src="banner-logo.png"
                  alt="Bonsai Bri Banner Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <p className="text-xl md:text-2xl text-white dark:text-gray-100 max-w-3xl mx-auto">
                Hand-made pottery for bonsai, holidays & the slow life.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="text-lg">
                  View Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="text-lg">
                  Contact
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Bri Creates
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Each piece is carefully handcrafted with attention to detail and quality, 
              using traditional pottery techniques passed down through generations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => {
              return (
                <Link
                  key={category.name}
                  href={category.href}
                  className="group relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative h-64">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {category.name}
                      </h3>
                      <p className="text-white/90">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A selection of our most popular and unique pieces, each telling its own story.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/products">
              <Button size="lg" variant="outline">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                About Brian
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Based in Northern Ontario, Brian creates beautiful handcrafted pottery inspired by 
                nature, Japanese aesthetics, and the slow living movement. Each piece is made with 
                care and attention to detail.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                From bonsai pots that complement miniature trees to festive holiday ornaments and 
                functional smoking accessories, every item tells a story of craftsmanship and passion.
              </p>
              <Link href="/about">
                <Button size="lg">
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src="bri-intro.jpg"
                  alt="Brian Introduction"
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
