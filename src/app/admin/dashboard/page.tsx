'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ProductUploadForm } from '@/components/admin/product-upload-form'
import { BlogUploadForm } from '@/components/admin/blog-upload-form'
import { ProductList } from '@/components/admin/product-list'
import { BlogList } from '@/components/admin/blog-list'

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const authenticated = localStorage.getItem('adminAuthenticated')
    if (!authenticated) {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated')
    router.push('/admin/login')
  }

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">Loading...</div>
  }

  if (!isAuthenticated) {
    return null // This will trigger the redirect
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">Welcome, Brian</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Content Management</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Easily upload new products and blog posts to keep your website fresh and engaging.
          </p>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            {/* Product Upload Form */}
            <Card>
              <CardHeader>
                <CardTitle>Add New Product</CardTitle>
                <CardDescription>
                  Upload a new handcrafted pottery piece with photos and details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProductUploadForm />
              </CardContent>
            </Card>

            {/* Existing Products List */}
            <Card>
              <CardHeader>
                <CardTitle>Your Products</CardTitle>
                <CardDescription>
                  Manage and edit your existing products
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProductList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blog" className="space-y-6">
            {/* Blog Upload Form */}
            <Card>
              <CardHeader>
                <CardTitle>Add New Blog Post</CardTitle>
                <CardDescription>
                  Share your thoughts on pottery, bonsai, and the creative process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BlogUploadForm />
              </CardContent>
            </Card>

            {/* Existing Blog Posts List */}
            <Card>
              <CardHeader>
                <CardTitle>Your Blog Posts</CardTitle>
                <CardDescription>
                  Manage and edit your existing blog posts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BlogList />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
