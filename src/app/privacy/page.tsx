export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Last updated: January 1, 2024
          </p>

          <h2>Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you contact us through our website, 
            inquire about products, or request custom orders. This may include:
          </p>
          <ul>
            <li>Name and contact information (email, phone number)</li>
            <li>Messages and inquiries you send us</li>
            <li>Information about products you're interested in</li>
            <li>Details for custom orders</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Respond to your inquiries and questions</li>
            <li>Process and fulfill custom orders</li>
            <li>Provide information about our products</li>
            <li>Communicate with you about your orders</li>
            <li>Improve our products and services</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to third parties. 
            We may share your information only in the following circumstances:
          </p>
          <ul>
            <li>With your consent</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights and safety</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information. 
            However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2>Your Rights</h2>
          <p>
            You have the right to:
          </p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal information</li>
            <li>Opt out of communications from us</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or our privacy practices, please contact us at:
          </p>
          <p>
            <strong>Email:</strong> hello@bonsaibri.com<br />
            <strong>Phone:</strong> (705) 123-4567
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
          </p>
        </div>
      </div>
    </div>
  )
}
