'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Upload, Plus } from 'lucide-react'

export function BlogUploadForm() {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Techniques' as 'Techniques' | 'Bonsai Care' | 'Philosophy',
    excerpt: '',
    content: '',
    tags: '',
    readTime: '3 min read',
  })

  const [image, setImage] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      // Create FormData for API submission
      const formDataToSend = new FormData()
      
      // Add form data
      formDataToSend.append('title', formData.title)
      formDataToSend.append('slug', formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''))
      formDataToSend.append('content', formData.content)
      formDataToSend.append('author', 'Brian')
      formDataToSend.append('published', 'true')

      // Make API call to create blog post
      const response = await fetch('/api/blog', {
        method: 'POST',
        body: formDataToSend,
      })

      if (!response.ok) {
        throw new Error('Failed to create blog post')
      }

      const createdPost = await response.json()
      setSuccess('Blog post created successfully!')
      
      // Reset form
      setFormData({
        title: '',
        slug: '',
        category: 'Techniques',
        excerpt: '',
        content: '',
        tags: '',
        readTime: '3 min read',
      })
      setImage(null)
      
    } catch (error) {
      console.error('Error creating blog post:', error)
      setError('Failed to create blog post. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Blog Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="The Art of Choosing the Perfect Bonsai Pot"
              required
            />
          </div>

          <div>
            <Label htmlFor="slug">URL Slug</Label>
            <Input
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              placeholder="choosing-perfect-bonsai-pot"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value: string) => setFormData(prev => ({ ...prev, category: value as typeof formData.category }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Techniques">Techniques</SelectItem>
                <SelectItem value="Bonsai Care">Bonsai Care</SelectItem>
                <SelectItem value="Philosophy">Philosophy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              placeholder="Learn how to select the ideal pot for your bonsai tree..."
              rows={3}
              required
            />
          </div>
        </div>

        {/* Blog Details */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="bonsai, pots, styling"
            />
          </div>

          <div>
            <Label htmlFor="readTime">Estimated Read Time</Label>
            <Select value={formData.readTime} onValueChange={(value: string) => setFormData(prev => ({ ...prev, readTime: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select read time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2 min read">2 min read</SelectItem>
                <SelectItem value="3 min read">3 min read</SelectItem>
                <SelectItem value="5 min read">5 min read</SelectItem>
                <SelectItem value="7 min read">7 min read</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="image">Blog Post Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="cursor-pointer"
            />
            {image && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {image.name} selected
              </p>
            )}
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="content">Blog Content</Label>
        <Textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          placeholder="Write your blog post content here..."
          rows={12}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Upload className="mr-2 h-4 w-4 animate-spin" />
            Publishing...
          </>
        ) : (
          <>
            <Plus className="mr-2 h-4 w-4" />
            Publish Blog Post
          </>
        )}
      </Button>
    </form>
  )
}
