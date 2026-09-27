import Logo from "@/components/common/Logo";

export default function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <Logo />

      <div className="flex items-center gap-4">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-slate-900">
            Pulkit Narang
          </p>
          <p className="text-xs text-slate-500">
            Employee
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
          PN
        </div>
      </div>
    </header>
  );
}