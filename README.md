# BonsaiBri - Handcrafted Pottery Website

A beautiful, handcrafted pottery website built with Next.js, featuring a complete admin dashboard, blog system, and e-commerce functionality.

## 🌟 Features

- **Complete Product Catalog** - Browse handcrafted pottery items
- **Admin Dashboard** - Full CRUD operations for products and blog posts
- **Blog System** - Thoughts and musings on pottery, bonsai, and slow living
- **Responsive Design** - Works beautifully on all devices
- **Database Integration** - SQLite with Prisma ORM
- **Modern Tech Stack** - Next.js, React, TypeScript, Tailwind CSS

## 🚀 GitHub Pages Setup Guide

Since this is a Next.js application with a build process, database, and API routes, it requires special configuration for GitHub Pages. Here's how to properly deploy it:

### Option 1: GitHub Actions Deployment (Recommended)

1. **Create GitHub Actions Workflow**
   Create `.github/workflows/deploy.yml` in your repository:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
      working-directory: ./bonsai
    
    - name: Build Next.js
      run: npm run build
      working-directory: ./bonsai
      env:
        DATABASE_URL: "file:./dev.db"
    
    - name: Export static files
      run: npm run export
      working-directory: ./bonsai
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./bonsai/out
```

2. **Configure Next.js for Static Export**
   Add to your `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

3. **Add Export Script**
   Add to your `package.json`:

```json
"scripts": {
  "build": "next build",
  "export": "next export",
  "deploy": "next build && next export"
}
```

4. **Enable GitHub Pages**
   - Go to your repository Settings → Pages
   - Set Source to "GitHub Actions"
   - Save the changes

### Option 2: Manual Static Export

1. **Build and Export Locally**
   ```bash
   cd bonsai
   npm install
   npm run build
   npm run export
   ```

2. **Create GitHub Pages Branch**
   ```bash
   git checkout --orphan gh-pages
   git rm -rf .
   cp -r out/* .
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages
   ```

3. **Configure GitHub Pages**
   - Go to Settings → Pages
   - Set source to "Deploy from a branch"
   - Select "gh-pages" branch
   - Save changes

## 📁 Project Structure

```
bonsai/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React components
│   ├── lib/             # Utilities and database
│   └── ...
├── prisma/              # Database schema and migrations
├── public/              # Static assets
├── package.json
└── README.md
```

## 🛠️ Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies**
   ```bash
   cd bonsai
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the bonsai directory:
   ```
   DATABASE_URL="file:./dev.db"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   npm run prisma:seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Access the website**
   - Main site: http://localhost:3000
   - Admin dashboard: http://localhost:3000/admin

## 🗄️ Database Management

### Seed the database with sample data:
```bash
npm run prisma:seed
```

### Reset database:
```bash
npx prisma migrate reset
npm run prisma:seed
```

### View database in Prisma Studio:
```bash
npx prisma studio
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the bonsai directory:
```
DATABASE_URL="file:./dev.db"
```

### Next.js Configuration
The app is configured for both development and GitHub Pages deployment. Key settings:
- Static export enabled for GitHub Pages compatibility
- Database file path configured for portability
- Image optimization disabled for static deployment

## 🚀 Deployment Options

### GitHub Pages (Static)
- Follow the GitHub Actions setup above
- Automatically deploys on push to main branch
- Database is included in the static build

### Vercel (Recommended for Full Features)
- Connect your GitHub repository to Vercel
- Automatic deployments on push
- Full database and API functionality

### Netlify
- Drag and drop the `out` folder after building
- Or connect GitHub for automatic deployments

## 📊 Database Schema

The application uses SQLite with Prisma ORM. Key models:
- **Product** - Product catalog with images and details
- **BlogPost** - Blog posts with content and metadata
- **Image** - Product images with ordering

## 🎨 Customization

### Styling
- Uses Tailwind CSS for styling
- Dark mode support included
- Responsive design throughout

### Content
- Update mock data in `src/lib/mock-data.ts`
- Modify seed scripts in `prisma/` directory
- Customize components in `src/components/`

### Images
- Place product images in `public/` folder
- Blog post images should also go in `public/`
- Follow the existing naming convention

## 🐛 Troubleshooting

### GitHub Pages Not Loading
1. Ensure GitHub Actions workflow is properly configured
2. Check that the `out` folder exists after build
3. Verify repository settings have GitHub Actions enabled
4. Make sure the base path in `next.config.js` matches your repository name

### Database Issues
1. Check that `DATABASE_URL` is properly set
2. Ensure Prisma client is generated: `npx prisma generate`
3. Verify database file exists after seeding

### Build Errors
1. Check Node.js version (18+ recommended)
2. Ensure all dependencies are installed
3. Verify environment variables are set

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review GitHub Actions logs for deployment issues
3. Ensure all prerequisites are met

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
