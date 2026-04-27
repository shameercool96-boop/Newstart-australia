"use client";

import {
  ChevronDown,
  Menu,
  RefreshCcw,
  X
} from "lucide-react";
import { useMemo, useState } from "react";
import { AssistantView } from "@/components/assistant-view";
import { Brand } from "@/components/brand";
import { BudgetView } from "@/components/budget-view";
import { ChecklistView } from "@/components/checklist-view";
import { DashboardView } from "@/components/dashboard-view";
import { DocumentVaultView } from "@/components/document-vault-view";
import { JobsView } from "@/components/jobs-view";
import { LocalLifeView } from "@/components/local-life-view";
import { MistakesView } from "@/components/mistakes-view";
import { OnboardingWizard } from "@/components/onboarding-wizard";
import { PrTrackerView } from "@/components/pr-tracker-view";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DEFAULT_BUDGET, DEFAULT_JOB_PLAN, SECTIONS } from "@/data/demo";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { saveOnboardingProfile } from "@/lib/storage";
import type { BudgetCategory, DocumentRecord, JobPlan, SectionId, StudentProfile } from "@/lib/types";
import { cn } from "@/lib/utils";

const DEFAULT_PROFILE: StudentProfile = {
  country: "India",
  city: "Melbourne",
  visaType: "Student visa subclass 500",
  budgetRange: "$350-$550/week",
  goals: ["job", "study"]
};

