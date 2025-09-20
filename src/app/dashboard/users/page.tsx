import UsersList from "@/app/ui/dashboard/UsersList";
import UsersSkeleton from "@/app/ui/skeletons/UsersSkeleton";
import { Suspense } from "react";

export default async function Users() {
  return (
    <div>
      <h2>Users Page</h2>
      <section className="flex flex-col items-center p-2">
        <Suspense fallback={<UsersSkeleton />}>
          <UsersList />
        </Suspense>
      </section>
    </div>
  );
}
