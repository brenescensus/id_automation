import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();
  
  const { fullname, designation, department,id_number,employee_id, profileImage } = body;

  if (!fullname || !designation || !department ||!id_number ||!employee_id|| !profileImage) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }
  console.log(body);

  try {
    const newUser = await prisma.company.create({
      data: {
        fullname,
        designation,
        department,
        id_number,
        employee_id,  
        profileImage, // Save the Cloudinary image URL
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error saving data:", error.message);
    return NextResponse.json({ error: "Error saving data" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
