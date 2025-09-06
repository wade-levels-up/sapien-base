import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createUserOnDemand } from "@/app/lib/data";

export default async function Dashboard() {
  const user = await currentUser();
  if (!user) redirect("/");

  createUserOnDemand();
  return (
    <div>
      <h2>{`${user?.firstName}'s`} Dashboard Page</h2>
    </div>
  );
}
