"use client";

import { ArrowRight, Check, ChevronLeft, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { BUDGET_RANGES, CITIES, GOALS, VISA_TYPES } from "@/data/demo";
import type { City, Goal, StudentProfile } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Brand } from "@/components/brand";

const STEPS = ["Basics", "Money", "Goals"];

export function OnboardingWizard({
  onComplete,
  defaultProfile
}: {
  onComplete: (profile: StudentProfile) => void;
  defaultProfile?: StudentProfile;
}) {
  const [step, setStep] = useState(0);
  const [country, setCountry] = useState(defaultProfile?.country ?? "");
  const [city, setCity] = useState<City>(defaultProfile?.city ?? "Melbourne");
  const [visaType, setVisaType] = useState(defaultProfile?.visaType ?? VISA_TYPES[0]);
  const [budgetRange, setBudgetRange] = useState(defaultProfile?.budgetRange ?? BUDGET_RANGES[1]);
  const [goals, setGoals] = useState<Goal[]>(defaultProfile?.goals ?? ["job", "study"]);

  const canContinue = useMemo(() => {
    if (step === 0) {
      return country.trim().length > 1 && city && visaType;
    }

    if (step === 2) {
      return goals.length > 0;
    }

    return Boolean(budgetRange);
  }, [budgetRange, city, country, goals.length, step, visaType]);

  function toggleGoal(goal: Goal) {
    setGoals((current) =>
      current.includes(goal) ? current.filter((item) => item !== goal) : [...current, goal]
    );
  }

  function next() {
    if (step < STEPS.length - 1) {
      setStep((current) => current + 1);
      return;
    }

    onComplete({
      country: country.trim(),
      city,
      visaType,
      budgetRange,
      goals,
      arrivalDate: new Date().toISOString()
    });
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-background/88 px-4 py-5 backdrop-blur-xl">
      <div className="mx-auto flex min-h-full max-w-5xl items-center justify-center">
        <section className="glass grid w-full overflow-hidden rounded-[28px] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[280px] overflow-hidden border-b border-white/10 lg:border-b-0 lg:border-r">
            <div className="absolute inset-0 bg-[url('/welcome-banner.jpg')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-transparent" />
            <div className="relative flex h-full min-h-[320px] flex-col justify-between p-6 sm:p-8">
              <Brand />
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-black/35 px-3 py-2 text-xs font-semibold text-teal ring-1 ring-white/15">
                  <Sparkles className="h-4 w-4" />
                  First 7 days sorted
                </div>
                <h1 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">
                  Build your Australia plan before the small mistakes get expensive.
                </h1>
                <p className="mt-4 max-w-md text-sm leading-6 text-slate-200/80">
                  NewStart turns city, visa, budget, and goals into a practical dashboard for
                  documents, work, rent, money, transport, and PR planning.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-8">
            <div className="flex gap-2">
              {STEPS.map((item, index) => (
                <div
                  key={item}
                  className={cn(
                    "h-2 flex-1 rounded-full transition",
                    index <= step ? "bg-teal" : "bg-white/15"
                  )}
                />
              ))}
            </div>

            <div className="mt-8 min-h-[380px]">
              {step === 0 && (
                <div className="rise-in">
                  <p className="text-sm font-semibold text-teal">Step 1 of 3</p>
                  <h2 className="mt-2 text-2xl font-semibold">Tell us your starting point</h2>
                  <div className="mt-6 grid gap-4">
                    <label className="grid gap-2">
                      <span className="text-sm text-muted">Country you are arriving from</span>
                      <input
                        value={country}
                        onChange={(event) => setCountry(event.target.value)}
                        placeholder="India, Nepal, Colombia..."
                        className="min-h-12 rounded-[14px] border border-white/15 bg-white/10 px-4 text-sm outline-none transition placeholder:text-muted focus:border-teal"
                      />
                    </label>
                    <label className="grid gap-2">
                      <span className="text-sm text-muted">Arrival city</span>
                      <select
                        value={city}
                        onChange={(event) => setCity(event.target.value as City)}
                        className="min-h-12 rounded-[14px] border border-white/15 bg-panel px-4 text-sm outline-none transition focus:border-teal"
                      >
                        {CITIES.map((item) => (
                          <option key={item}>{item}</option>
                        ))}
                      </select>
                    </label>
                    <label className="grid gap-2">
                      <span className="text-sm text-muted">Visa type</span>
                      <select
                        value={visaType}
                        onChange={(event) => setVisaType(event.target.value)}
                        className="min-h-12 rounded-[14px] border border-white/15 bg-panel px-4 text-sm outline-none transition focus:border-teal"
                      >
                        {VISA_TYPES.map((item) => (
                          <option key={item}>{item}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="rise-in">
                  <p className="text-sm font-semibold text-teal">Step 2 of 3</p>
                  <h2 className="mt-2 text-2xl font-semibold">Set a weekly survival budget</h2>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {BUDGET_RANGES.map((item) => (
                      <button
                        key={item}
                        onClick={() => setBudgetRange(item)}
                        className={cn(
                          "min-h-24 rounded-[18px] border p-4 text-left transition",
                          budgetRange === item
                            ? "border-teal bg-teal/15"
                            : "border-white/15 bg-white/10 hover:bg-white/10"
                        )}
                      >
                        <span className="text-sm font-semibold">{item}</span>
                        <span className="mt-2 block text-xs leading-5 text-muted">
                          Dashboard alerts and projections will use this as your spending baseline.
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="rise-in">
                  <p className="text-sm font-semibold text-teal">Step 3 of 3</p>
                  <h2 className="mt-2 text-2xl font-semibold">Choose your priorities</h2>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {GOALS.map(({ id, label, icon: Icon }) => {
                      const active = goals.includes(id);

                      return (
                        <button
                          key={id}
                          onClick={() => toggleGoal(id)}
                          className={cn(
                            "flex min-h-24 items-center gap-4 rounded-[18px] border p-4 text-left transition",
                            active
                              ? "border-teal bg-teal/15"
                              : "border-white/15 bg-white/10 hover:bg-white/10"
                          )}
                        >
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10">
                            <Icon className="h-5 w-5 text-teal" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-semibold">{label}</span>
                            <span className="mt-1 block text-xs leading-5 text-muted">
                              Adds relevant actions and warnings to your dashboard.
                            </span>
                          </span>
                          {active && <Check className="h-5 w-5 shrink-0 text-teal" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 flex items-center justify-between gap-3 border-t border-white/10 pt-5">
              <Button
                variant="ghost"
                onClick={() => setStep((current) => Math.max(current - 1, 0))}
                disabled={step === 0}
                icon={<ChevronLeft className="h-4 w-4" />}
              >
                Back
              </Button>
              <Button
                onClick={next}
                disabled={!canContinue}
                icon={step === STEPS.length - 1 ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
              >
                {step === STEPS.length - 1 ? "Create dashboard" : "Continue"}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
