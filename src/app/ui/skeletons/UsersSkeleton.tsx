import UserCardSkeleton from "@/app/ui/skeletons/UserCard";
import { prisma } from "@/app/lib/prisma";

export default async function UsersSkeleton() {
  const userCount = await prisma.user.count();

  return (
    <ul className="flex gap-4 flex-wrap">
      {Array.from({ length: userCount }, (_, i) => (
        <UserCardSkeleton key={i} />
      ))}
    </ul>
  );
}
