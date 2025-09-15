import { fetchUsers } from "@/app/lib/data";
import UserCard from "@/app/ui/dashboard/UserCard";

export default async function Users() {
  const users = await fetchUsers();

  return (
    <div>
      <h2>Users Page</h2>
      <section className="flex flex-col items-center p-2">
        <ul className="flex gap-4 flex-wrap">
          {users.map((user) => (
            <UserCard key={user.id} userData={user} />
          ))}
        </ul>
      </section>
    </div>
  );
}
