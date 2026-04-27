"use client";

import { AlertTriangle, PiggyBank, TrendingUp } from "lucide-react";
import type { BudgetCategory } from "@/lib/types";
import { clamp, currency } from "@/lib/utils";
import { ProgressBar } from "@/components/ui/progress";

export function BudgetView({
  budget,
  onChange
}: {
  budget: BudgetCategory[];
  onChange: (budget: BudgetCategory[]) => void;
}) {
  const totalPlanned = budget.reduce((sum, item) => sum + item.planned, 0);
  const totalSpent = budget.reduce((sum, item) => sum + item.spent, 0);
  const weeklyLeft = totalPlanned - totalSpent;
  const monthlyProjection = totalSpent * 4.33;
  const overspending = budget.filter((item) => item.spent > item.planned);

  function updateCategory(id: string, key: "planned" | "spent", value: number) {
    onChange(
      budget.map((item) =>
        item.id === id
          ? {
              ...item,
              [key]: Math.max(0, value)
            }
          : item
      )
    );
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[0.78fr_1.22fr]">
      <section className="glass rounded-[28px] p-5 sm:p-7">
        <PiggyBank className="h-8 w-8 text-teal" />
        <p className="mt-5 text-sm font-semibold text-teal">Smart budget tracker</p>
        <h1 className="mt-2 text-3xl font-semibold">Know what this week is really costing</h1>
        <div className="mt-6 grid gap-3">
          <BudgetSummary label="Planned this week" value={currency(totalPlanned)} />
          <BudgetSummary label="Spent so far" value={currency(totalSpent)} />
          <BudgetSummary
            label="Money left"
            value={currency(weeklyLeft)}
            tone={weeklyLeft < 0 ? "text-coral" : "text-mint"}
          />
          <BudgetSummary label="Monthly projection" value={currency(monthlyProjection)} />
        </div>
        <div className="mt-6 rounded-[20px] bg-white/10 p-5">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-gold" />
            <h2 className="font-semibold">Projection logic</h2>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted">
            Monthly projection uses current weekly spend multiplied by 4.33. It is intentionally
            simple so students can understand the signal fast.
          </p>
        </div>
      </section>

      <section className="grid gap-4">
        {overspending.length > 0 && (
          <div className="glass rounded-[22px] border-coral/35 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-coral" />
              <div>
                <h2 className="font-semibold text-coral">Overspending alert</h2>
                <p className="mt-2 text-sm leading-6 text-slate-200/84">
                  {overspending.map((item) => item.label).join(", ")} exceeded planned spend. Check
                  subscriptions, convenience meals, and late-night rides first.
                </p>
              </div>
            </div>
          </div>
        )}

        {budget.map((item) => {
          const usage = item.planned ? clamp((item.spent / item.planned) * 100) : 0;
          const over = item.spent > item.planned;

          return (
            <article key={item.id} className="glass rounded-[24px] p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{item.label}</h2>
                  <p className={over ? "mt-1 text-sm text-coral" : "mt-1 text-sm text-muted"}>
                    {over ? "Over plan" : `${Math.round(usage)}% of weekly plan used`}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-2xl font-semibold">{currency(item.spent)}</p>
                  <p className="text-xs text-muted">planned {currency(item.planned)}</p>
                </div>
              </div>
              <ProgressBar value={usage} tone={over ? "coral" : item.tone} className="mt-5" />
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <MoneyInput
                  label="Planned"
                  value={item.planned}
                  onChange={(value) => updateCategory(item.id, "planned", value)}
                />
                <MoneyInput
                  label="Spent"
                  value={item.spent}
                  onChange={(value) => updateCategory(item.id, "spent", value)}
                />
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}

function BudgetSummary({
  label,
  value,
  tone = "text-foreground"
}: {
  label: string;
  value: string;
  tone?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[18px] bg-white/10 p-4">
      <span className="text-sm text-muted">{label}</span>
      <span className={`text-sm font-semibold ${tone}`}>{value}</span>
    </div>
  );
}

function MoneyInput({
  label,
  value,
  onChange
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm text-muted">{label}</span>
      <div className="flex min-h-12 items-center rounded-[14px] border border-white/15 bg-white/10 px-3">
        <span className="text-muted">$</span>
        <input
          value={value}
          type="number"
          min={0}
          onChange={(event) => onChange(Number(event.target.value))}
          className="min-w-0 flex-1 bg-transparent px-2 outline-none"
        />
      </div>
    </label>
  );
}
