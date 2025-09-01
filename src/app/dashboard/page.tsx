import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) redirect("/");
  return (
    <div>
      <h1>{`${user?.firstName}'s`} Dashboard Page</h1>
    </div>
  );
}
