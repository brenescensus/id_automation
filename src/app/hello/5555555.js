// src/app/api/actions/route.js
import { PrismaClient } from '@prisma/client';
import upload from '../middleware/upload'; // Adjust the path as necessary
import { createRouter } from 'next-connect';

const prisma = new PrismaClient();
const router = createRouter();

// Use the upload middleware for POST requests
// router.use(upload.single('profileImage'));

// Handle GET requests
router.get(async (req, res) => {
  try {
    const compids = await prisma.company.findMany();
    res.status(200).json(compids);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

// Handle POST requests
router.post ( upload.single('profileImage'),async (req, res) => {
  const { name, designation, department, id_number, employee_id } = req.body;
  const profileImage = req.file?.filename; // Get the filename of the uploaded image

  try {
    const newCompanyId = await prisma.company.create({
      data: { name, designation, department, id_number, employee_id, profileImage },
    });
    res.status(201).json(newCompanyId);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Error creating record" });
  }
});

// Export the router to be used in the API route
export default router.handler();
