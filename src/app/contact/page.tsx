import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { ContactForm } from '@/components/contact-form'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Have questions about our products or want to discuss a custom piece? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a message</h2>
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Business Details</CardTitle>
                <CardDescription>
                  Reach out to us through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Email</p>
                    <a href="mailto:hello@bonsaibri.com" className="text-gray-600 dark:text-gray-300 hover:text-primary">
                      hello@bonsaibri.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Phone</p>
                    <a href="tel:+17051234567" className="text-gray-600 dark:text-gray-300 hover:text-primary">
                      (705) 123-4567
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Location</p>
                    <p className="text-gray-600 dark:text-gray-300">Northern Ontario, Canada</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Response Time</p>
                    <p className="text-gray-600 dark:text-gray-300">Usually within 24 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custom Orders</CardTitle>
                <CardDescription>
                  Interested in a custom piece?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We love creating custom pieces for special occasions or specific needs. 
                  Whether it's a unique bonsai pot, personalized ornaments, or custom smoking accessories, 
                  we can work with you to bring your vision to life.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Custom orders typically take 2-4 weeks depending on complexity and current workload.
                </p>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Find Us</CardTitle>
                <CardDescription>
                  Located in beautiful Northern Ontario
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 dark:text-gray-400">Map of Northern Ontario</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Serving customers across Northern Ontario and beyond
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
