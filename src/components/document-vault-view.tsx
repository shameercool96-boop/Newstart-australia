"use client";

import { FileUp, LockKeyhole, Trash2, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
import type { DocumentRecord } from "@/lib/types";
import { saveDocumentMetadata } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

const DOC_TYPES = ["Passport", "Visa", "TFN", "COE", "OSHC", "Other"] as const;

export function DocumentVaultView({
  documents,
  onChange
}: {
  documents: DocumentRecord[];
  onChange: (documents: DocumentRecord[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [documentType, setDocumentType] = useState<DocumentRecord["type"]>("Passport");
  const [isSaving, setIsSaving] = useState(false);

  async function handleFile(file?: File) {
    if (!file) {
      return;
    }

    const record: DocumentRecord = {
      id: crypto.randomUUID(),
      type: documentType,
      name: file.name,
      size: file.size,
      uploadedAt: new Date().toISOString(),
      status: "Stored locally"
    };

    setIsSaving(true);
    await saveDocumentMetadata(record);
    onChange([record, ...documents]);
    setIsSaving(false);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function removeDocument(id: string) {
    onChange(documents.filter((document) => document.id !== id));
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[0.75fr_1.25fr]">
      <section className="glass rounded-[28px] p-5 sm:p-7">
        <LockKeyhole className="h-8 w-8 text-teal" />
        <p className="mt-5 text-sm font-semibold text-teal">Document vault</p>
        <h1 className="mt-2 text-3xl font-semibold">Keep critical IDs findable</h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          Demo mode stores file metadata locally and does not upload the actual file. In production,
          connect this to Supabase Storage or Firebase Storage with authenticated, private buckets.
        </p>

        <div className="mt-6 grid gap-4 rounded-[20px] bg-white/10 p-5">
          <label className="grid gap-2">
            <span className="text-sm text-muted">Document type</span>
            <select
              value={documentType}
              onChange={(event) => setDocumentType(event.target.value as DocumentRecord["type"])}
              className="min-h-12 rounded-[14px] border border-white/15 bg-panel px-4 text-sm outline-none focus:border-teal"
            >
              {DOC_TYPES.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>
          <input
            ref={inputRef}
            type="file"
            onChange={(event) => handleFile(event.target.files?.[0])}
            className="hidden"
            accept=".pdf,.png,.jpg,.jpeg,.webp"
          />
          <Button
            onClick={() => inputRef.current?.click()}
            disabled={isSaving}
            icon={<UploadCloud className="h-4 w-4" />}
          >
            {isSaving ? "Saving..." : "Upload document"}
          </Button>
        </div>
      </section>

      <section className="glass rounded-[28px] p-5 sm:p-7">
        <div className="flex items-center gap-3">
          <FileUp className="h-6 w-6 text-lilac" />
          <h2 className="text-xl font-semibold">Stored documents</h2>
        </div>

        {documents.length === 0 ? (
          <div className="mt-6">
            <EmptyState
              icon={FileUp}
              title="No documents yet"
              body="Add passport, visa grant, TFN letter, COE, and OSHC card metadata here for the demo."
            />
          </div>
        ) : (
          <div className="mt-6 grid gap-3">
            {documents.map((document) => (
              <article key={document.id} className="rounded-[18px] bg-white/10 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="rounded-full bg-lilac/15 px-3 py-1 text-xs font-semibold text-lilac">
                      {document.type}
                    </span>
                    <h3 className="mt-3 font-semibold">{document.name}</h3>
                    <p className="mt-1 text-xs text-muted">
                      {(document.size / 1024).toFixed(1)} KB |{" "}
                      {new Date(document.uploadedAt).toLocaleDateString("en-AU")} | {document.status}
                    </p>
                  </div>
                  <button
                    onClick={() => removeDocument(document.id)}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-muted transition hover:bg-coral/15 hover:text-coral"
                    aria-label={`Remove ${document.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
