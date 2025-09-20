import { fetchUsers } from "@/app/lib/data";
import UserCard from "./UserCard";

export default async function UsersList() {
  const users = await fetchUsers();

  return (
    <ul className="flex gap-4 flex-wrap">
      {users.map((user) => (
        <UserCard key={user.id} userData={user} />
      ))}
    </ul>
  );
}
