import type { DocumentRecord, StudentProfile } from "@/lib/types";

export async function saveOnboardingProfile(profile: StudentProfile) {
  return fetch("/api/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(profile)
  }).then((response) => response.json());
}

export async function saveDocumentMetadata(record: DocumentRecord) {
  return fetch("/api/documents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(record)
  }).then((response) => response.json());
}
