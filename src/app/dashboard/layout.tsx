import NavLinks from "@/app/ui/dashboard/NavLinks";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createUserOnDemand } from "@/app/lib/data";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) redirect("/");

  await createUserOnDemand();

  return (
    <div className="flex h-full max-h-screen flex-col-reverse md:flex-row overflow-auto">
      <NavLinks />
      <main className="px-4 my-12 grow text-center w-full overflow-auto">
        {children}
      </main>
    </div>
  );
}
