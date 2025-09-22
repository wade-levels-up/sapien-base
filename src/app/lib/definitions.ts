// This file contains type definitions data.
// It describes the shape of the data, and what data type each property should accept.

export type User = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  bio?: string;
  profilePicturePath?: string;
};

export type Post = {
  id: string;
  content: string;
  createdAt: Date;
  author: {
    id: string;         
    firstName: string;
    lastName: string;    
  };
  likes: Array<{
    userId: string;
  }>;
  comments: Array<{
      id: string;
      content: string;
      createdAt: Date;
      author: {
        id: string;
        firstName: string;
        lastName: string;
      };
    }>;
};

export type PostType = {
  id: string;
  content: string;
  createdAt: Date;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    profilePicturePath?: string;
  };
  likes: Array<{
    userId: string;
  }>;
  comments: Array<{
    id: string;
    content: string;
    createdAt: Date;
    author: {
      id: string;
      firstName: string;
      lastName: string;
    };
  }>;
};

export type PostAction =
  | { type: "add"; content: string }
  | { type: "delete"; postId: string }
  | { type: "like"; postId: string }
  | { type: "unlike"; postId: string };