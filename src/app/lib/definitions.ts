// This file contains type definitions data.
// It describes the shape of the data, and what data type each property should accept.

import { Like, Comment } from "@prisma/client";

export type User = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  bio?: string;
  profilePicturePath?: string;
};

export type Post = {
  id: string;
  authorId?: string;
  content: string;
  author: { firstName: string };
  comments?: { content: string }[];  // Match your query
  likes?: { userId: string }[];      // Match your query
  createdAt: Date;
  postPicturePath?: string;
}