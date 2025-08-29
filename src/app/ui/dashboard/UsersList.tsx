import { fetchUsers } from "@/app/lib/data";
import type { User } from "@/app/lib/definitions";

export default async function UserList() {
  const users = await fetchUsers();
  console.log("Fetched users:", users);
  return (
    <div>
      <h1>Hi</h1>
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}
