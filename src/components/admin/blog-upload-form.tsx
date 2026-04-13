'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Upload, Plus } from 'lucide-react'

export function BlogUploadForm() {
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

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
      const formDataToSend = new FormData()
      formDataToSend.append('title', title)
      formDataToSend.append('content', content)
      formDataToSend.append('excerpt', excerpt)
      formDataToSend.append('author', 'Brian')
      formDataToSend.append('published', 'true')
      if (image) {
        formDataToSend.append('image', image)
      }

      const response = await fetch('/api/blog', {
        method: 'POST',
        body: formDataToSend,
      })

      if (!response.ok) {
        throw new Error('Failed to create blog post')
      }

      await response.json()
      setSuccess('Blog post created successfully!')

      // Reset form
      setTitle('')
      setExcerpt('')
      setContent('')
      setImage(null)

    } catch (err) {
      console.error('Error creating blog post:', err)
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

      <div>
        <Label htmlFor="title">Blog Title</Label>
        <Input
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="The Art of Choosing the Perfect Bonsai Pot"
          required
        />
      </div>

      <div>
        <Label htmlFor="excerpt">Excerpt (optional — auto-generated from content if blank)</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="A short summary shown on the blog cards..."
          rows={3}
        />
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

      <div>
        <Label htmlFor="content">Blog Content</Label>
        <Textarea
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
