'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Calendar, User, Tag, Clock } from 'lucide-react'
import { BlogPostModal } from '@/components/blog-modal'

// Sample blog post data
const blogPosts = [
  {
    id: '1',
    title: 'The Art of Choosing the Perfect Bonsai Pot',
    slug: 'choosing-perfect-bonsai-pot',
    excerpt: 'Learn how to select the ideal pot for your bonsai tree, balancing the needs of your tree with your personal style and aesthetic preferences.',
    content: `After years of working with bonsai, I've learned that choosing the right pot is both an art and a science. The pot must serve your tree's needs first and foremost - providing proper drainage, a stable base, and adequate space for root development. But beyond these essentials, there's a beautiful opportunity to express your personal style and create something that speaks to you.

## Tree Needs Come First

When I'm helping someone choose a pot, I always start with the practical requirements. Your tree needs proper drainage holes - I've seen too many beautiful bonsai suffer from root rot because of inadequate drainage. The base must be stable, especially for cascade styles that carry more weight. The depth should accommodate your root system while allowing for future growth.

## Finding Your Style

Once the practical needs are met, this is where the magic happens. I encourage people to trust their instincts and choose what genuinely appeals to them. Some folks love the earthy simplicity of unglazed clay, while others are drawn to the subtle elegance of a celadon glaze. There's no wrong answer - if it makes you happy every time you look at it, that's the right choice.

## My Personal Approach

I tend to favor pots that let the tree be the star. My favorite piece is actually a simple, unglazed rectangular pot that I made early in my career. It's not flashy, but it perfectly complements a pine I've been training for years. Sometimes the most beautiful pairing is the most understated one.

Remember: the pot is the frame, the tree is the picture, but you're the artist making the final decision. Choose what brings you joy!`,
    author: 'Brian',
    date: '2024-01-15',
    category: 'Bonsai Care',
    tags: ['bonsai', 'pots', 'styling'],
    image: '/blog-bonsai-pot.jpg',
    readTime: '3 min read'
  },
  {
    id: '2',
    title: 'Creating Handmade Christmas Ornaments: A Potter\'s Guide',
    slug: 'handmade-christmas-ornaments-guide',
    excerpt: 'Discover the joy of creating ceramic Christmas ornaments that become treasured family heirlooms, carrying love and tradition through generations.',
    content: `There's something magical about unpacking handmade ornaments each December. Each piece carries memories of Christmases past - the year Grandma helped paint the angels, the snowflake we made when the kids were little, the special ornament commemorating a new family member. These aren't just decorations; they're vessels of love and tradition.

## The Joy of Handmade Traditions

I started making Christmas ornaments when my children were young. What began as a fun December activity has become one of my favorite traditions. Each year, we create new pieces together, and now my grandchildren are getting involved too. There's something special about knowing these little pieces of art will be part of family celebrations long after I'm gone.

## Working with a Medium I Love

Ceramics is perfect for ornaments because it captures detail beautifully and lasts forever. I use a fine white clay body that takes glazes wonderfully, allowing for both subtle earth tones and vibrant holiday colors. The weight is perfect - substantial enough to feel quality, but light enough for any tree branch.

## Creating Family Heirlooms

When designing ornaments, I think about the families who will treasure them. Each piece should feel timeless - something that won't look dated in twenty years. I often incorporate elements that can be personalized: space for names, dates, or special messages. One of my favorite commissions was a set of ornaments for a couple's first Christmas together, with their wedding date subtly incorporated into the design.

The best ornaments tell a story. Maybe it's the year you got married, welcomed a new baby, or weathered a difficult time together. These small pieces of ceramic carry big meaning, and that's what makes them so special.`,
    author: 'Brian',
    date: '2024-01-08',
    category: 'Techniques',
    tags: ['christmas', 'ornaments', 'handmade'],
    image: '/blog-christmas-ornaments.jpg',
    readTime: '3 min read'
  },
  {
    id: '3',
    title: 'The Philosophy of Slow Living Through Pottery',
    slug: 'slow-living-through-pottery',
    excerpt: 'Discover how the meditative practice of pottery fosters mindfulness, creativity, and self-expression while teaching us to embrace both success and failure.',
    content: `In our fast-paced world, pottery offers a rare sanctuary where time seems to slow down. When I'm at the wheel, there's no room for worrying about tomorrow or dwelling on yesterday. It's just me, the clay, and the present moment. This mindfulness is what drew me to pottery initially, and it's what keeps me coming back to the studio day after day.

## Finding Presence in Clay

There's something deeply meditative about wedging clay, centering it on the wheel, and feeling it transform beneath your hands. Each step demands your full attention - miss the right moisture content, and your piece cracks. Rush the drying process, and you'll lose weeks of work. Pottery teaches patience in a way few other activities can.

## Creativity and Self-Expression

What I love most about pottery is how it allows for endless creativity. No two pieces are ever exactly alike, even when you're trying to replicate something. Each creation carries your energy, your mood, your intention in that moment. Some of my favorite pieces are the ones where I let go of trying to make something "perfect" and just allowed myself to play.

## Embracing Failure and Finding Beauty

One of my most beloved glazes came from a complete mistake. I was trying to create a simple earth tone and misread the recipe, adding twice the amount of iron oxide. The result was this gorgeous, complex surface that looks like aged bronze with hints of purple. I almost threw the test piece away! Now it's one of my most requested finishes.

Pottery has taught me that failure isn't the opposite of success - it's part of the process. Some of my most interesting pieces came from "mistakes" that pushed me to explore new techniques and aesthetics. The kiln has a way of surprising you, and I've learned to embrace those surprises rather than fight them.

The slow living movement isn't about doing everything slowly - it's about doing everything with intention. Pottery embodies this philosophy perfectly. Each piece requires presence, patience, and acceptance of what emerges. In a world that demands instant results, there's profound satisfaction in creating something that simply cannot be rushed.`,
    author: 'Brian',
    date: '2024-01-01',
    category: 'Philosophy',
    tags: ['slow living', 'mindfulness', 'philosophy'],
    image: '/blog-slow-living.jpg',
    readTime: '3 min read'
  }
]

export default function JournalPage() {
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null)

  const handlePostClick = (post: typeof blogPosts[0]) => {
    setSelectedPost(post)
  }

  const handleCloseModal = () => {
    setSelectedPost(null)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Thoughts
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Musings on pottery, bonsai, slow living, and the creative process. 
              Stories from the studio and reflections on a life shaped by clay.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="group">
                <Card 
                  className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => handlePostClick(post)}
                >
                  <CardHeader className="p-0">
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <span className="text-gray-500 dark:text-gray-400">Blog Image</span>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
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
                    </div>
                    
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">{post.category}</span>
                      </div>
                      
                      <Button variant="ghost" size="sm">
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Post Modal */}
      <BlogPostModal 
        post={selectedPost}
        isOpen={!!selectedPost}
        onClose={handleCloseModal}
      />

      {/* Newsletter Section */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Get notified when we publish new articles about pottery, bonsai care, and studio life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <Button>
              Subscribe
            </Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  )
}
