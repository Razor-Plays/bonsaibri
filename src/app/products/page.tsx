import { ProductCard } from '@/components/product-card'
import { ProductModal } from '@/components/product-modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Filter } from 'lucide-react'
import { prisma } from '@/lib/db'

// Get products from database
async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      where: {
        status: 'AVAILABLE'
      },
      include: {
        images: {
          orderBy: { order: 'asc' },
          take: 1
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    return products
  } catch (error) {
    console.error('Error fetching products:', error)
    // If database is empty, return mock data for now
    const { mockProducts } = await import('@/lib/mock-data')
    return mockProducts
  }
}

const categories = [
  { value: 'ALL', label: 'All Products' },
  { value: 'BONSAI_POTS', label: 'Bonsai Pots' },
  { value: 'CHRISTMAS_ORNAMENTS', label: 'Christmas Ornaments' },
  { value: 'SMOKING_ACCESSORIES', label: 'Smoking Accessories' }
]

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A to Z' }
]

export default async function ProductsPage() {
  // Fetch real data from database
  const products = await getProducts()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Brian's Creations
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Handcrafted pottery by Brian for bonsai enthusiasts, holiday celebrations, and the slow life.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 dark:text-gray-300">
                No products found.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
