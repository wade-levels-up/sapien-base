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
  unfollowUser,
  deletePost
} from "@/app/lib/data";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createPostAction(content: string) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error('Unable to find user');

    await createPost(userId, content);

    revalidatePath('/dashboard', 'layout');
  } catch(error) {
    console.error("Action Error:", error);
    throw new Error("Failed to create post");
  }
}

export async function createCommentAction(postId: string, content: string) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error('Unable to find user');

    await createComment(userId, content, postId);
    
    // Revalidate the specific post page
    revalidatePath('/dashboard', 'layout');
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
    revalidatePath('/dashboard', 'layout');
  }
}

export async function createLikeAction(postId: string) {
    const { userId } = await auth();
    if (!userId) throw new Error('Unable to find user');
    try {
      await createLike(postId, userId);
      revalidatePath('/dashboard', 'layout');
    } catch (error) {
    console.error("Action Error:", error);
    throw new Error("Failed to update like");
  }
}

export async function deleteLikeAction(postId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unable to find user');
  try {
     await deleteLike(postId, userId);
     revalidatePath('/dashboard', 'layout');
  } catch (error) {
    console.error("Action Error:", error);
    throw new Error("Failed to delete like");
  }
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
  try {
    await declineFollowRequest(userId);
    revalidatePath('/dashboard', 'layout');
  } catch (error) {
    console.error("Failed to unfollow user", error);
    throw new Error("Failed to unfollow user")
  }
}

export async function deletePostAction(postId: string, userId: string) {
  try {
    await deletePost(postId, userId);
    revalidatePath('/dashboard', 'layout');
  } catch (error) {
    console.error("Action Error:", error);
    throw new Error("Failed to delete post");
  }
}
