"use client";

import { useState } from "react";
import UpdateBioForm from "./UpdateBioForm";

type UserBioSectionProps = {
  bio?: string;
  otherUserProfile: boolean;
};

export default function UserBioSection({
  bio,
  otherUserProfile,
}: UserBioSectionProps) {
  const [updating, setUpdating] = useState(false);

  if (otherUserProfile) {
    if (bio) {
      return (
        <section className="w-full">
          <h3>Bio:</h3>
          <p className="px-2 py-4 rounded-lg border-b-1 border-white/30">
            {bio}
          </p>
        </section>
      );
    } else {
      return null;
    }
  }

  if (updating) {
    return <UpdateBioForm prevContent={bio} setUpdating={setUpdating} />;
  }

  return (
    <div className="w-full max-w-2xl border-emerald-500/30 border rounded-sm p-2 flex flex-col gap-4">
      {bio ? (
        <section className="w-full">
          <div className="flex items-center justify-between p-[6px] w-full bg-emerald-950 rounded-sm">
            <h3>Bio:</h3>
            <button onClick={() => setUpdating(true)}>Update</button>
          </div>
          <p className="px-2 py-4 rounded-lg border-b-1 border-white/30">
            {bio}
          </p>
        </section>
      ) : (
        <div className="flex gap-2 items-center flex-col">
          <span>You do not have a bio yet...</span>
          <h3>Add Bio</h3>
          <UpdateBioForm setUpdating={setUpdating} />
        </div>
      )}
    </div>
  );
}
