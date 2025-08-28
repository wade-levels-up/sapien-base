import { fetchUsers } from "@/app/lib/data";

export const revalidate = 1; //revalidate api every 1 second

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

export default async function UserCard() {
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
