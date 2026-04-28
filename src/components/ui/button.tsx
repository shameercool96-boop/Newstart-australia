import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-teal text-white shadow-[0_12px_32px_rgba(0,113,227,0.22)] hover:bg-teal/90",
  secondary: "bg-white text-foreground shadow-[0_10px_30px_rgba(0,0,0,0.06)] ring-1 ring-slate-200 hover:bg-slate-50",
  danger: "bg-coral text-white hover:bg-coral/90",
  ghost: "text-muted hover:bg-black/5 hover:text-foreground"
};

type ButtonVariant = keyof typeof variants;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: ReactNode;
}

export function Button({ className, variant = "primary", icon, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  icon?: ReactNode;
}

export function LinkButton({
  className,
  variant = "secondary",
  icon,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <a
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition active:scale-[0.98]",
        variants[variant],
        className
      )}
      target={props.href?.startsWith("http") ? "_blank" : props.target}
      rel={props.href?.startsWith("http") ? "noreferrer" : props.rel}
      {...props}
    >
      {icon}
      {children}
    </a>
  );
}
