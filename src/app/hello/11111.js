// pages/api/posts/index.js
//for creating and getting posts
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     const compids = await prisma.companyId.findMany();
//     res.json(compids);
//   } else if (req.method === 'POST') {
//     const {  name,designation, department, idno,empyno} = req.body;
//     const newCompanyId = await prisma.companyId.create({
//       data: {   name,designation, department,idno, empyno, },
//     });
//     res.status(201).json(newCompanyId);
//   }
// }

// pages/api/actions/index.js
// export default function handler(req, res) {
//   if (req.method === 'GET') {
//     // Handle GET request
//     res.status(200).json({ message: "GET request success" });
//   } else if (req.method === 'POST') {
//     // Handle POST request
//     const { name, designation, department, idno, empyno } = req.body;
//     // Here you would typically save the data to a database
//     res.status(201).json({ message: "POST request success", data: { name, designation, department, idno, empyno } });
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// }



// pages/api/posts/index.js

// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     try {
//       const compids = await prisma.companyId.findMany();
//       res.status(200).json(compids);
//     } catch (error) {
//       res.status(500).json({ error: "Error fetching data" });
//     }
//   } else if (req.method === 'POST') {
//     const { name, designation, department, idno, empno } = req.body;
//     try {
//       const newCompanyId = await prisma.companyId.create({
//         data: { name, designation, department, idno, empno },
//       });
//       res.status(201).json(newCompanyId);
//     } catch (error) {
//       res.status(500).json({ error: "Error creating record" });
//     }
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// }




// import uploads from "/middleware/uploads"
import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
// const prisma = new PrismaClient();

// Handle GET requests
export async function GET(req) {
  try {
    // Fetch all records from the `companyid` table
    const compids = await prisma.company.findMany();
    // Return the records as JSON with a 200 status
    return new Response(JSON.stringify(compids), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    // Handle errors and return a 500 status
    return new Response(JSON.stringify({ error: "Error fetching data" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// Handle POST requests
export async function POST(req) {
  const { fullname, designation, department, id_number, employee_id,profileImage } = await req.json();  try {
    // Create a new record in the `companyid` table
    const newCompanyId = await prisma.company.create({
      data: { fullname, designation, department, id_number, employee_id,profileImage },
    });
    // Return the newly created record as JSON with a 201 status
    return new Response(JSON.stringify(newCompanyId), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    // Handle errors and return a 500 status
    return new Response(JSON.stringify({ error: "Error creating record" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}











// src/app/api/actions/route.js
import { PrismaClient } from '@prisma/client';
import upload from '../middleware/upload';

const prisma = new PrismaClient();

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

export const POST = async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      upload.single('profileImage')(req, res, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    const { fullname, designation, department, id_number, employee_id } = req.body;
    const profileImage = req.file?.filename;

    if (!fullname || !designation || !department || !id_number || !employee_id) {
      return new Response(JSON.stringify({ error: "All fields are required" }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const newCompanyId = await prisma.company.create({
      data: {
        fullname,
        designation,
        department,
        id_number,
        employee_id,
        profileImage,
      },
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
