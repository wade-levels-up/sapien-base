import { prisma } from '@/app/lib/prisma'
import { currentUser } from "@clerk/nextjs/server";
import type { User } from '@/app/lib/definitions';


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

export async function createUserOnDemand() {
  const user = await currentUser();

  // Check if user with clerkId has a matching user in the database
  const dbUser = await prisma.user.findUnique({ where: { id: user?.id } });
  
  // If not, create a new user using their clerkId as the user id
  if (!dbUser) {
    await prisma.user.create({
      data: {
        id: user?.id,
        firstName: user?.firstName,
        lastName: user?.lastName,
      } as User,
    });
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

export async function createPost(authorId: string, content: string) {
  try {
    await prisma.post.create({
      data: {
        authorId: authorId, content: content 
      }
    })
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create post');
  }
}