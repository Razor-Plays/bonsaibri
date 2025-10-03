'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import { ProductModal } from './product-modal'

interface ProductImage {
  id: string
  url: string
  alt?: string | null
  order: number
}

interface Product {
  id: string
  title: string
  slug: string
  category: string
  description?: string | null
  price?: number | null
  status: string
  isFeatured: boolean
  images: ProductImage[]
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const mainImage = product.images.find((img: ProductImage) => img.order === 0) || product.images[0]
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SOLD':
        return <Badge variant="destructive">Sold</Badge>
      case 'CUSTOM':
        return <Badge variant="secondary">Custom</Badge>
      case 'AVAILABLE':
      default:
        return null
    }
  }

  const getCategoryDisplay = (category: string) => {
    switch (category) {
      case 'BONSAI_POTS':
        return 'Bonsai Pots'
      case 'CHRISTMAS_ORNAMENTS':
        return 'Christmas Ornaments'
      case 'SMOKING_ACCESSORIES':
        return 'Smoking Accessories'
      default:
        return category
    }
  }

  return (
    <>
      <Card 
        className="group hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full"
        onClick={() => setIsModalOpen(true)}
      >
        <CardHeader className="p-0">
          <div className="aspect-square relative overflow-hidden rounded-t-lg">
            {mainImage ? (
              <Image
                src={mainImage.url}
                alt={mainImage.alt || product.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">No Image</span>
              </div>
            )}
            {product.isFeatured && (
              <Badge className="absolute top-2 left-2">Featured</Badge>
            )}
            {getStatusBadge(product.status) && (
              <div className="absolute top-2 right-2">
                {getStatusBadge(product.status)}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {getCategoryDisplay(product.category)}
            </p>
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
              {product.title}
            </h3>
            {product.description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {product.description.replace(/[*#]/g, '').substring(0, 100)}...
              </p>
            )}
            {product.price && (
              <p className="text-lg font-bold text-primary">
                {formatPrice(product.price)}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <ProductModal 
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
