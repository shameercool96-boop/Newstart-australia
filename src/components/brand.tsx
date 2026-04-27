import Image from "next/image";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/app-icon.png"
        width={compact ? 38 : 46}
        height={compact ? 38 : 46}
        alt="NewStart Australia icon"
        className="rounded-full ring-1 ring-white/20"
        priority
      />
      <div>
        <p className="text-base font-semibold leading-tight">NewStart Australia</p>
        {!compact && <p className="text-xs text-muted">Student survival cockpit</p>}
      </div>
    </div>
  );
}
