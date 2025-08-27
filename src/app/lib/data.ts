import { prisma } from '@/app/lib/prisma'


export async function fetchUsers() {
  try {
    const data = await prisma.user.findMany({
        select: {
            id: true, firstName: true, lastName: true
        }
    });
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user data');
  }
}