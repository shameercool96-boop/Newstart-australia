import type { LucideIcon } from "lucide-react";

export type City =
  | "Melbourne"
  | "Sydney"
  | "Brisbane"
  | "Perth"
  | "Adelaide"
  | "Canberra"
  | "Hobart"
  | "Darwin";

export type Goal = "job" | "pr" | "study" | "side-income";

export type SectionId =
  | "dashboard"
  | "checklist"
  | "jobs"
  | "budget"
  | "mistakes"
  | "assistant"
  | "local"
  | "vault"
  | "pr";

export interface StudentProfile {
  country: string;
  city: City;
  visaType: string;
  budgetRange: string;
  goals: Goal[];
  arrivalDate?: string;
}

export interface ResourceLink {
  label: string;
  href: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  day: string;
  description: string;
  steps: string[];
  links: ResourceLink[];
  cityNote?: Partial<Record<City, string>>;
}

export interface JobOption {
  id: string;
  title: string;
  fit: string;
  averagePay: string;
  setup: string[];
  watchOut: string;
  links: ResourceLink[];
}

export interface BudgetCategory {
  id: string;
  label: string;
  planned: number;
  spent: number;
  tone: "teal" | "coral" | "gold" | "mint" | "lilac";
}

export interface MistakeWarning {
  id: string;
  title: string;
  severity: "High" | "Medium";
  summary: string;
  actions: string[];
  icon: LucideIcon;
  source?: ResourceLink;
}

export interface CityProfile {
  city: City;
  state: string;
  transportCard: string;
  transportLink: ResourceLink;
  supermarkets: string[];
  cheapFood: string[];
  mapsSearches: ResourceLink[];
}

export interface DocumentRecord {
  id: string;
  type: "Passport" | "Visa" | "TFN" | "COE" | "OSHC" | "Other";
  name: string;
  size: number;
  uploadedAt: string;
  status: "Stored locally" | "Ready for Supabase";
}

export interface Pathway {
  id: string;
  visa: string;
  label: string;
  summary: string;
  checkpoints: string[];
  links: ResourceLink[];
}

export interface JobPlan {
  status: "Not started" | "Resume ready" | "Applying" | "Interviewing" | "Working";
  applicationsThisWeek: number;
  targetApplications: number;
}
