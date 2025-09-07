import NavLinks from "@/app/ui/dashboard/NavLinks";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col-reverse md:flex-row">
      <NavLinks />
      <main className="px-4 grow">{children}</main>
    </div>
  );
}
