interface IndexingStatusProps {
  documentName: string;
  fileName: string;
  status:
    | "uploaded"
    | "processing"
    | "indexed"
    | "failed";
  department: string;
}

const statusLabels = {
  uploaded: "Uploaded",
  processing: "Processing",
  indexed: "Indexed",
  failed: "Failed",
};

export default function IndexingStatus({
  documentName,
  fileName,
  status,
  department,
}: IndexingStatusProps) {
  const progress =
    status === "uploaded"
      ? "25%"
      : status === "processing"
        ? "65%"
        : status === "indexed"
          ? "100%"
          : "0%";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Indexing Status
          </p>

          <h3 className="mt-1 text-base font-semibold text-slate-900">
            {documentName}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            {fileName} • {department}
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          {statusLabels[status]}
        </span>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex justify-between text-xs text-slate-500">
          <span>Pipeline progress</span>
          <span>{progress}</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-slate-800 transition-all duration-500"
            style={{ width: progress }}
          />
        </div>
      </div>
    </div>
  );
}