export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white">
        AI
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-900">
          Enterprise GPT
        </p>
        <p className="text-xs text-slate-500">
          Knowledge Assistant
        </p>
      </div>
    </div>
  );
}