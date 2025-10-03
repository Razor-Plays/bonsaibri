import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting to update image paths...')
  
  // Update all images to remove /uploads/ prefix and use correct paths
  const imageUpdates = [
    { oldUrl: '/uploads/bonsai-pot-1.jpg', newUrl: '/bonsai-pot-1.jpg' },
    { oldUrl: '/uploads/bonsai-pot-2.jpg', newUrl: '/bonsai-pot-2.jpg' },
    { oldUrl: '/uploads/bonsai-pot-3.jpg', newUrl: '/bonsai-pot-1.jpg' },
    { oldUrl: '/uploads/ornament-1.jpg', newUrl: '/ornament-1.jpg' },
    { oldUrl: '/uploads/ornament-2.jpg', newUrl: '/ornament-2.jpg' },
    { oldUrl: '/uploads/ornament-3.jpg', newUrl: '/ornament-1.jpg' },
    { oldUrl: '/uploads/pipe-1.jpg', newUrl: '/pipe-1.jpg' },
    { oldUrl: '/uploads/bong-1.jpg', newUrl: '/ashtray-1.jpg' },
    { oldUrl: '/uploads/ashtray-1.jpg', newUrl: '/ashtray-1.jpg' },
  ]

  for (const update of imageUpdates) {
    const result = await prisma.image.updateMany({
      where: { url: update.oldUrl },
      data: { url: update.newUrl }
    })
    
    if (result.count > 0) {
      console.log(`Updated ${result.count} image(s) from ${update.oldUrl} to ${update.newUrl}`)
    }
  }

  console.log('Image path updates completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
