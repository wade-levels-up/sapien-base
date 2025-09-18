import { fetchUsers } from "@/app/lib/data";
import UserCard from "@/app/ui/dashboard/UserCard";
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

async function UsersList() {
  const users = await fetchUsers();

  // Add artificial delay to see the loading state
  await new Promise((resolve) => setTimeout(resolve, 3000)); // 2 second delay

  return (
    <ul className="flex gap-4 flex-wrap">
      {users.map((user) => (
        <UserCard key={user.id} userData={user} />
      ))}
    </ul>
  );
}
