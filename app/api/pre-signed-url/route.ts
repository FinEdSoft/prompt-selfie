import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Configure the S3 client

const s3Client = new S3Client({
  region: 'auto',  // Required for S3-compatible services like Cloudflare R2
  endpoint: process.env.ENDPOINT ?? "", // Your S3-compatible endpoint (e.g., Cloudflare R2)
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY ?? "", // Your access key ID
    secretAccessKey: process.env.S3_SECRET_KEY ?? "", // Your secret access key
  }
});

export const GET = async () => {
  const key = `models/${Date.now()}_${Math.random()}.zip`; // Unique key for the file

  // Create a PutObjectCommand for uploading the file
  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME, // Your bucket name
    Key: key, // The key (path) for the file
    ContentType: 'application/zip', // Set the content type
  });

  try {
    // Generate the pre-signed URL
    const url = await getSignedUrl(s3Client, command, {
      expiresIn: 60 * 60 * 5, // URL expires in 5 hours
    });

    // Return the pre-signed URL and key
    return Response.json({
      url,
      key,
    });
  } catch (error) {
    console.error('Error generating pre-signed URL:', error);
    return Response.json({ error: 'Failed to generate pre-signed URL' }, { status: 500 });
  }
}

