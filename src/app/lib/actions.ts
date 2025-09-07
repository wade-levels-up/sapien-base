"use server";

import { createPost, updateBio } from "@/app/lib/data";
import { auth } from "@clerk/nextjs/server";

export async function createPostAction(content: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated. Unable to create post");
  await createPost(userId, content);
}

export async function updateBioAction(content: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated. Unable to update bio");
  await updateBio(userId, content);
}