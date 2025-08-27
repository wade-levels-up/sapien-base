import NavLinks from "@/app/ui/dashboard/NavLinks";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <div>
        <NavLinks />
      </div>
      <div>{children}</div>
    </div>
  );
}
