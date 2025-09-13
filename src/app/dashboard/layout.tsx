import NavLinks from "@/app/ui/dashboard/NavLinks";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full max-h-screen flex-col-reverse md:flex-row overflow-auto">
      <NavLinks />
      <main className="px-4 grow text-center w-full overflow-auto">
        {children}
      </main>
    </div>
  );
}
