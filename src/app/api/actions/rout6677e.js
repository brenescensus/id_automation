// src/app/api/actions/route.js
import { PrismaClient } from '@prisma/client';
import upload from '../../middleware/upload';

const prisma = new PrismaClient();

// Handle GET requests
export async function GET(req, res) {
  try {
    const compids = await prisma.company.findMany();
    return new Response(JSON.stringify(compids), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    return new Response(JSON.stringify({ error: "Error fetching data" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// Handle POST requests
export const POST = async (req, res) => {
  // Apply the upload middleware
  await new Promise((resolve, reject) => {
    upload.single('profileImage')(req, res, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });

  const {  designation, department, id_number, employee_id,fullname } = req.body;
  const profileImage = req.file?.filename;

  if (!fullname || !designation || !department || !id_number || !employee_id) {
    return new Response(JSON.stringify({ error: "All fields are required" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const newCompanyId = await prisma.company.create({
      data: { designation, department, id_number, employee_id, profileImage,fullname },
    });
    return new Response(JSON.stringify(newCompanyId), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    return new Response(JSON.stringify({ error: "Error creating record" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