export function AppShell() {
  const [activeSection, setActiveSection] = useState<SectionId>("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profile, setProfile, profileLoaded] = useLocalStorage<StudentProfile | null>(
    "newstart:profile",
    null
  );
  const [completedTasks, setCompletedTasks, tasksLoaded] = useLocalStorage<string[]>(
    "newstart:completedTasks",
    ["sim-card", "bank-account"]
  );
  const [budget, setBudget] = useLocalStorage<BudgetCategory[]>("newstart:budget", DEFAULT_BUDGET);
  const [jobPlan, setJobPlan] = useLocalStorage<JobPlan>("newstart:jobPlan", DEFAULT_JOB_PLAN);
  const [documents, setDocuments] = useLocalStorage<DocumentRecord[]>("newstart:documents", []);
  const [prCompleted, setPrCompleted] = useLocalStorage<string[]>("newstart:prCompleted", []);

  const loaded = profileLoaded && tasksLoaded;
  const activeMeta = useMemo(
    () => SECTIONS.find((section) => section.id === activeSection) ?? SECTIONS[0],
    [activeSection]
  );

  async function completeOnboarding(nextProfile: StudentProfile) {
    await saveOnboardingProfile(nextProfile);
    setProfile(nextProfile);
    setActiveSection("dashboard");
  }

  function resetDemo() {
    setProfile(null);
    setCompletedTasks(["sim-card", "bank-account"]);
    setBudget(DEFAULT_BUDGET);
    setJobPlan(DEFAULT_JOB_PLAN);
    setDocuments([]);
    setPrCompleted([]);
    setActiveSection("dashboard");
  }

  function navigate(section: SectionId) {
    setActiveSection(section);
    setMobileOpen(false);
  }

  function toggleTask(id: string) {
    setCompletedTasks((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  function togglePr(id: string) {
    setPrCompleted((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  const workingProfile = profile ?? DEFAULT_PROFILE;

  if (!loaded) {
    return (
      <main className="min-h-screen p-4 sm:p-6">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[280px_1fr]">
          <Skeleton className="h-[calc(100vh-48px)] rounded-[28px]" />
          <div className="grid gap-4">
            <Skeleton className="h-20 rounded-[24px]" />
            <Skeleton className="h-[420px] rounded-[28px]" />
            <Skeleton className="h-48 rounded-[28px]" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 pb-24 pt-4 sm:px-6 lg:pb-6">
      {!profile && <OnboardingWizard defaultProfile={DEFAULT_PROFILE} onComplete={completeOnboarding} />}

      <div className="mx-auto grid max-w-[1500px] gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="glass sticky top-4 hidden h-[calc(100vh-32px)] rounded-[28px] p-4 lg:flex lg:flex-col">
          <div className="px-2 py-3">
            <Brand />
          </div>
          <nav className="mt-5 grid gap-1">
            {SECTIONS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => navigate(id)}
                className={cn(
                  "flex min-h-11 items-center gap-3 rounded-[16px] px-3 text-left text-sm transition",
                  activeSection === id
                    ? "bg-teal text-slate-950"
                    : "text-muted hover:bg-white/10 hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto rounded-[20px] bg-white/10 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">Profile</p>
            <p className="mt-2 font-semibold">{workingProfile.city}</p>
            <p className="mt-1 text-xs leading-5 text-muted">{workingProfile.visaType}</p>
            <Button
              variant="ghost"
              className="mt-4 w-full justify-start px-3"
              onClick={resetDemo}
              icon={<RefreshCcw className="h-4 w-4" />}
            >
              Reset demo
            </Button>
          </div>
        </aside>

        <div className="min-w-0">
          <header className="glass sticky top-4 z-30 mb-5 flex min-h-16 items-center justify-between gap-3 rounded-[24px] px-4 py-3 lg:static">
            <div className="hidden sm:block lg:hidden">
              <Brand compact />
            </div>
            <button
              onClick={() => setMobileOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 lg:hidden"
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-[0.16em] text-muted">Current view</p>
              <h2 className="truncate text-lg font-semibold">{activeMeta.label}</h2>
            </div>
            <button
              onClick={() => setActiveSection("dashboard")}
              className="hidden min-h-10 items-center gap-2 rounded-full bg-white/10 px-3 text-sm text-muted sm:inline-flex"
            >
              {workingProfile.city}
              <ChevronDown className="h-4 w-4" />
            </button>
          </header>

          <div className="fade-in">{renderSection()}</div>
        </div>
      </div>

      <MobileNav
        open={mobileOpen}
        activeSection={activeSection}
        onClose={() => setMobileOpen(false)}
        onNavigate={navigate}
        onReset={resetDemo}
        profile={workingProfile}
      />

      <nav className="glass fixed inset-x-3 bottom-3 z-40 grid grid-cols-5 gap-1 rounded-[24px] p-2 lg:hidden">
        {SECTIONS.slice(0, 5).map(({ id, shortLabel, icon: Icon }) => (
          <button
            key={id}
            onClick={() => navigate(id)}
            className={cn(
              "grid min-h-14 place-items-center rounded-[18px] px-1 text-[11px] font-semibold transition",
              activeSection === id ? "bg-teal text-slate-950" : "text-muted"
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{shortLabel}</span>
          </button>
        ))}
      </nav>
    </main>
  );

  function renderSection() {
    switch (activeSection) {
      case "dashboard":
        return (
          <DashboardView
            profile={workingProfile}
            completedTasks={completedTasks}
            budget={budget}
            jobPlan={jobPlan}
            documentsCount={documents.length}
            onNavigate={navigate}
          />
        );
      case "checklist":
        return (
          <ChecklistView
            profile={workingProfile}
            completedTasks={completedTasks}
            onToggle={toggleTask}
          />
        );
      case "jobs":
        return <JobsView jobPlan={jobPlan} onChange={setJobPlan} />;
      case "budget":
        return <BudgetView budget={budget} onChange={setBudget} />;
      case "mistakes":
        return <MistakesView />;
      case "assistant":
        return <AssistantView profile={workingProfile} />;
      case "local":
        return <LocalLifeView profile={workingProfile} />;
      case "vault":
        return <DocumentVaultView documents={documents} onChange={setDocuments} />;
      case "pr":
        return <PrTrackerView completed={prCompleted} onToggle={togglePr} />;
      default:
        return null;
    }
  }
}

function MobileNav({
  open,
  activeSection,
  onClose,
  onNavigate,
  onReset,
  profile
}: {
  open: boolean;
  activeSection: SectionId;
  onClose: () => void;
  onNavigate: (section: SectionId) => void;
  onReset: () => void;
  profile: StudentProfile;
}) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-background/80 backdrop-blur-lg transition lg:hidden",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      )}
    >
      <aside
        className={cn(
          "glass ml-auto h-full w-[min(88vw,360px)] rounded-l-[28px] p-4 transition-transform",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between">
          <Brand compact />
          <button
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/10"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="mt-6 grid gap-1">
          {SECTIONS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={cn(
                "flex min-h-12 items-center gap-3 rounded-[16px] px-3 text-left text-sm transition",
                activeSection === id
                  ? "bg-teal text-slate-950"
                  : "text-muted hover:bg-white/10 hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="mt-5 rounded-[20px] bg-white/10 p-4">
          <p className="font-semibold">{profile.city}</p>
          <p className="mt-1 text-xs leading-5 text-muted">{profile.visaType}</p>
          <Button
            variant="ghost"
            className="mt-4 w-full justify-start px-3"
            onClick={onReset}
            icon={<RefreshCcw className="h-4 w-4" />}
          >
            Reset demo
          </Button>
        </div>
      </aside>
    </div>
  );
}
