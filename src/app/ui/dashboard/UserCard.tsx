export const dynamic = "force-dynamic";

import { fetchUsers } from "@/app/lib/data";

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

export default async function UserCard() {
  const users = await fetchUsers();
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
