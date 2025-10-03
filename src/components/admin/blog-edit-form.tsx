'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Upload, Save, X } from 'lucide-react'

interface BlogEditFormProps {
  post: any
  onSave: (updatedPost: any) => void
  onCancel: () => void
}

export function BlogEditForm({ post, onSave, onCancel }: BlogEditFormProps) {
  const [formData, setFormData] = useState({
    title: post.title || '',
    slug: post.slug || '',
    content: post.content || '',
    author: post.author || 'Brian',
    category: post.category || 'Bonsai Care',
    tags: post.tags || '',
    readTime: post.readTime || '3 min read',
    excerpt: post.excerpt || '',
    published: post.published || true,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      // Create FormData for API submission
      const formDataToSubmit = new FormData()
      formDataToSubmit.append('title', formData.title)
      formDataToSubmit.append('slug', formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''))
      formDataToSubmit.append('content', formData.content)
      formDataToSubmit.append('author', formData.author)
      formDataToSubmit.append('category', formData.category)
      formDataToSubmit.append('tags', formData.tags)
      formDataToSubmit.append('readTime', formData.readTime)
      formDataToSubmit.append('excerpt', formData.excerpt)
      formDataToSubmit.append('published', formData.published.toString())

      // Make API call to update blog post
      const response = await fetch(`/api/blog/${post.id}`, {
        method: 'PUT',
        body: formDataToSubmit,
      })

      if (!response.ok) {
        throw new Error('Failed to update blog post')
      }

      const updatedPost = await response.json()
      setSuccess('Blog post updated successfully!')
      
      // Call the onSave callback with updated post
      onSave(updatedPost)
      
    } catch (error) {
      console.error('Error updating blog post:', error)
      setError('Failed to update blog post. Please try again.')
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

      <div className="flex justify-between items-center">
        <CardTitle>Edit Blog Post</CardTitle>
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
          <X className="h-4 w-4" />
          Cancel
        </Button>
      </div>

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
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="Brian"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value: string) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bonsai Care">Bonsai Care</SelectItem>
                <SelectItem value="Techniques">Techniques</SelectItem>
                <SelectItem value="Philosophy">Philosophy</SelectItem>
                <SelectItem value="Lifestyle">Lifestyle</SelectItem>
              </SelectContent>
            </Select>
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
                <SelectItem value="10 min read">10 min read</SelectItem>
              </SelectContent>
            </Select>
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
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              placeholder="Brief description of the blog post..."
              rows={3}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
            />
            <Label htmlFor="published">Published</Label>
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
            <Save className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </>
        )}
      </Button>
    </form>
  )
}
