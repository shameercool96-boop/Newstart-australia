import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  className,
  tone = "teal"
}: {
  value: number;
  className?: string;
  tone?: "teal" | "coral" | "gold" | "mint" | "lilac";
}) {
  const tones = {
    teal: "bg-teal",
    coral: "bg-coral",
    gold: "bg-gold",
    mint: "bg-mint",
    lilac: "bg-lilac"
  };

  return (
    <div className={cn("h-2 overflow-hidden rounded-full bg-slate-200", className)}>
      <div
        className={cn("h-full rounded-full transition-all duration-500", tones[tone])}
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  );
}

export function ProgressRing({
  value,
  label
}: {
  value: number;
  label: string;
}) {
  const safeValue = Math.min(Math.max(value, 0), 100);
  const background = `conic-gradient(#0071e3 ${safeValue * 3.6}deg, #e8e8ed 0deg)`;

  return (
    <div className="grid place-items-center">
      <div
        className="grid h-28 w-28 place-items-center rounded-full"
        style={{ background }}
        aria-label={`${label}: ${safeValue}%`}
      >
        <div className="grid h-[86px] w-[86px] place-items-center rounded-full bg-panel">
          <div className="text-center">
            <div className="text-2xl font-bold">{safeValue}%</div>
            <div className="text-[11px] uppercase tracking-[0.16em] text-muted">{label}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
