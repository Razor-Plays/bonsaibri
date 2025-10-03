'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, Calendar, User, Clock } from 'lucide-react'
import { BlogEditForm } from './blog-edit-form'

export function BlogList() {
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingPost, setEditingPost] = useState<any>(null)

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const res = await fetch('/api/blog')
      if (!res.ok) throw new Error('Failed to fetch blog posts')
      
      const data = await res.json()
      console.log('Fetched blog posts:', data)
      setBlogPosts(data)
    } catch (error) {
      console.error('Error fetching blog posts:', error)
      setError('Failed to fetch blog posts')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (post: any) => {
    setEditingPost(post)
  }

  const handleSaveEdit = async (updatedPost: any) => {
    setBlogPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p))
    setEditingPost(null)
  }

  const handleCancelEdit = () => {
    setEditingPost(null)
  }

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this blog post?')
    if (!confirmed) return

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete blog post')
      }

      setBlogPosts(prev => prev.filter(p => p.id !== id))
      alert('Blog post deleted successfully!')
    } catch (error) {
      console.error('Error deleting blog post:', error)
      alert('Failed to delete blog post. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-300">Loading blog posts...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 dark:text-red-400">{error}</p>
        <Button onClick={fetchBlogPosts} className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  if (blogPosts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-300">No blog posts found.</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Create your first blog post to get started.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {editingPost && (
        <Card className="border-2 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <BlogEditForm 
              post={editingPost}
              onSave={handleSaveEdit}
              onCancel={handleCancelEdit}
            />
          </CardContent>
        </Card>
      )}
      
      {blogPosts.map((post) => (
        <Card key={post.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle className="text-lg">{post.title}</CardTitle>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{post.excerpt}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {post.category}
                  </span>
              {post.tags && typeof post.tags === 'string' && post.tags.split(', ').map((tag: string) => (
                <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(post.id)}
                  className="h-8 w-8"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(post.id)}
                  className="h-8 w-8 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center space-x-4">
              {post.image && (
                <div className="relative w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover rounded-lg w-full h-full"
                  />
                </div>
              )}
              {!post.image && (
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">No Image</span>
                </div>
              )}
              <div className="flex-1">
                <p className="text-sm text-gray-600 dark:text-gray-400">{post.excerpt || post.content.substring(0, 100) + '...'}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {post.category}
                  </span>
                  {post.tags && typeof post.tags === 'string' && post.tags.split(', ').map((tag: string) => (
                    <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
