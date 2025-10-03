# Bonsai Bri Website Development Todo List

## Phase 1: Project Setup & Dependencies
- [ ] Install additional dependencies (Prisma, NextAuth, shadcn/ui, lucide-react, framer-motion, etc.)
- [ ] Set up TypeScript configuration
- [ ] Configure Tailwind CSS with custom theme
- [ ] Set up project structure (app router, components, lib, prisma, etc.)
- [ ] Create environment variables template

## Phase 2: Database & Data Models
- [ ] Set up Prisma with SQLite
- [ ] Create Product and Image models with enums
- [ ] Create migration and seed data (9 sample products)
- [ ] Set up database connection utilities

## Phase 3: Core Components & Layout
- [ ] Create responsive navbar with dark mode toggle
- [ ] Create footer with social links and quick navigation
- [ ] Set up dark mode with localStorage persistence
- [ ] Create typography system (Inter + Noto Serif)
- [ ] Create reusable UI components (Button, Card, Badge, etc.)

## Phase 4: Authentication & Admin
- [ ] Set up NextAuth with credentials provider
- [ ] Create admin login page
- [ ] Create admin dashboard layout
- [ ] Implement admin middleware and session management

## Phase 5: Main Pages
- [ ] Home page with hero, featured products, and CTAs
- [ ] About page with Brian's story and photo gallery
- [ ] Products listing page with filtering and search
- [ ] Product detail page with image gallery and specifications
- [ ] Contact page with form and business details
- [ ] Journal/blog page with sample post
- [ ] Legal pages (privacy, terms)

## Phase 6: Admin Features
- [ ] Product CRUD operations
- [ ] Image upload with drag-and-drop
- [ ] Image resizing and WebP conversion
- [ ] Markdown editor with preview
- [ ] Gallery manager for About/Journal images
- [ ] Basic statistics dashboard

## Phase 7: Image Storage & Optimization
- [ ] Set up local storage for development
- [ ] Create storage abstraction layer
- [ ] Implement image optimization and responsive sizing
- [ ] Set up Vercel Blob/S3 integration structure

## Phase 8: SEO & Performance
- [ ] Implement metadata for all pages
- [ ] Create sitemap.xml and robots.txt
- [ ] Set up Open Graph and Twitter cards
- [ ] Implement JSON-LD schema markup
- [ ] Create dynamic OG images for products
- [ ] Optimize images with Next/Image

## Phase 9: Contact & Communication
- [ ] Implement contact form with server actions
- [ ] Set up email handling (Resend/SMTP stub)
- [ ] Add form validation and success states
- [ ] Implement 18+ gate for smoking accessories

## Phase 10: Polish & Testing
- [ ] Add loading states and skeletons
- [ ] Implement smooth animations with Framer Motion
- [ ] Create 404 page and error handling
- [ ] Add accessibility features (focus states, alt text)
- [ ] Write unit tests for utilities
- [ ] Test responsive design across devices
- [ ] Run Lighthouse performance audit

## Phase 11: Deployment & Documentation
- [ ] Create deployment configuration
- [ ] Write comprehensive README with setup instructions
- [ ] Create admin guide for Brian
- [ ] Test deployment to Vercel
- [ ] Final testing and bug fixes

## Additional Features
- [ ] Implement "Similar items" carousel
- [ ] Add product status badges (Featured/Sold/Custom)
- [ ] Create category filtering chips
- [ ] Implement search functionality
- [ ] Add sorting options (Newest/Price/Size)
