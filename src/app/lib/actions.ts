"use server";

import { createPost, updateBio, createLike, deleteLike } from "@/app/lib/data";
import { auth } from "@clerk/nextjs/server";

export async function createPostAction(content: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unable to find user');
  await createPost(userId, content);
}

export async function updateBioAction(content: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unable to find user');
  await updateBio(userId, content);
}

export async function createLikeAction(postId: string) {
    const { userId } = await auth();
    if (!userId) throw new Error('Unable to find user');
    await createLike(postId, userId);
}

export async function deleteLikeAction(postId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unable to find user');
  await deleteLike(postId, userId);
}