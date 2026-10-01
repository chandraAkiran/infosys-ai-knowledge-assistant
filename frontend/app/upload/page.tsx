"use client";

import { useState } from "react";
import Pageheader from "@/components/common/Pageheader";
import UploadForm from "@/components/upload/UploadForm";
import IndexingStatus from "@/components/upload/IndexingStatus";
import { apiRequest } from "@/lib/api";

interface UploadedDocument {
  name: string;
  department: string;
  documentType: string;
  accessLevel: string;
  effectiveDate: string;
  fileName: string;
}

interface DocumentResponse {
  id: number;
  document_name: string;
  department: string;
  document_type: string;
  access_level: string;
  source: string | null;
  effective_date: string | null;
  indexing_status: string;
  file_path: string | null;
  created_at: string;
  updated_at: string;
}

interface IndexResponse {
  document_id: number;
  status: string;
  indexed_chunks: number;
}

export default function UploadPage() {
  const [uploadedDocument, setUploadedDocument] =
    useState<UploadedDocument | null>(null);

  const [status, setStatus] = useState<
    "uploaded" | "processing" | "indexed" | "failed"
  >("uploaded");

  const [error, setError] = useState("");

  async function handleUpload(data: {
    file: File;
    documentName: string;
    department: string;
    documentType: string;
    accessLevel: string;
    effectiveDate: string;
  }) {
    const token = localStorage.getItem("enterprise_token");

    if (!token) {
      throw new Error("You are not logged in.");
    }

    setError("");
    setStatus("uploaded");

    const formData = new FormData();

    formData.append("file", data.file);
    formData.append("department", data.department);
    formData.append("document_type", data.documentType);
    formData.append("access_level", data.accessLevel);
    formData.append("source", "Upload Console");
    formData.append("effective_date", data.effectiveDate);

    try {
      const document = await apiRequest<DocumentResponse>(
        "/documents/upload",
        {
          method: "POST",
          token,
          body: formData,
        }
      );

      setUploadedDocument({
        name: data.documentName,
        department: document.department,
        documentType: document.document_type,
        accessLevel: document.access_level,
        effectiveDate:
          document.effective_date || data.effectiveDate,
        fileName: data.file.name,
      });

      setStatus("processing");

      const indexingResult =
        await apiRequest<IndexResponse>(
          `/documents/${document.id}/index`,
          {
            method: "POST",
            token,
          }
        );

      if (indexingResult.status === "completed") {
        setStatus("indexed");
        return;
      }

      throw new Error("Document indexing did not complete.");
    } catch (uploadError) {
      setStatus("failed");

      const message =
        uploadError instanceof Error
          ? uploadError.message
          : "Document upload or indexing failed.";

      setError(message);

      throw uploadError;
    }
  }

  return (
    <div>
      <Pageheader
        title="Upload Console"
        description="Upload approved knowledge documents and monitor their indexing status."
      />

      <div className="space-y-6">
        <UploadForm
          onUpload={handleUpload}
          disabled={status === "processing"}
        />

        {uploadedDocument && (
          <IndexingStatus
            documentName={uploadedDocument.name}
            fileName={uploadedDocument.fileName}
            department={uploadedDocument.department}
            status={status}
          />
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}