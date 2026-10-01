"use client";

import { ChangeEvent, FormEvent, useState } from "react";

interface UploadFormProps {
  onUpload: (data: {
    file: File;
    documentName: string;
    department: string;
    documentType: string;
    accessLevel: string;
    effectiveDate: string;
  }) => Promise<void>;
  disabled?: boolean;
}

export default function UploadForm({
  onUpload,
  disabled = false,
}: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState("");
  const [department, setDepartment] = useState("Engineering");
  const [documentType, setDocumentType] = useState("SOP");
  const [accessLevel, setAccessLevel] = useState("Department");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [error, setError] = useState("");

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] ?? null;

    setFile(selectedFile);
    setError("");

    if (selectedFile && !documentName) {
      setDocumentName(selectedFile.name);
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!file || !documentName || !effectiveDate) {
      setError(
        "Please select a file, enter a document name, and choose an effective date."
      );
      return;
    }

    try {
      await onUpload({
        file,
        documentName,
        department,
        documentType,
        accessLevel,
        effectiveDate,
      });

      setFile(null);
      setDocumentName("");
      setEffectiveDate("");
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Document upload failed."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Upload Knowledge Document
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Add an approved document and provide the metadata required for
          indexing.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Document file
        </label>

        <input
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={handleFileChange}
          disabled={disabled}
          className="block w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900"
        />

        {file && (
          <p className="mt-2 text-xs text-slate-600">
            Selected: {file.name}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Document name
        </label>

        <input
          value={documentName}
          onChange={(event) =>
            setDocumentName(event.target.value)
          }
          placeholder="Enter document name"
          disabled={disabled}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-300"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Department
          </label>

          <select
            value={department}
            onChange={(event) =>
              setDepartment(event.target.value)
            }
            disabled={disabled}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-300"
          >
            <option>Engineering</option>
            <option>HR</option>
            <option>Delivery Operations</option>
            <option>PMO</option>
            <option>Sales</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Document type
          </label>

          <select
            value={documentType}
            onChange={(event) =>
              setDocumentType(event.target.value)
            }
            disabled={disabled}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-300"
          >
            <option>SOP</option>
            <option>Policy</option>
            <option>Manual</option>
            <option>Project Guide</option>
            <option>Engineering Guide</option>
            <option>Sales Asset</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Access level
          </label>

          <select
            value={accessLevel}
            onChange={(event) =>
              setAccessLevel(event.target.value)
            }
            disabled={disabled}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-300"
          >
            <option>Department</option>
            <option>Restricted</option>
            <option>Company Wide</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Effective date
          </label>

          <input
            type="date"
            value={effectiveDate}
            onChange={(event) =>
              setEffectiveDate(event.target.value)
            }
            disabled={disabled}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-300"
          />
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={
            disabled ||
            !file ||
            !documentName ||
            !effectiveDate
          }
          className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {disabled ? "Processing..." : "Upload Document"}
        </button>
      </div>
    </form>
  );
}