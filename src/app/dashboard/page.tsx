import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/app/lib/prisma";
import type { User } from "@/app/lib/definitions";

export default async function Dashboard() {
  const user = await currentUser();
  if (!user) redirect("/");

  // Check for user in DB - if not create user on first sign in (on demand)
  const dbUser = await prisma.user.findUnique({ where: { id: user?.id } });
  if (!dbUser) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        firstName: user?.firstName,
        lastName: user?.lastName,
      } as User,
    });
  }
  return (
    <div>
      <h2>{`${user?.firstName}'s`} Dashboard Page</h2>
    </div>
  );
}
