import NavLinks from "@/app/ui/dashboard/NavLinks";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createUserOnDemandWrapper } from "@/app/lib/data";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) redirect("/");

  await createUserOnDemandWrapper();
  return (
    <div className="flex h-full max-h-screen flex-col-reverse md:flex-row overflow-auto">
      <NavLinks />
      <main className="px-4 grow text-center w-full overflow-auto">
        {children}
      </main>
    </div>
  );
}
