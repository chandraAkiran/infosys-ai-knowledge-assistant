export default function ProfileMenu() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold text-slate-900">
        Pulkit Narang
      </p>

      <p className="mt-1 text-xs text-slate-500">
        Employee
      </p>

      <button className="mt-4 w-full rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800">
        Logout
      </button>
    </div>
  );
}