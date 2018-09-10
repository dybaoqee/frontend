const s3 = require('s3')

const CACHE_MAX_AGE = 315360000

const client = s3.createClient({
  s3Options: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_DEFAULT_REGION
  }
})

const params = {
  localDir: '.next/gzip/static',
  deleteRemoved: false,
  s3Params: {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Prefix: '_next/static'
  },
  getS3Params: function(localFile, stat, callback) {
    callback(null, {
      ACL: 'public-read',
      ContentEncoding: 'gzip',
      CacheControl: `max-age=${CACHE_MAX_AGE}`
    })
  }
}

if (!process.AWS_ACCESS_KEY_ID) {
  console.log('No AWS_ACCESS_KEY_ID defined, ignoring S3 upload');
  process.exit(0);
}

const uploader = client.uploadDir(params)

uploader.on('error', function(err) {
  console.error('S3 Upload Error:', err.stack)
  process.exit(1)
})

uploader.on('end', function() {
  console.log('S3 Upload Completed')
  process.exit(0)
})

console.log('S3 Upload started')
