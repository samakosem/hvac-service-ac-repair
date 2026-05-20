import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type BaseProps = {
  variant?: "primary" | "secondary" | "ghost" | "copper";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
};

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const VARIANT_CLASSES: Record<NonNullable<BaseProps["variant"]>, string> = {
  primary:
    "bg-hvac-blue-600 text-white hover:bg-hvac-blue-500 shadow-glow-blue focus-visible:ring-hvac-blue-500",
  secondary:
    "bg-transparent text-white border border-white/25 hover:bg-white/10 focus-visible:ring-white",
  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-400",
  copper:
    "bg-copper-gradient text-white shadow-glow-copper hover:opacity-90 focus-visible:ring-copper-400",
};

const SIZE_CLASSES: Record<NonNullable<BaseProps["size"]>, string> = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-7 py-3.5 text-base rounded-xl",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  href,
  ...rest
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
