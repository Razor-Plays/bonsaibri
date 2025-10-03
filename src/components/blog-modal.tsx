'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Calendar, User, Tag, Clock } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

interface BlogPostModalProps {
  post: any
  isOpen: boolean
  onClose: () => void
}

export function BlogPostModal({ post, isOpen, onClose }: BlogPostModalProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setIsMounted(true)
    } else {
      document.body.style.overflow = 'unset'
      setIsMounted(false)
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen || !post) return null

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

        <div className="flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Tag className="h-4 w-4" />
                <span>{post.category}</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {post.title}
            </h1>
          </div>

          {/* Content Area with Scroll */}
          <div className="flex-1 overflow-y-auto p-6 max-h-[60vh]">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {/* Hero Image */}
              {post.image && (
                <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Blog Content */}
              <div className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                {post.content}
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="h-4 w-4 text-gray-400" />
                    {post.tags.map((tag: string) => (
                      <span key={tag} className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">{post.category}</span>
              </div>
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
