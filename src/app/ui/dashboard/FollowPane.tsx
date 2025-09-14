"use client";

import {
  createFollowRequestAction,
  unfollowUserAction,
} from "@/app/lib/actions";
import { useState } from "react";

type FollowPaneProps = {
  userId: string;
  following: boolean;
};

export default function FollowPane({ userId, following }: FollowPaneProps) {
  const [loading, setLoading] = useState(false);
  const [isfollowing, setIsFollowing] = useState(following);

  async function handleFollowRequest() {
    setLoading(true);
    try {
      setIsFollowing(true);
      await createFollowRequestAction(userId);
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Unable to follow user");
    } finally {
      setLoading(false);
    }
  }

  async function handleUnfollowUser() {
    setLoading(true);
    try {
      setIsFollowing(false);
      await unfollowUserAction(userId);
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Unable to unfollow user");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-4 bg-emerald-950 rounded-xl w-2xl justify-center p-2">
      {isfollowing ? (
        <button disabled={loading} onClick={handleUnfollowUser}>
          Unfollow / Delete Follow Request
        </button>
      ) : (
        <button disabled={loading} onClick={handleFollowRequest}>
          Send Follow Request
        </button>
      )}
    </div>
  );
}
