"use client";

import {
  acceptFollowRequestAction,
  declineFollowRequestAction,
} from "@/app/lib/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

type AcceptDeclineFollowRequestProps = {
  userId: string;
};

export default function AcceptDeclineFollowRequest({
  userId,
}: AcceptDeclineFollowRequestProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleAccept() {
    setLoading(true);
    try {
      await acceptFollowRequestAction(userId);
    } catch (error) {
      console.error("Unable to accept follow request", error);
      throw new Error("Unable to accept follow request");
    } finally {
      setLoading(false);
      router.refresh();
    }
  }

  async function handleDecline() {
    setLoading(true);
    try {
      await declineFollowRequestAction(userId);
    } catch (error) {
      console.error("Unable to decline follow request", error);
      throw new Error("Unable to decline follow request");
    } finally {
      setLoading(false);
      router.refresh();
    }
  }

  return (
    <div className="flex py-1 px-4 gap-2 justify-between bg-[#1f1f1f] w-full">
      <button disabled={loading} onClick={handleAccept}>
        Accept
      </button>
      <button disabled={loading} onClick={handleDecline}>
        Decline
      </button>
    </div>
  );
}
