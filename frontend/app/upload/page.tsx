"use client";

import { useState } from "react";
import Pageheader from "@/components/common/Pageheader";
import UploadForm from "@/components/upload/UploadForm";
import IndexingStatus from "@/components/upload/IndexingStatus";

interface UploadedDocument {
  name: string;
  department: string;
  documentType: string;
  accessLevel: string;
  effectiveDate: string;
  fileName: string;
}

export default function UploadPage() {
  const [uploadedDocument, setUploadedDocument] =
    useState<UploadedDocument | null>(null);

  const [status, setStatus] = useState<
    "uploaded" | "processing" | "indexed"
  >("uploaded");

  function handleUpload(document: UploadedDocument) {
    setUploadedDocument(document);
    setStatus("uploaded");

    setTimeout(() => {
      setStatus("processing");
    }, 1000);

    setTimeout(() => {
      setStatus("indexed");
    }, 2500);
  }

  return (
    <div>
      <Pageheader
        title="Upload Console"
        description="Upload approved knowledge documents and monitor their indexing status."
      />

      <div className="space-y-6">
        <UploadForm onUpload={handleUpload} />

        {uploadedDocument && (
          <IndexingStatus
            documentName={uploadedDocument.name}
            fileName={uploadedDocument.fileName}
            department={uploadedDocument.department}
            status={status}
          />
        )}
      </div>
    </div>
  );
}