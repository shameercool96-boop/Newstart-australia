import type { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  body
}: {
  icon: LucideIcon;
  title: string;
  body: string;
}) {
  return (
    <div className="soft-panel rounded-[18px] p-6 text-center">
      <Icon className="mx-auto h-8 w-8 text-teal" />
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
    </div>
  );
}
