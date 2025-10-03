'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Edit, Trash2 } from 'lucide-react'
import { ProductEditForm } from './product-edit-form'

export function ProductList() {
  const [products, setProducts] = useState<any[]>([])
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('Fetching products from API...')
      
      // Try to fetch from real database first
      const response = await fetch('/api/products')
      console.log('API response status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Products fetched successfully:', data.length, 'products')
        setProducts(data)
      } else {
        console.log('API failed with status:', response.status)
        // If API fails, use mock data
        console.log('Using mock data as fallback')
        const { mockProducts } = await import('@/lib/mock-data')
        setProducts(mockProducts)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      // Use mock data as fallback
      console.log('Using mock data due to error:', error)
      const { mockProducts } = await import('@/lib/mock-data')
      setProducts(mockProducts)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (product: any) => {
    setEditingProduct(product)
  }

  const handleSaveEdit = async (updatedProduct: any) => {
    try {
      console.log('Saving product:', updatedProduct)
      
      // Save to real database via API
      const response = await fetch(`/api/products/${updatedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('API error response:', errorText)
        throw new Error(`Failed to update product: ${response.status} ${errorText}`)
      }

      const savedProduct = await response.json()
      console.log('Product saved successfully:', savedProduct)
      
      // Update local state with saved product
      setProducts(prev => prev.map(p => p.id === savedProduct.id ? savedProduct : p))
      setEditingProduct(null)
      
      // Show success message
      alert('Product updated successfully!')
      
      // Refresh products to ensure data consistency
      await fetchProducts()
    } catch (error) {
      console.error('Error updating product:', error)
      alert(`Failed to update product: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleCancelEdit = () => {
    setEditingProduct(null)
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete product')
      }

      // Remove from local state
      setProducts(prev => prev.filter(p => p.id !== id))
      alert('Product deleted successfully!')
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Failed to delete product. Please try again.')
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading products...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error: {error}</div>
  }

  return (
    <div className="space-y-4">
      {editingProduct && (
        <Card className="border-2 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <ProductEditForm 
              product={editingProduct}
              onSave={handleSaveEdit}
              onCancel={handleCancelEdit}
            />
          </CardContent>
        </Card>
      )}
      
      {products.map((product) => (
        <Card key={product.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{product.title}</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {product.category} • ${(product.price / 100).toFixed(2)} • {product.status}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(product)}
                  className="h-8 w-8"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(product.id)}
                  className="h-8 w-8 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center space-x-4">
              {product.images && product.images.length > 0 ? (
                <div className="relative w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                  <Image
                    src={product.images[0].url}
                    alt={product.images[0].alt || product.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">No Image</span>
                </div>
              )}
              <div className="flex-1">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {product.category} • ${(product.price / 100).toFixed(2)} • {product.status}
                </p>
                {product.isFeatured && (
                  <Badge className="text-xs mt-1">Featured</Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
