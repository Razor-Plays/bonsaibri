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

export function ProductUploadForm() {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'BONSAI_POTS' as 'BONSAI_POTS' | 'CHRISTMAS_ORNAMENTS' | 'SMOKING_ACCESSORIES',
    description: '',
    price: '',
    status: 'AVAILABLE' as 'AVAILABLE' | 'SOLD' | 'CUSTOM',
    isFeatured: false,
    lengthCm: '',
    widthCm: '',
    heightCm: '',
    weightG: '',
    material: '',
    glaze: '',
    color: '',
    year: new Date().getFullYear().toString(),
  })

  const [images, setImages] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value ? parseFloat(value) : '') : value
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setImages(Array.from(files))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData()
      
      // Add images
      images.forEach((image, index) => {
        formDataToSend.append(`images`, image)
      })

      // Add form data
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value.toString())
      })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // In a real app, you would upload to your API here
      // For now, we'll simulate success
      setSuccess('Product uploaded successfully!')
      
      // Reset form
      setFormData({
        title: '',
        slug: '',
        category: 'BONSAI_POTS',
        description: '',
        price: '',
        status: 'AVAILABLE',
        isFeatured: false,
        lengthCm: '',
        widthCm: '',
        heightCm: '',
        weightG: '',
        material: '',
        glaze: '',
        color: '',
        year: new Date().getFullYear().toString(),
      })
      setImages([])
      
    } catch (error) {
      setError('Failed to upload product. Please try again.')
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
            <Label htmlFor="title">Product Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Handcrafted Bonsai Pot"
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
              placeholder="handcrafted-bonsai-pot"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as typeof formData.category }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BONSAI_POTS">Bonsai Pots</SelectItem>
                <SelectItem value="CHRISTMAS_ORNAMENTS">Christmas Ornaments</SelectItem>
                <SelectItem value="SMOKING_ACCESSORIES">Smoking Accessories</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="price">Price (in cents)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="3500"
              required
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as typeof formData.status }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AVAILABLE">Available</SelectItem>
                <SelectItem value="SOLD">Sold</SelectItem>
                <SelectItem value="CUSTOM">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Dimensions & Details */}
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label htmlFor="lengthCm">Length (cm)</Label>
              <Input
                id="lengthCm"
                name="lengthCm"
                type="number"
                step="0.1"
                value={formData.lengthCm}
                onChange={handleInputChange}
                placeholder="15"
              />
            </div>
            <div>
              <Label htmlFor="widthCm">Width (cm)</Label>
              <Input
                id="widthCm"
                name="widthCm"
                type="number"
                step="0.1"
                value={formData.widthCm}
                onChange={handleInputChange}
                placeholder="10"
              />
            </div>
            <div>
              <Label htmlFor="heightCm">Height (cm)</Label>
              <Input
                id="heightCm"
                name="heightCm"
                type="number"
                step="0.1"
                value={formData.heightCm}
                onChange={handleInputChange}
                placeholder="5"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="weightG">Weight (grams)</Label>
            <Input
              id="weightG"
              name="weightG"
              type="number"
              value={formData.weightG}
              onChange={handleInputChange}
              placeholder="500"
            />
          </div>

          <div>
            <Label htmlFor="material">Material</Label>
            <Input
              id="material"
              name="material"
              value={formData.material}
              onChange={handleInputChange}
              placeholder="Stoneware clay"
            />
          </div>

          <div>
            <Label htmlFor="glaze">Glaze/Finish</Label>
            <Input
              id="glaze"
              name="glaze"
              value={formData.glaze}
              onChange={handleInputChange}
              placeholder="Celadon glaze"
            />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="A beautifully handcrafted bonsai pot..."
          rows={4}
          required
        />
      </div>

      <div>
        <Label htmlFor="images">Product Images</Label>
        <Input
          id="images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="cursor-pointer"
        />
        {images.length > 0 && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {images.length} image(s) selected
          </p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isFeatured"
          checked={formData.isFeatured}
          onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
        />
        <Label htmlFor="isFeatured">Featured Product</Label>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Upload className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </>
        )}
      </Button>
    </form>
  )
}
