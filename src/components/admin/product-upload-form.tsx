'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Upload, Plus } from 'lucide-react'

export function ProductUploadForm({ onSuccess }: { onSuccess?: () => void }) {
    const [formData, setFormData] = useState({
          title: '',
          category: 'BONSAI_POTS',
          description: '',
          price: '',
          status: 'AVAILABLE',
          isFeatured: false,
          material: '',
          glaze: '',
          color: '',
    })

  const [images, setImages] = useState<File[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
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
                if (!formData.title || !formData.category) {
                          throw new Error('Title and category are required')
                }

          const submitData = new FormData()
                Object.entries(formData).forEach(([key, value]) => {
                          submitData.append(key, value.toString())
                })
                images.forEach(image => {
                          submitData.append('images', image)
                })

          const response = await fetch('/api/products', {
                    method: 'POST',
                    body: submitData,
          })

          if (!response.ok) {
                    const err = await response.json()
                    throw new Error(err.error || 'Failed to create product')
          }

          setSuccess('Product added successfully!')
                setFormData({
                          title: '',
                          category: 'BONSAI_POTS',
                          description: '',
                          price: '',
                          status: 'AVAILABLE',
                          isFeatured: false,
                          material: '',
                          glaze: '',
                          color: '',
                })
                setImages([])
                onSuccess?.()
        } catch (err: any) {
                setError(err.message || 'Something went wrong. Please try again.')
        } finally {
                setIsLoading(false)
        }
  }

  return (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
                  <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>AlertDescription>
                  </Alert>Alert>
              )}
          {success && (
                  <Alert className="border-green-500 bg-green-50 text-green-800">
                            <AlertDescription>{success}</AlertDescription>AlertDescription>
                  </Alert>Alert>
              )}
        
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                                <Label htmlFor="title">Product Title *</Label>Label>
                                <Input id="title" name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g. Handcrafted Round Bonsai Pot" required />
                      </div>div>
              
                      <div>
                                <Label>Category *</Label>Label>
                                <Select value={formData.category} onValueChange={v => setFormData(p => ({ ...p, category: v }))}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>SelectTrigger>
                                            <SelectContent>
                                                          <SelectItem value="BONSAI_POTS">Bonsai Pots</SelectItem>SelectItem>
                                                          <SelectItem value="CHRISTMAS_ORNAMENTS">Christmas Ornaments</SelectItem>SelectItem>
                                                          <SelectItem value="SMOKING_ACCESSORIES">Smoking Accessories</SelectItem>SelectItem>
                                            </SelectContent>SelectContent>
                                </Select>Select>
                      </div>div>
              
                      <div>
                                <Label>Status</Label>Label>
                                <Select value={formData.status} onValueChange={v => setFormData(p => ({ ...p, status: v }))}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>SelectTrigger>
                                            <SelectContent>
                                                          <SelectItem value="AVAILABLE">Available</SelectItem>SelectItem>
                                                          <SelectItem value="SOLD">Sold</SelectItem>SelectItem>
                                                          <SelectItem value="CUSTOM">Custom Order</SelectItem>SelectItem>
                                            </SelectContent>SelectContent>
                                </Select>Select>
                      </div>div>
              
                      <div>
                                <Label htmlFor="price">Price (in cents, e.g. 4500 = $45)</Label>Label>
                                <Input id="price" name="price" type="number" value={formData.price} onChange={handleInputChange} placeholder="4500" />
                      </div>div>
              
                      <div>
                                <Label htmlFor="material">Clay / Material</Label>Label>
                                <Input id="material" name="material" value={formData.material} onChange={handleInputChange} placeholder="e.g. Stoneware clay" />
                      </div>div>
              
                      <div>
                                <Label htmlFor="glaze">Glaze / Finish</Label>Label>
                                <Input id="glaze" name="glaze" value={formData.glaze} onChange={handleInputChange} placeholder="e.g. Celadon glaze" />
                      </div>div>
              
                      <div>
                                <Label htmlFor="color">Color</Label>Label>
                                <Input id="color" name="color" value={formData.color} onChange={handleInputChange} placeholder="e.g. Earthy brown" />
                      </div>div>
              
                      <div className="md:col-span-2">
                                <Label htmlFor="description">Description</Label>Label>
                                <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} placeholder="Describe this piece..." rows={4} />
                      </div>div>
              
                      <div className="md:col-span-2">
                                <Label htmlFor="images">Product Photos</Label>Label>
                                <Input id="images" type="file" accept="image/*" multiple onChange={handleImageUpload} className="cursor-pointer" />
                        {images.length > 0 && (
                      <p className="text-sm text-gray-600 mt-1">{images.length} photo(s) selected</p>p>
                                )}
                      </div>div>
              
                      <div className="md:col-span-2 flex items-center space-x-2">
                                <input type="checkbox" id="isFeatured" checked={formData.isFeatured} onChange={e => setFormData(p => ({ ...p, isFeatured: e.target.checked }))} className="h-4 w-4" />
                                <Label htmlFor="isFeatured">Feature this product on the home page</Label>Label>
                      </div>div>
              </div>div>
        
              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? (
                    <><Upload className="mr-2 h-4 w-4 animate-spin" />Uploading product & photos...</>>
                  ) : (
                    <><Plus className="mr-2 h-4 w-4" />Add Product</>>
                  )}
              </Button>Button>
        </form>form>
      )
}</></></form>
