import { prisma } from '@/app/lib/prisma'


export async function fetchUsers() {
  try {
    const users = await prisma.user.findMany({
        select: {
            id: true, firstName: true, lastName: true
        }
    });
    return users;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user data');
  }
}

export async function fetchPosts() {
  try {
    const posts = await prisma.post.findMany({
      include: { author: { select: { firstName: true } } }
    });
    return posts;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch posts');
  }
}