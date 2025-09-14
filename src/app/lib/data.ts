import { prisma } from '@/app/lib/prisma'
import { currentUser } from "@clerk/nextjs/server";
import type { User } from '@/app/lib/definitions';

/**
 * Fetches the logged in user's details from the database.
 * Returns id, firstName, lastName and bio for each user.
 * Throws an error if the fetch fails.
 */
export async function fetchUser(userId: string) {
  try {
    const users = await prisma.user.findUnique({
      where: { id: userId},
        select: {
            id: true, firstName: true, lastName: true, bio: true, joined: true, profilePicturePath: true
        }
    });
    return users;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user data');
  }
}

/**
 * Fetches a list of users from the database.
 * Only returns firstName, lastName and bio for each user.
 * Throws an error if the fetch fails.
 */
export async function fetchUsers() {
  try {
    const users = await prisma.user.findMany({
        select: {
            id: true, firstName: true, lastName: true, bio: true, profilePicturePath: true
        }
    });
    return users;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user data');
  }
}

/**
 * Checks the clerkId of the logged in user against the database.
 * If no matches are found a new user is created in the User database table with their clerkId set as their id.
 * Throws an error if unable to create the user.
 */
export async function createUserOnDemand() {
  const user = await currentUser();
  const dbUser = await prisma.user.findUnique({ where: { id: user?.id } });

  if (!dbUser) {
    try {
      await prisma.user.create({
        data: {
          id: user?.id,
          firstName: user?.firstName,
          lastName: user?.lastName,
          profilePicturePath: user?.imageUrl
        } as User,
      });
    } catch(error) {
      console.error('Database Error:', error);
      throw new Error('Failed to create user on-demand');
    }
  }
}

export async function fetchPost(postId: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { 
        author: { select: { firstName: true } }, 
        likes: { select: { userId: true} }, 
        comments: { select: { id: true, author: { select: { firstName: true, lastName: true, profilePicturePath: true } }, content: true } } 
      }
    });
    return post;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch post');
  }
}

export async function fetchPosts() {
  try {
    const posts = await prisma.post.findMany({
      include: { author: { select: { firstName: true } }, likes: { select: { userId: true} }, comments: { select: { content: true } } }
    });
    return posts;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch posts');
  }
}

export async function fetchUserPosts(userId: string) {
  try {
    const posts = await prisma.post.findMany({
      where: { authorId: userId },
      include: { 
        author: { select: { firstName: true } }, 
        likes: { select: { userId: true} }, 
        comments: { select: { authorId: true, content: true } } 
      }
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

export async function createLike(postId: string, userId: string) {
  try {
    await prisma.like.create({
      data: {
        postId: postId,
        userId: userId
      }
    })
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create like on post');
  }
}

export async function deleteLike(postId: string, userId:string) {
  try {
    await prisma.like.deleteMany({
      where: { postId: postId, userId: userId }
    })
  } catch (error) {
    console.error("Database Error", error);
    throw new Error('Unabled to delete like from post');
  }
}

export async function updateBio(userId: string, content: string) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        bio: content
      }
    })
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to update bio');
  }
}

export async function createComment(authorId: string, content: string, postId: string) {
  try {
    await prisma.comment.create({
      data: {
        authorId: authorId, content: content, postId: postId 
      }
    })
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create comment');
  }
}