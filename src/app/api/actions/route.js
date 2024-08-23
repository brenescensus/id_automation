import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

// Handle GET requests
export async function GET() {
  try {
    const compids = await prisma.company.findMany();
    return NextResponse.json(compids, { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}

// Handle POST requests
export const POST = async (req) => {
  try {
    // Check for the Content-Type header
    const contentType = req.headers.get('content-type');
    if (!contentType) {
      throw new Error('Missing Content-Type header');
    }

    const boundary = contentType.split('=')[1];
    if (!boundary) {
      throw new Error('Cannot find boundary in Content-Type header');
    }

    const buffer = await req.arrayBuffer();
    const parts = new TextDecoder().decode(buffer).split(`--${boundary}`);

    let fields = {};
    let files = {};
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    fs.mkdirSync(uploadDir, { recursive: true });

    parts.forEach((part) => {
      // Trim whitespace and ensure part is not empty
      part = part.trim();
      if (!part) return; // Skip empty parts

      if (part.includes('Content-Disposition')) {
        const [rawHeaders, body] = part.split('\r\n\r\n');
        const headers = rawHeaders.split('\r\n');
        const disposition = headers[0].split('; ');

        if (disposition.some((d) => d.startsWith('filename'))) {
          // Handle file part
          const filename = disposition
            .find((d) => d.startsWith('filename'))
            .split('=')[1]
            .replace(/"/g, '')
            .trim(); // Trim whitespace

          const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_'); // Sanitize filename
          const filepath = path.join(uploadDir, sanitizedFilename);
          const fileBuffer = Buffer.from(body.trim(), 'binary'); // Ensure body is trimmed
          
          fs.writeFileSync(filepath, fileBuffer);
          files.profileImage = { filepath };
        } else {
          // Handle field part
          const name = disposition
            .find((d) => d.startsWith('name'))
            .split('=')[1]
            .replace(/"/g, '')
            .trim(); // Trim whitespace
          fields[name] = body.trim(); // Assign the trimmed body to the field
        }
      }
    });

    const { fullname, designation, department, id_number, employee_id } = fields;
    const profileImage = files.profileImage?.filepath;

    if (!fullname || !designation || !department || !id_number || !employee_id) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const newCompanyId = await prisma.company.create({
      data: { fullname, designation, department, id_number, employee_id, profileImage },
    });

    return NextResponse.json(newCompanyId, { status: 201 });
  } catch (error) {
    console.error('Error processing form:', error);
    return NextResponse.json({ error: 'Error processing form' }, { status: 500 });
  }
};