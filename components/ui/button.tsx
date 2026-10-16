import * as React from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary: "bg-neutral-950 text-white hover:bg-neutral-800",
  secondary: "bg-black/5 text-neutral-800 hover:bg-black/10",
  ghost: "text-neutral-800 hover:bg-black/5",
  outline: "border border-black/15 bg-white/60 text-neutral-900 hover:bg-white",
} as const;

const sizes = {
  sm: "h-9 px-3.5",
  md: "h-11 px-5",
  lg: "h-12 px-6 text-base",
} as const;

type Opts = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
};

/** Link yoki boshqa elementlarga ham button ko'rinishini berish uchun */
export function buttonVariants({ variant = "primary", size = "md", className }: Opts = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Opts {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, ...props }, ref) => (
    <button ref={ref} className={buttonVariants({ variant, size, className })} {...props} />
  ),
);
Button.displayName = "Button";
