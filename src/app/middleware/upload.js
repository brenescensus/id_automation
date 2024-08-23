// // middleware/upload.js

// // middleware/upload.js
// import multer from 'multer';
// import { join } from 'path';

// // Set up storage configuration
// const storage = multer.diskStorage({
//   destination: join(process.cwd(), 'public', 'uploads'), // Directory to save uploaded files
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
//   },
// });

// // Export the multer configuration
// export const config = {
//   api: {
//     bodyParser: false, // Disable body parsing, as multer will handle it
//   },
// };

// // Create and export the multer instance
// export default multer({ storage }).single('profileImage'); // Expect a single file with the name 'profileImage'




// src/middleware/upload.js
import multer from 'multer';
import path from 'path';

// Configure storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where files should be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the original file extension
  }
});

// Set up multer
const upload = multer({ storage: storage });

export default upload;
