import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Flame, TreePine, Sparkles } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About Bonsai Bri
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Handcrafted pottery inspired by nature, Japanese aesthetics, and the slow living movement.
              Based in Northern Ontario, Canada.
            </p>
          </div>
        </div>
      </section>

      {/* Brian's Story */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Brian's Story
              </h2>
              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300">
                <p>
                  Based in the heart of Northern Ontario, Brian has been crafting beautiful pottery 
                  for over a decade. His journey began with a fascination for bonsai cultivation 
                  and the need for perfect pots to complement these miniature trees.
                </p>
                <p>
                  What started as a personal hobby quickly evolved into a passion for creating 
                  functional art that brings joy to others. Each piece is carefully handcrafted 
                  using traditional pottery techniques passed down through generations.
                </p>
                <p>
                  Brian's work is inspired by the natural beauty of Northern Ontario, Japanese 
                  aesthetics, and the philosophy of slow living. Every item tells a story of 
                  craftsmanship, patience, and attention to detail.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src="/bri-at-work.jpg"
                  alt="Brian at work"
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Bri Creates
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Each piece is made with care, attention to detail, and a commitment to quality craftsmanship.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center mx-auto mb-4">
                <TreePine className="h-8 w-8 text-white dark:text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Bonsai Pots
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Handcrafted pots designed specifically for bonsai trees, with proper drainage and aesthetic appeal.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-white dark:text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Christmas Ornaments
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Festive decorations that bring warmth and charm to your holiday celebrations.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center mx-auto mb-4">
                <Flame className="h-8 w-8 text-white dark:text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Smoking Accessories
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Artisan pipes, bongs, and ashtrays crafted with functionality and style in mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              The Process
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From clay to finished piece, every step is done with intention and care.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white dark:text-gray-900 font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Design</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Each piece starts with careful planning and design consideration.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white dark:text-gray-900 font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Shaping</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Clay is shaped by hand, on the wheel, or using molds - each technique chosen for the specific piece.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white dark:text-gray-900 font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Firing</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Pieces are fired in the kiln to achieve durability and strength.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white dark:text-gray-900 font-bold">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Finishing</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Final touches, glazing, and quality inspection complete each piece.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Own a Piece of Craftsmanship?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Explore our collection of handcrafted pottery, each piece made with love and attention to detail.
          </p>
          <a href="/products">
            <Button size="lg" className="text-lg">
              View Our Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  )
}
