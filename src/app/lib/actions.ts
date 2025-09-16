"use server";

import { 
  createPost, 
  updateBio, 
  createLike, 
  deleteLike, 
  createComment, 
  createFollowRequest, 
  acceptFollowRequest, 
  declineFollowRequest,
  unfollowUser 
} from "@/app/lib/data";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createPostAction(content: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unable to find user');
  await createPost(userId, content);
}

export async function createCommentAction(postId: string, content: string) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error('Unable to find user');

    await createComment(userId, content, postId);
    
    // Revalidate the specific post page
    revalidatePath(`/dashboard/posts/${postId}`);
  } catch (error) {
    console.error("Action Error:", error);
    throw new Error("Failed to create comment");
  }
}

export async function updateBioAction(content: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unable to find user');
  try {
    await updateBio(userId, content);
  } catch (error) {
    console.error("Action Error:", error);
    throw new Error("Failed to update bio");
  } finally {
    revalidatePath(`/dashboard/profile`); // ??????
  }
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

export async function createFollowRequestAction(userId: string) {
  await createFollowRequest(userId);
}

export async function unfollowUserAction(userId: string) {
  unfollowUser(userId);
}

export async function acceptFollowRequestAction(userId: string) {
  await acceptFollowRequest(userId);
}

export async function declineFollowRequestAction(userId: string) {
  await declineFollowRequest(userId);
}
