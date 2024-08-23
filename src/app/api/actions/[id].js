// pages/api/posts/[id].js
//for updating and deleting ids
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    const { id } = req.query;
    const compid = await prisma.companyId.findUnique({ where: { id: Number(id) } });
    res.json(compid);
  } else if (method === 'PUT') {
    const { id } = req.query;
    const {  name, designation,department,idno,empyno, } = req.body;
    const updatedComapnyids = await prisma.companyId.update({
      where: { id: Number(id) },
      data: {name,designation,department,idno,empyno, },
    });
    res.json(updatedComapnyids);
  } else if (method === 'DELETE') {
    const { id } = req.query;
    await prisma.companyId.delete({ where: { id: Number(id) } });
    res.status(204).end();
  }
}