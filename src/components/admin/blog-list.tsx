'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, Calendar, User, Clock } from 'lucide-react'

export function BlogList() {
  const [blogPosts, setBlogPosts] = useState<any[]>([])

  useEffect(() => {
    // This would fetch blog posts from your API/database
    // For now, we'll use the mock data from the journal page
    const mockBlogPosts = [
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
        image: '/blog-bonsai-pot.jpg'
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
        image: '/blog-christmas-ornaments.jpg'
      }
    ]
    setBlogPosts(mockBlogPosts)
  }, [])

  const handleEdit = (id: string) => {
    // Navigate to edit page or open edit modal
    console.log('Edit blog post:', id)
  }

  const handleDelete = (id: string) => {
    // Delete blog post from database
    console.log('Delete blog post:', id)
  }

  return (
    <div className="space-y-4">
      {blogPosts.map((post) => (
        <Card key={post.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle className="text-lg">{post.title}</CardTitle>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
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
                <p className="text-sm text-gray-600 dark:text-gray-400">{post.excerpt}</p>
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
