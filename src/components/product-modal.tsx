'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X, ExternalLink } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

interface ProductModalProps {
  product: any
  isOpen: boolean
  onClose: () => void
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen || !product) return null

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div className="relative max-w-4xl max-h-[90vh] w-full bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 max-h-[90vh] overflow-y-auto">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              {product.images?.[selectedImageIndex] ? (
                <Image
                  src={product.images[selectedImageIndex].url}
                  alt={product.images[selectedImageIndex].alt || product.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-gray-500 dark:text-gray-400">No Image</span>
                </div>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image: any, index: number) => (
                  <button
                    key={image.id}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 ${
                      selectedImageIndex === index 
                        ? 'ring-2 ring-primary' 
                        : 'ring-1 ring-gray-300 dark:ring-gray-600'
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt || `Product image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {getCategoryDisplay(product.category)}
                </span>
                <span className={`text-sm font-medium ${
                  product.status === 'AVAILABLE' ? 'text-green-600 dark:text-green-400' :
                  product.status === 'SOLD' ? 'text-red-600 dark:text-red-400' :
                  'text-yellow-600 dark:text-yellow-400'
                }`}>
                  {product.status}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {product.title}
              </h2>
              {product.price && (
                <p className="text-2xl font-bold text-primary">
                  {formatPrice(product.price)}
            </p>
              )}
            </div>

            {/* Full Description */}
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                {product.description}
              </p>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              {product.material && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Material</h4>
                  <p className="text-gray-600 dark:text-gray-300">{product.material}</p>
                </div>
              )}
              
              {product.glaze && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Glaze/Finish</h4>
                  <p className="text-gray-600 dark:text-gray-300">{product.glaze}</p>
                </div>
              )}

              {product.year && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Year</h4>
                  <p className="text-gray-600 dark:text-gray-300">{product.year}</p>
                </div>
              )}

              {/* Dimensions */}
              {(product.lengthCm || product.widthCm || product.heightCm) && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Dimensions</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {product.lengthCm && `${product.lengthCm}cm × `}
                    {product.widthCm && `${product.widthCm}cm × `}
                    {product.heightCm && `${product.heightCm}cm`}
                  </p>
                </div>
              )}

              {product.weightG && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Weight</h4>
                  <p className="text-gray-600 dark:text-gray-300">{product.weightG}g</p>
                </div>
              )}
            </div>

            {/* External Link */}
            {product.externalUrl && (
              <a
                href={product.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-primary hover:text-primary/80"
              >
                <span>View on Facebook Marketplace</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            )}

            {/* Contact Button */}
            <div className="pt-4">
              <Link href="/contact">
                <Button className="w-full">
                  Contact Brian to Purchase
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getCategoryDisplay(category: string) {
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
