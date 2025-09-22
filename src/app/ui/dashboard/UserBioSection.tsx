"use client";

import { useState, useOptimistic } from "react";
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
  const [optimisticBio, setOptimisticBio] = useOptimistic(
    bio,
    (state, newBio: string) => newBio
  );

  if (otherUserProfile) {
    if (optimisticBio) {
      return (
        <div className="w-full max-w-2xl items-center border-emerald-500/30 border rounded-sm p-2 flex flex-col gap-4">
          <section className="w-full flex items-center flex-col">
            <div className="flex justify-start p-1 w-full bg-emerald-950 rounded-sm">
              <h3>Bio:</h3>
            </div>
            <p className="w-full px-2 py-4 rounded-lg border-b-1 border-white/30">
              {optimisticBio}
            </p>
          </section>
        </div>
      );
    } else {
      return null;
    }
  }

  if (updating) {
    return (
      <UpdateBioForm
        initialContent={optimisticBio}
        setUpdating={setUpdating}
        setOptimisticBio={setOptimisticBio}
      />
    );
  }

  return (
    <div className="w-full max-w-2xl items-center border-emerald-500/30 border rounded-sm p-2 flex flex-col gap-4">
      {optimisticBio ? (
        <section className="w-full flex items-center flex-col">
          <div className="flex items-center justify-between p-1 w-full bg-emerald-950 rounded-sm">
            <h3>Bio:</h3>
            <button onClick={() => setUpdating(true)}>Update</button>
          </div>
          <p className="w-full px-2 py-4 rounded-lg border-b-1 border-white/30">
            {optimisticBio}
          </p>
        </section>
      ) : (
        <div className="flex w-full gap-2 items-center flex-col">
          <span>You do not have a bio yet...</span>
          <h3>Add Bio</h3>
          <UpdateBioForm
            setUpdating={setUpdating}
            setOptimisticBio={setOptimisticBio}
          />
        </div>
      )}
    </div>
  );
}
