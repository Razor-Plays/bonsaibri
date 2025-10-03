import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import sharp from 'sharp'

export interface StorageProvider {
  upload(file: Buffer, filename: string): Promise<string>
  delete(url: string): Promise<void>
}

export class LocalStorageProvider implements StorageProvider {
  private uploadDir: string

  constructor(uploadDir: string = 'public/uploads') {
    this.uploadDir = uploadDir
  }

  async upload(file: Buffer, filename: string): Promise<string> {
    // Ensure upload directory exists
    await mkdir(this.uploadDir, { recursive: true })

    const filepath = join(this.uploadDir, filename)
    
    // Process image with Sharp - resize and convert to WebP
    const processedBuffer = await sharp(file)
      .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toBuffer()

    await writeFile(filepath, processedBuffer)
    
    return `/${filename}`
  }

  async delete(url: string): Promise<void> {
    // Implementation for local file deletion
    // This would require fs.unlink and path handling
    console.log(`Would delete local file: ${url}`)
  }
}

export class VercelBlobStorageProvider implements StorageProvider {
  async upload(file: Buffer, filename: string): Promise<string> {
    // Implementation for Vercel Blob storage
    // This would use the @vercel/blob package
    console.log(`Would upload to Vercel Blob: ${filename}`)
    return `https://blob.vercel-storage.com/${filename}`
  }

  async delete(url: string): Promise<void> {
    // Implementation for Vercel Blob deletion
    console.log(`Would delete from Vercel Blob: ${url}`)
  }
}

// Factory function to get the appropriate storage provider
export function getStorageProvider(): StorageProvider {
  if (process.env.NODE_ENV === 'production' && process.env.BLOB_READ_WRITE_TOKEN) {
    return new VercelBlobStorageProvider()
  }
  return new LocalStorageProvider()
}
