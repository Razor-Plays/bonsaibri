export async function uploadToCloudinaryServer(
  fileBuffer: Buffer,
  filename: string
): Promise<string> {
  const cloudinary = await import('cloudinary')
  
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader
      .upload_stream(
        {
          folder: 'bonsaibri/products',
          public_id: filename.replace(/\.[^/.]+$/, ''),
          overwrite: true,
          transformation: [
            { width: 1200, height: 1200, crop: 'limit' },
            { quality: 'auto', fetch_format: 'auto' },
          ],
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result!.secure_url)
        }
      )
      .end(fileBuffer)
  })
}
