// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const multer = require('multer');


// // Verify environment variables
// if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
//   console.error('Missing Cloudinary environment variables');
//   process.exit(1);
// }

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'postpilot/clients',
//     allowed_formats: ['jpg', 'png', 'jpeg'],
//     transformation: [{ width: 500, height: 500, crop: 'fill' }]
//   }
// });
// // Test the configuration
// cloudinary.uploader.upload('test')
//   .catch(error => {
//     console.error('Cloudinary configuration test failed:', error.message);
//   });

// const upload = multer({ storage: storage });

// module.exports = { upload, cloudinary };


const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

// Verify environment variables
const requiredEnvVars = [
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
  console.error('Missing required Cloudinary variables:', missingVars.join(', '));
  process.exit(1);
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Create storage configuration
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'postpilot/clients',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 500, height: 500, crop: 'fill' }]
  }
});

// Create multer upload instance
const upload = multer({ storage });

// Export configured instances
module.exports = {
  cloudinary,
  upload,
  getConfig: () => cloudinary.config()
};